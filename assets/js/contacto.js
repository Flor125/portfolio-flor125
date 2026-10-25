// Le dessin reste visible si les données géographiques ne sont pas disponibles.
(() => {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (event) => event.preventDefault());
    if (!window.d3 || !window.topojson) return;
    const svg = d3.select('.contact-globe');
    const toggle = document.querySelector('.globe-toggle');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, paused = false, frame = 0, previous = 0, angle = 65;
    const projection = d3.geoOrthographic().scale(225).translate([250, 250]).rotate([angle, -15]);
    const path = d3.geoPath(projection);
    let countries;
    function paint() {
        projection.rotate([angle, -15]);
        countries.attr('d', path);
    }
    function tick(now) {
        frame = 0;
        if (!visible || paused || motion.matches || document.hidden) { previous = 0; return; }
        if (previous) angle = (angle + Math.min(now - previous, 64) * .012) % 360;
        previous = now;
        paint();
        frame = requestAnimationFrame(tick);
    }
    function update() {
        cancelAnimationFrame(frame); frame = 0; previous = 0;
        const label = paused || motion.matches ? 'Girar globo' : 'Pausar globo';
        toggle.textContent = window.portfolioTranslate ? window.portfolioTranslate(label) : label;
        toggle.disabled = motion.matches;
        if (countries && visible && !paused && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
    }
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then((response) => { if (!response.ok) throw new Error('Atlas no disponible'); return response.json(); })
        .then((world) => {
            const features = topojson.feature(world, world.objects.countries).features;
            svg.selectAll('*').remove();
            svg.append('circle').attr('cx', 250).attr('cy', 250).attr('r', 225).attr('fill', 'none').attr('stroke', 'currentColor').attr('stroke-opacity', .3);
            countries = svg.selectAll('path').data(features).join('path').attr('fill', 'none').attr('stroke', 'currentColor').attr('stroke-width', .65);
            paint(); toggle.hidden = false; update();
        }).catch(() => { /* Se conserva el globo de respaldo en SVG. */ });
    toggle.addEventListener('click', () => { paused = !paused; update(); });
    motion.addEventListener('change', update);
    document.addEventListener('portfolio-language', update);
    document.addEventListener('visibilitychange', update);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }).observe(svg.node());
})();
