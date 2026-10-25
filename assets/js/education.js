// Carrusel nativo, sin desplazar dos veces el contenido.
(() => {
    const track = document.querySelector('.education-grid');
    if (!track) return;
    const previous = document.querySelector('.education-prev');
    const next = document.querySelector('.education-next');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    function update() {
        previous.disabled = track.scrollLeft < 2;
        next.disabled = track.scrollWidth - track.clientWidth - track.scrollLeft < 2;
    }
    function move(direction) {
        track.scrollBy({ left: direction * track.clientWidth * .8, behavior: motion.matches ? 'instant' : 'smooth' });
    }
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', update, { passive: true });
    track.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
        }
    });
    new ResizeObserver(update).observe(track);
    document.addEventListener('portfolio-language', () => requestAnimationFrame(update));
    update();
})();
