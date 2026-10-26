const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname,'../../assets/js/contact-form.js'),'utf8');
function setup(fetch) {
    const handlers = {};
    const button = { disabled:false, focus() {} }, status = {textContent:''};
    const dialog = { shown:false, querySelector:()=>({addEventListener(){}}), addEventListener(){}, showModal(){this.shown=true;} };
    const form = { dataset:{contactEndpoint:'https://example.vercel.app/api/contact'}, resetCount:0,
        querySelector:s=>s.includes('submit')?button:status, addEventListener:(name,fn)=>handlers[name]=fn,
        reportValidity:()=>true, setAttribute(){},removeAttribute(){},reset(){this.resetCount++;} };
    vm.runInNewContext(source,{ document:{querySelector:s=>s==='.contact-form'?form:dialog},
        window:{},fetch,FormData:class {get(key){return key==='email'?'ana@example.com':'hola';}},
        AbortController,setTimeout,clearTimeout });
    return {form,button,status,dialog,submit:()=>handlers.submit({preventDefault(){}})};
}
test('popup appears and fields reset only after confirmed API success',async()=>{
    const state=setup(async()=>({ok:true,json:async()=>({ok:true})}));await state.submit();
    assert.equal(state.dialog.shown,true);assert.equal(state.form.resetCount,1);assert.equal(state.button.disabled,false);
});
test('network and API failures retain fields without success popup',async()=>{
    for(const fetch of [async()=>{throw Error('offline');},async()=>({ok:false,json:async()=>({error:'delivery'})}),async()=>({ok:true,json:async()=>({})})]){
        const state=setup(fetch);await state.submit();assert.equal(state.dialog.shown,false);assert.equal(state.form.resetCount,0);
        assert.match(state.status.textContent,/No pudimos confirmar/);assert.equal(state.button.disabled,false);
    }
});
test('duplicate submissions are ignored while request is pending',async()=>{
    let resolve, calls=0;const state=setup(()=>{calls++;return new Promise(r=>resolve=r);});
    const first=state.submit();assert.equal(state.button.disabled,true);await state.submit();assert.equal(calls,1);
    resolve({ok:true,json:async()=>({ok:true})});await first;
});
