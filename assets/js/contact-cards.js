(() => {
    const root = document.querySelector('.contact-float');
    if (!root) return;
    const preview = root.querySelector('.contact-preview');
    const content = root.querySelector('.contact-preview-content');
    const copy = root.querySelector('.contact-copy');
    const status = root.querySelector('.contact-copy-status');
    const email = 'sombraflorencia097@gmail.com';
    const english = () => document.documentElement.lang === 'en';
    let active = null, days = null, failed = false, requested = false, timer, closeTimer, clearStatusTimer;
    const t = (es, en) => english() ? en : es;
    function labels() {
        root.setAttribute('aria-label', t('Contacto rápido', 'Quick contact'));
        copy.querySelector('span').textContent = t('Copiar email', 'Copy email');
        if (active) show(active);
    }
    async function contributions() {
        if (requested) return;
        requested = true;
        try {
            const response = await fetch('https://github-contributions-api.jogruber.de/v4/Flor125?y=last', { signal: AbortSignal.timeout(10000) });
            if (!response.ok) throw new Error();
            const data = await response.json();
            if (!Array.isArray(data.contributions)) throw new Error();
            days = data.contributions.filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(day.count) && day.count >= 0).sort((a,b) => a.date.localeCompare(b.date));
        } catch { failed = true; }
        if (active === 'github') show('github');
    }
    function show(kind) {
        clearTimeout(closeTimer);
        const previous = active; active = kind;
        preview.hidden = false;
        content.style.setProperty('--contact-direction', previous === 'linkedin' ? '-12px' : '12px');
        content.replaceChildren();
        const head = document.createElement('div'); head.className = 'contact-preview-head';
        const img = document.createElement('img'); img.src = 'assets/images/profile-pic.jpg'; img.alt = '';
        const text = document.createElement('div'), name = document.createElement('strong'), detail = document.createElement('p');
        name.textContent = kind === 'github' ? 'Flor125 / GitHub' : 'Florencia Sombra / LinkedIn';
        detail.textContent = kind === 'linkedin' ? t('Desarrollo backend · Abierta a oportunidades', 'Backend development · Open to opportunities') : days ? `${days.reduce((sum,d) => sum + d.count, 0).toLocaleString(english() ? 'en' : 'es')} ${t('contribuciones en el último año', 'contributions in the last year')}` : failed ? t('Actividad no disponible por el momento.', 'Activity is currently unavailable.') : t('Cargando contribuciones…', 'Loading contributions…');
        text.append(name, detail); head.append(img, text); content.append(head);
        if (kind === 'github') {
            contributions();
            if (days?.length) {
                const graph = document.createElement('div'); graph.className = 'contact-graph'; graph.setAttribute('aria-label', t('Actividad de GitHub', 'GitHub activity'));
                const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
                for (let i = 0; i < offset; i++) { const blank = document.createElement('span'); blank.style.visibility = 'hidden'; graph.append(blank); }
                for (const day of days) {
                    const cell = document.createElement('span');
                    cell.dataset.level = String(day.count === 0 ? 0 : day.count < 3 ? 1 : day.count < 6 ? 2 : day.count < 9 ? 3 : 4);
                    cell.title = `${day.date}: ${day.count} ${t('contribuciones', 'contributions')}`; graph.append(cell);
                }
                content.append(graph);
            }
        }
    }
    function close() { active = null; preview.hidden = true; }
    root.querySelectorAll('.contact-social').forEach((link) => {
        link.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') show(link.dataset.card); });
        link.addEventListener('focus', () => show(link.dataset.card));
    });
    root.addEventListener('pointerleave', () => { closeTimer = setTimeout(() => { if (!root.contains(document.activeElement)) close(); }, 150); });
    root.addEventListener('pointerenter', () => clearTimeout(closeTimer));
    root.addEventListener('focusout', (event) => { if (!root.contains(event.relatedTarget)) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    document.addEventListener('click', (event) => { if (!root.contains(event.target)) close(); });
    copy.addEventListener('click', async () => {
        close(); let copied = false;
        try { await navigator.clipboard.writeText(email); copied = true; } catch {
            const field = document.createElement('textarea'); field.value = email; field.style.cssText = 'position:fixed;opacity:0'; document.body.append(field); field.select();
            try { copied = document.execCommand('copy'); } catch {} field.remove(); copy.focus({ preventScroll: true });
        }
        clearTimeout(timer);
        clearTimeout(clearStatusTimer);
        status.textContent = copied ? t('¡Email copiado!', 'Email copied!') : email;
        requestAnimationFrame(() => status.classList.add('is-visible'));
        timer = setTimeout(() => {
            status.classList.remove('is-visible');
            clearStatusTimer = setTimeout(() => { status.textContent = ''; }, 500);
        }, copied ? 3000 : 8000);
    });
    document.addEventListener('portfolio-language', labels);
    labels();
})();
