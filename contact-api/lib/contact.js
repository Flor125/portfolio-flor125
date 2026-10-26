const recipient = 'sombraflorencia097@gmail.com';

// This small per-instance limit supplements provider limits; it is not a distributed quota.
const attempts = new Map();
function permit(ip) {
    const now = Date.now();
    for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
    const entry = attempts.get(ip) || { count: 0, until: now + 600000 };
    if (entry.count >= 5 || (!attempts.has(ip) && attempts.size >= 10000)) return false;
    entry.count++; attempts.set(ip, entry); return true;
}

module.exports = function createHandler({ sendMail, env = process.env, rateLimit = permit }) {
    return async function contact(req, res) {
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Vary', 'Origin');
        const origins = (env.ALLOWED_ORIGINS || 'https://flor125.dev').split(',').map(x => x.trim());
        if (!origins.includes(req.headers.origin)) return res.status(403).json({ error: 'origin' });
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') return res.status(204).end();
        if (req.method !== 'POST') { res.setHeader('Allow', 'POST, OPTIONS'); return res.status(405).json({ error: 'method' }); }
        if (!(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return res.status(415).json({ error: 'content_type' });
        if (Number(req.headers['content-length']) > 20000) return res.status(413).json({ error: 'size' });
        let body;
        try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
        catch { return res.status(400).json({ error: 'body' }); }
        if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'body' });
        if (Buffer.byteLength(JSON.stringify(body)) > 20000) return res.status(413).json({ error: 'size' });
        if (body.website) return res.status(400).json({ error: 'spam' });
        const limits = { name: 120, company: 160, email: 254, message: 5000 }, data = {};
        for (const [key, max] of Object.entries(limits)) {
            const value = body[key] === undefined && key === 'company' ? '' : body[key];
            if (typeof value !== 'string' || value.length > max || (key !== 'company' && !value.trim())) return res.status(400).json({ error: 'fields' });
            data[key] = value.trim();
        }
        if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) || /[\r\n]/.test(data.name + data.company + data.email)) return res.status(400).json({ error: 'fields' });
        if (!env.SMTP_USER || !env.SMTP_APP_PASSWORD) return res.status(503).json({ error: 'configuration' });
        const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
        if (!rateLimit(ip)) { res.setHeader('Retry-After', '600'); return res.status(429).json({ error: 'rate_limit' }); }
        try {
            const info = await sendMail({
                from: { name: 'Portfolio Florencia Sombra', address: env.SMTP_USER },
                to: recipient,
                replyTo: { name: data.name, address: data.email },
                subject: 'Nuevo mensaje desde flor125.dev',
                text: `Nombre: ${data.name}\nEmpresa: ${data.company || '—'}\nCorreo: ${data.email}\n\n${data.message}`
            });
            if (!info.accepted?.some(address => String(address).toLowerCase() === recipient)) throw new Error('not_accepted');
            return res.status(200).json({ ok: true });
        } catch {
            // Do not return or log SMTP credentials, errors, or the visitor's message.
            return res.status(502).json({ error: 'delivery' });
        }
    };
};
