(() => {
    const form = document.querySelector('.contact-form');
    const endpoint = form?.dataset.contactEndpoint;
    if (!endpoint) return;
    const button = form.querySelector('[type="submit"]');
    const status = form.querySelector('.contact-form-status');
    const dialog = document.querySelector('.contact-confirmation');
    const translate = (text) => window.portfolioTranslate?.(text) || text;
    let sending = false;
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => button.focus({ preventScroll: true }));
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (sending || !form.reportValidity()) return;
        sending = true; button.disabled = true; form.setAttribute('aria-busy', 'true');
        status.textContent = translate('Enviando…');
        const values = new FormData(form);
        const payload = Object.fromEntries(['name', 'company', 'email', 'message', 'website'].map(key => [key, String(values.get(key) || '')]));
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 35000);
        try {
            const response = await fetch(endpoint, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), signal: controller.signal, credentials: 'omit'
            });
            const data = await response.json();
            if (!response.ok || data.ok !== true) throw new Error('delivery');
            form.reset(); status.textContent = ''; dialog.showModal();
        } catch {
            status.textContent = translate('No pudimos confirmar el envío. Tu mensaje sigue en el formulario. Podés intentar de nuevo o escribirme a sombraflorencia097@gmail.com.');
        } finally {
            clearTimeout(timeout); sending = false; button.disabled = false; form.removeAttribute('aria-busy');
        }
    });
})();
