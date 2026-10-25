const video = document.querySelector('.hero-video');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotion = () => {
            if (!video) return;
            if (reducedMotion.matches) video.pause();
            else video.play().catch(() => {});
        };
        reducedMotion.addEventListener('change', updateMotion);
        updateMotion();

        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        document.querySelectorAll('.project-perspective').forEach((container) => {
            const card = container.querySelector('.project-card');
            const reset = () => {
                card.style.removeProperty('transform');
                card.classList.remove('is-tilted');
            };
            container.addEventListener('pointermove', (event) => {
                if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
                const bounds = container.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                card.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
                card.classList.add('is-tilted');
            });
            container.addEventListener('pointerleave', reset);
            container.addEventListener('pointercancel', reset);
            reducedMotion.addEventListener('change', reset);
            finePointer.addEventListener('change', reset);
        });

// Wordmark «sombra»: una máscara de texto se convierte en puntos con resortes.
document.querySelectorAll('.hwf-root').forEach((root) => {
    root.querySelector('.hwf-up').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    });
    const area = root.querySelector('.hwf-word');
    const canvas = area.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width, height, dpr, dots = [], frame = 0, visible = false;
    let pointer = null, ring = null;
    const wake = () => { if (!frame && visible) frame = requestAnimationFrame(draw); };
    function layout() {
        width = Math.max(1, Math.round(area.clientWidth));
        height = Math.max(1, Math.round(area.clientHeight));
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr; canvas.height = height * dpr;
        const mask = document.createElement('canvas');
        mask.width = width; mask.height = height;
        const m = mask.getContext('2d', { willReadFrequently: true });
        if (!m) return;
        m.font = '800 100px Arial';
        const size = width * 1.02 / m.measureText('sombra').width * 100;
        m.font = `800 ${size}px Arial`;
        const box = m.measureText('sombra');
        m.fillText('sombra', (width - box.width) / 2, height + (box.actualBoundingBoxAscent || size * .72) * .2);
        const pixels = m.getImageData(0, 0, width, height).data;
        dots = [];
        const gap = 6;
        for (let y = 0; y < height; y += gap) {
            for (let x = 0; x < width; x += gap) {
                let alpha = 0;
                for (let sy = 0; sy < 3; sy++) for (let sx = 0; sx < 3; sx++) {
                    const px = Math.min(width - 1, x + sx * 2 + 1);
                    const py = Math.min(height - 1, y + sy * 2 + 1);
                    alpha += pixels[(py * width + px) * 4 + 3];
                }
                const coverage = alpha / (9 * 255);
                if (coverage > .06) dots.push({ x: x + 3, y: y + 3, hx: x + 3, hy: y + 3, vx: 0, vy: 0, r: Math.sqrt(coverage) * gap * .48 });
            }
        }
        root.classList.add('hwf-ready');
        wake();
    }
    function draw(now) {
        frame = 0;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        let moving = false;
        const age = ring ? now - ring.time : Infinity;
        for (const dot of dots) {
            if (!reducedMotion.matches) {
                if (pointer) {
                    const dx = dot.x - pointer.x, dy = dot.y - pointer.y;
                    const distance = Math.hypot(dx, dy) || .001;
                    if (distance < 80) {
                        const force = (1 - distance / 80) * 2.6;
                        dot.vx += dx / distance * force; dot.vy += dy / distance * force;
                    }
                }
                if (age < 900) {
                    const dx = dot.hx - ring.x, dy = dot.hy - ring.y;
                    const distance = Math.hypot(dx, dy) || .001;
                    const band = Math.max(0, 1 - Math.abs(distance - age * .9) / 26);
                    const force = band * 3.2 * (1 - age / 900);
                    dot.vx += dx / distance * force; dot.vy += dy / distance * force;
                }
                dot.vx = (dot.vx + (dot.hx - dot.x) * .05) * .84;
                dot.vy = (dot.vy + (dot.hy - dot.y) * .05) * .84;
                dot.x += dot.vx; dot.y += dot.vy;
                if (Math.abs(dot.vx) + Math.abs(dot.vy) + Math.abs(dot.x - dot.hx) + Math.abs(dot.y - dot.hy) > .05) moving = true;
                else { dot.x = dot.hx; dot.y = dot.hy; dot.vx = dot.vy = 0; }
            } else { dot.x = dot.hx; dot.y = dot.hy; dot.vx = dot.vy = 0; }
            const warmth = Math.min(1, Math.hypot(dot.x - dot.hx, dot.y - dot.hy) / 28);
            const ink = document.documentElement.dataset.theme === 'light' ? [32, 46, 68] : [233, 228, 218];
            const warm = [233, 118, 43];
            ctx.fillStyle = `rgb(${ink.map((channel, i) => Math.round(channel + (warm[i] - channel) * warmth)).join(',')})`;
            ctx.beginPath(); ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2); ctx.fill();
        }
        if (!reducedMotion.matches && (moving || age < 900)) wake();
    }
    const local = (event) => {
        const box = area.getBoundingClientRect();
        return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    area.addEventListener('pointermove', (event) => {
        if (reducedMotion.matches || event.pointerType === 'touch') return;
        pointer = local(event); wake();
    });
    const leave = () => { pointer = null; wake(); };
    area.addEventListener('pointerleave', leave);
    area.addEventListener('pointercancel', leave);
    area.addEventListener('pointerdown', (event) => {
        if (reducedMotion.matches) return;
        ring = { ...local(event), time: performance.now() }; wake();
    });
    reducedMotion.addEventListener('change', () => { pointer = null; ring = null; wake(); });
    new ResizeObserver(layout).observe(area);
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else { cancelAnimationFrame(frame); frame = 0; pointer = null; }
    }).observe(root);
    new MutationObserver(wake).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    layout();
});

// El menú refleja la sección visible sin cambiar de página.
const sectionLinks = document.querySelectorAll('.single-page .navigation a');
if (sectionLinks.length) {
    const sections = [...sectionLinks].map((link) => document.querySelector(link.getAttribute('href')));
    const updateSection = () => {
        const line = window.innerHeight * .35;
        let current = sections[0];
        for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section;
        sectionLinks.forEach((link) => {
            if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    window.addEventListener('scroll', updateSection, { passive: true });
    window.addEventListener('resize', updateSection);
    updateSection();
}

// Transición de duración configurable hacia cada diapositiva.
if (document.body.classList.contains('single-page')) {
    let slideFrame = 0;
    const cancelSlide = () => {
        cancelAnimationFrame(slideFrame);
        slideFrame = 0;
        document.documentElement.style.removeProperty('scroll-snap-type');
    };
    window.addEventListener('wheel', cancelSlide, { passive: true });
    window.addEventListener('touchstart', cancelSlide, { passive: true });
    window.addEventListener('keydown', (event) => {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) cancelSlide();
    });
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.getElementById(link.hash.slice(1));
            if (!target || link.classList.contains('skip-link') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            cancelSlide();
            const shell = target.closest('.section-shell') || target;
            const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 88;
            const start = window.scrollY;
            const destination = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, shell.getBoundingClientRect().top + start - (target.id === 'inicio' ? 0 : offset)));
            const duration = reducedMotion.matches ? 0 : parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slide-duration')) * 1000 || 800;
            history.pushState(null, '', link.hash);
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            if (!reducedMotion.matches) {
                target.classList.remove('slide-enter');
                void target.offsetWidth;
                target.classList.add('slide-enter');
            }
            document.documentElement.style.scrollSnapType = 'none';
            const begun = performance.now();
            function step(now) {
                const progress = duration ? Math.min(1, (now - begun) / duration) : 1;
                const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
                window.scrollTo({ top: start + (destination - start) * eased, behavior: 'instant' });
                if (progress < 1) slideFrame = requestAnimationFrame(step);
                else cancelSlide();
            }
            slideFrame = requestAnimationFrame(step);
        });
    });
}

// Le CV utilise le lecteur PDF du navigateur, sans dépendances React.
const cvDialog = document.querySelector('.cv-dialog');
const cvLauncher = document.querySelector('.cv-launcher');
if (cvDialog && cvLauncher) {
    const frame = cvDialog.querySelector('.cv-frame');
    const closeCV = () => cvDialog.close();
    const loadCV = () => {
        const source = cvDialog.dataset.pdfSrc.trim();
        if (source) {
            const url = new URL(source, document.baseURI);
            if (['http:', 'https:', 'file:'].includes(url.protocol)) {
                if (frame.dataset.source !== url.href) {
                    frame.src = `pages/cv-viewer.html?file=${encodeURIComponent(url.href)}`;
                    frame.dataset.source = url.href;
                }
                frame.hidden = false;
                cvDialog.querySelector('.cv-empty').hidden = true;
                cvDialog.querySelector('.cv-help').hidden = false;
                for (const link of cvDialog.querySelectorAll('.cv-open, .cv-download')) {
                    link.href = url.href;
                    link.hidden = false;
                }
            }
        }
    };
    cvLauncher.addEventListener('click', () => {
        loadCV();
        if (!cvDialog.open) cvDialog.showModal();
    });
    document.addEventListener('portfolio-language', () => {
        if (cvDialog.open) loadCV();
    });
    cvDialog.querySelector('.cv-close').addEventListener('click', closeCV);
    cvDialog.addEventListener('click', (event) => {
        const bounds = cvDialog.getBoundingClientRect();
        if (event.target === cvDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeCV();
    });
    cvDialog.addEventListener('close', () => cvLauncher.focus({ preventScroll: true }));
}

// Dock adapté à la souris, au clavier et aux écrans tactiles.
document.querySelectorAll('.tech-dock').forEach((dock) => {
    const rail = dock.querySelector('.tech-rail');
    const tiles = [...rail.querySelectorAll('.tech-tile')];
    const slots = [...rail.children];
    const tooltip = dock.querySelector('.tech-tooltip');
    slots.forEach((slot, i) => slot.style.zIndex = slots.length - i);
    function activate(x) {
        const width = slots[0].offsetWidth;
        const centers = slots.map((slot) => slot.offsetLeft + slot.offsetWidth / 2);
        const swell = centers.map((center) => Math.max(0, 1 - Math.abs(x - center) / width / 1.2) ** 2);
        let nearest = 0;
        centers.forEach((center, i) => { if (Math.abs(x - center) < Math.abs(x - centers[nearest])) nearest = i; });
        tiles.forEach((tile, i) => {
            const push = swell.reduce((total, value, k) => total + (k === i ? 0 : value * (k < i ? 1 : -1)), 0) * width * .26;
            tile.style.setProperty('--push', `${push}px`);
            tile.style.setProperty('--lift', `${-swell[i] * width * .19}px`);
            tile.style.setProperty('--scale', 1 + swell[i] * .28);
            tile.style.setProperty('--angle', `${parseFloat(tile.style.getPropertyValue('--lean')) * (1 - swell[i])}deg`);
        });
        tooltip.textContent = tiles[nearest].dataset.label;
        const stage = dock.querySelector('.tech-dock-stage');
        const proposed = centers[nearest] + rail.offsetLeft;
        const half = tooltip.offsetWidth / 2;
        tooltip.style.left = `${Math.max(half, Math.min(stage.clientWidth - half, proposed))}px`;
        dock.classList.add('is-active');
    }
    function reset() {
        dock.classList.remove('is-active');
        tiles.forEach((tile) => ['--push', '--lift', '--scale', '--angle'].forEach((key) => tile.style.removeProperty(key)));
    }
    rail.addEventListener('pointermove', (event) => { if (event.pointerType === 'mouse') activate(event.clientX - rail.getBoundingClientRect().left); });
    rail.addEventListener('pointerdown', (event) => activate(event.clientX - rail.getBoundingClientRect().left));
    rail.addEventListener('pointerleave', () => { if (!rail.contains(document.activeElement)) reset(); });
    rail.addEventListener('pointercancel', reset);
    tiles.forEach((tile, i) => {
        tile.addEventListener('focus', () => activate(slots[i].offsetLeft + slots[i].offsetWidth / 2));
        tile.addEventListener('keydown', (event) => { if (event.key === 'Escape') reset(); });
    });
    rail.addEventListener('focusout', (event) => { if (!rail.contains(event.relatedTarget)) reset(); });
    reducedMotion.addEventListener('change', reset);
});


