(() => {
    const root = document.querySelector('.hero');
    const layer = root?.querySelector('.hero-grid-pulse');
    const canvas = layer?.querySelector('canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const cells = new Map(), size = 24;
    let width = 1, height = 1, frame = 0, visible = false, guards = [];
    function measure() {
        width = layer.clientWidth; height = layer.clientHeight;
        const dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = width * dpr; canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const bounds = layer.getBoundingClientRect();
        guards = [...root.querySelectorAll('.hero-intro p, .button')].flatMap((node) => {
            const range = document.createRange(); range.selectNodeContents(node);
            return [...range.getClientRects()].map((rect) => ({ left: rect.left - bounds.left - 5, right: rect.right - bounds.left + 5, top: rect.top - bounds.top - 5, bottom: rect.bottom - bounds.top + 5 }));
        });
        cells.clear();
    }
    function light(col, row, hold) {
        if (col < 0 || row < 0 || col * size >= width || row * size >= height || cells.size >= 180) return;
        const key = `${col},${row}`, now = performance.now();
        if (cells.has(key) && cells.get(key).until > now) return;
        const x = col * size + size / 2, y = row * size + size / 2;
        let distance = Infinity;
        for (const box of guards) distance = Math.min(distance, Math.hypot(Math.max(box.left - x, 0, x - box.right), Math.max(box.top - y, 0, y - box.bottom)));
        cells.set(key, { col, row, born: now, until: now + hold, dim: .13 + .87 * Math.min(1, distance / (2.2 * size)), color: `hsl(${(60 - row / Math.max(1, height / size - 1) * 270 + 360) % 360} 94% ${[72,65,58,51,44][Math.floor(Math.random()*5)]}%)` });
        wake();
    }
    function draw(now) {
        frame = 0;
        ctx.clearRect(0, 0, width, height);
        if (!visible || document.hidden || motion.matches) return;
        for (const [key, cell] of cells) {
            const fade = (now - cell.until) / 750;
            if (fade >= 1) { cells.delete(key); continue; }
            ctx.globalAlpha = (now < cell.until ? 1 - (1 - Math.min(1, (now - cell.born) / 160)) ** 2 : 1 - fade ** 2) * cell.dim;
            ctx.fillStyle = cell.color;
            ctx.fillRect(cell.col * size + 1, cell.row * size + 1, size - 1, size - 1);
        }
        ctx.globalAlpha = 1;
        if (cells.size) wake();
    }
    function wake() { if (!frame && visible && !motion.matches && !document.hidden) frame = requestAnimationFrame(draw); }
    root.addEventListener('pointermove', (event) => {
        if (motion.matches || !visible) return;
        const bounds = layer.getBoundingClientRect();
        const col = Math.floor((event.clientX - bounds.left) / size), row = Math.floor((event.clientY - bounds.top) / size);
        for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
            const distance = Math.hypot(dx, dy);
            if (distance <= 2.6 && Math.random() < 1 - distance / 3.2) light(col + dx, row + dy, 260 + Math.random() * 900);
        }
    }, { passive: true });
    setInterval(() => {
        if (!visible || document.hidden || motion.matches) return;
        for (let i = 0; i < 2; i++) light(Math.floor(Math.random()*width/size), Math.floor(Math.random()*height/size), 900 + Math.random()*1600);
    }, 2000);
    new ResizeObserver(measure).observe(layer);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else { cancelAnimationFrame(frame); frame = 0; } }).observe(root);
    motion.addEventListener('change', () => { cells.clear(); ctx.clearRect(0,0,width,height); });
    document.addEventListener('visibilitychange', wake);
    document.fonts.ready.then(measure);
    measure();
})();
