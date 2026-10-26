const { test } = require('node:test');
const assert = require('node:assert/strict');
const createHandler = require('./contact');
const env = { SMTP_USER: 'owner@gmail.com', SMTP_APP_PASSWORD: 'test-only', ALLOWED_ORIGINS: 'https://flor125.dev' };
const payload = { name: 'Ana', email: 'ana@example.com', company: '', message: 'Hola, me interesa tu trabajo.' };
async function request({ body = payload, origin = 'https://flor125.dev', method = 'POST', sendMail, config = env, rateLimit = () => true } = {}) {
    const response = { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(n) { this.code=n;return this; }, json(v) { this.body=v;return this; }, end() { return this; } };
    await createHandler({ sendMail: sendMail || (async () => ({ accepted: ['sombraflorencia097@gmail.com'] })), env:config,rateLimit })(
        { method, headers:{ origin,'content-type':'application/json' },body },response);
    return response;
}
test('success only after SMTP accepts fixed recipient, visitor is Reply-To', async () => {
    let mail;
    const res = await request({ sendMail:async data => { mail=data;return {accepted:['sombraflorencia097@gmail.com']}; } });
    assert.equal(res.code,200);assert.equal(res.body.ok,true);
    assert.equal(mail.to,'sombraflorencia097@gmail.com');assert.equal(mail.from.address,env.SMTP_USER);
    assert.equal(mail.replyTo.address,payload.email);assert.match(mail.text,/Hola/);
});
test('SMTP errors and rejection never return success or secrets', async () => {
    for (const sendMail of [async()=>{throw new Error('private password');},async()=>({accepted:[]})]) {
        const res=await request({sendMail});assert.equal(res.code,502);assert.equal(res.body.ok,undefined);assert.ok(!JSON.stringify(res.body).includes('password'));
    }
});
test('rejects foreign origins, invalid fields, header injection, bot trap, and oversized payloads before sending', async () => {
    for (const options of [{origin:'https://evil.example'},{body:{...payload,email:'bad'}},{body:{...payload,name:'Ana\r\nBcc: evil@example.com'}},{body:{...payload,message:' '}},{body:{...payload,message:'x'.repeat(5001)}},{body:{...payload,website:'spam'}},{body:'invalid json'}]) {
        const res=await request({...options,sendMail:()=>assert.fail('must not send')});assert.ok([400,403].includes(res.code));
    }
});
test('preflight and unsupported methods do not send',async()=>{
    assert.equal((await request({method:'OPTIONS'})).code,204);
    assert.equal((await request({method:'GET'})).code,405);
});
test('missing configuration and throttling return actionable failure status',async()=>{
    assert.equal((await request({config:{ALLOWED_ORIGINS:env.ALLOWED_ORIGINS}})).code,503);
    const limited=await request({rateLimit:()=>false});assert.equal(limited.code,429);assert.equal(limited.headers['Retry-After'],'600');
});
