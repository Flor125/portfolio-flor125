(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const track = document.querySelector('.projects-grid');
    const previous = document.querySelector('.projects-prev');
    const next = document.querySelector('.projects-next');
    function updateProjects() {
        if (!track) return;
        previous.disabled = track.scrollLeft <= 8;
        next.disabled = track.scrollWidth - track.clientWidth - track.scrollLeft <= 8;
    }
    function move(direction) {
        track.scrollBy({ left: direction * track.clientWidth * .85, behavior: motion.matches ? 'instant' : 'smooth' });
    }
    if (track && previous && next) {
        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        track.addEventListener('scroll', updateProjects, { passive: true });
        track.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
            }
        });
        new ResizeObserver(updateProjects).observe(track);
        updateProjects();
    }
    const list = document.querySelector('.impact-list');
    const toggle = document.querySelector('.experience-toggle');
    let expanded = false;
    function updateExperience() {
        if (!list || !toggle) return;
        const cards = [...list.querySelectorAll('.impact-row')];
        const english = document.documentElement.lang === 'en';
        cards.forEach((card, index) => { card.hidden = !expanded && index >= 3; });
        toggle.hidden = cards.length <= 3;
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.querySelector('.experience-toggle-label').textContent = expanded
            ? (english ? 'Show less' : 'Ver menos')
            : (english ? 'View all experience' : 'Ver toda la experiencia');
        toggle.querySelector('.experience-toggle-arrow').textContent = expanded ? '↑' : '↓';
    }
    toggle?.addEventListener('click', () => {
        expanded = !expanded;
        if (!expanded) {
            const destination = list.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: destination, behavior: motion.matches ? 'instant' : 'smooth' });
        }
        updateExperience();
    });
    document.addEventListener('portfolio-content', () => { updateProjects(); updateExperience(); });
    document.addEventListener('portfolio-language', () => { requestAnimationFrame(updateProjects); updateExperience(); });
    updateExperience();
})();
