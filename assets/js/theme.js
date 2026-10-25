(() => {
    const toggle = document.querySelector('.theme-switch__checkbox');
    if (!toggle) return;
    function apply(theme) {
        document.documentElement.dataset.theme = theme;
        toggle.checked = theme === 'dark';
        try { localStorage.setItem('portfolio-theme', theme); } catch {}
    }
    function label() { toggle.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Dark mode' : 'Modo oscuro'); }
    let saved;
    try { saved = localStorage.getItem('portfolio-theme'); } catch {}
    apply(saved === 'light' ? 'light' : 'dark');
    label();
    let transition;
    toggle.addEventListener('change', () => {
        const next = toggle.checked ? 'dark' : 'light';
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (transition) transition.skipTransition();
        if (document.startViewTransition && !still) {
            transition = document.startViewTransition(() => apply(next));
        } else {
            document.documentElement.classList.toggle('theme-fading', !still);
            apply(next);
        }
    });
    document.addEventListener('portfolio-language', label);
})();
