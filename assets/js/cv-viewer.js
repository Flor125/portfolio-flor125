const $ = (selector) => document.querySelector(selector);
const status = $('.status');
let pdf, number = 1, rotation = 0, zoom = 'fit', version = 0, task, searchCursor = 0;
const text = [];
async function render() {
    const token = ++version;
    if (task) { task.cancel(); task = null; }
    const page = await pdf.getPage(number);
    if (token !== version) return;
    const base = page.getViewport({ scale: 1, rotation });
    const scale = zoom === 'fit' ? Math.max(.15, ($('.paper').clientWidth - 48) / base.width) : Number(zoom);
    const viewport = page.getViewport({ scale, rotation });
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width * ratio); canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`; canvas.style.height = `${viewport.height}px`;
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `Página ${number} del CV`);
    $('.paper').replaceChildren(canvas);
    $('#page').value = number; $('#prev').disabled = number === 1; $('#next').disabled = number === pdf.numPages;
    document.querySelectorAll('.thumb').forEach((button, i) => {
        if (i + 1 === number) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    task = page.render({ canvasContext: canvas.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
    try { await task.promise; if (token === version) status.textContent = `Página ${number} de ${pdf.numPages} · ${Math.round(scale * 100)}%`; }
    catch (error) { if (error.name !== 'RenderingCancelledException') status.textContent = 'No se pudo dibujar esta página. Podés abrir o descargar el PDF.'; }
}
function go(value) { number = Math.max(1, Math.min(pdf.numPages, value || 1)); render().catch(fail); }
function fail() { status.textContent = 'No se pudo cargar el visor. Usá Abrir PDF o Descargar. Si abriste el sitio como archivo local, usá Live Server para habilitar este visor.'; }
$('#sidebar').onclick = () => { $('aside').hidden = !$('aside').hidden; $('#sidebar').setAttribute('aria-expanded', String(!$('aside').hidden)); if (pdf) render().catch(fail); };
$('#prev').onclick = () => go(number - 1); $('#next').onclick = () => go(number + 1);
$('#page').onchange = (event) => go(Math.floor(Number(event.target.value)));
$('#rotate').onclick = () => { rotation = (rotation + 90) % 360; render().catch(fail); };
$('#zoom').onchange = (event) => { zoom = event.target.value; render().catch(fail); };
function changeZoom(delta) {
    const current = zoom === 'fit' ? 1 : Number(zoom);
    zoom = String(Math.max(.5, Math.min(2, current + delta)));
    $('#zoom').value = zoom; render().catch(fail);
}
$('#plus').onclick = () => changeZoom(.25); $('#minus').onclick = () => changeZoom(-.25);
$('#search-toggle').onclick = () => { $('.search').hidden = !$('.search').hidden; if (!$('.search').hidden) $('#query').focus(); };
$('.search').onsubmit = async (event) => {
    event.preventDefault(); const query = $('#query').value.trim().toLocaleLowerCase(); if (!pdf || !query) return;
    try {
        for (let offset = 0; offset < pdf.numPages; offset++) {
            const index = (searchCursor + offset) % pdf.numPages;
            if (!text[index]) { const page = await pdf.getPage(index + 1); const content = await page.getTextContent(); text[index] = content.items.map((item) => item.str).join(' '); }
            if (text[index].toLocaleLowerCase().includes(query)) {
                searchCursor = (index + 1) % pdf.numPages; go(index + 1);
                status.textContent = `Texto encontrado en la página ${index + 1}.`; return;
            }
        }
        status.textContent = 'No se encontró ese texto.';
    } catch { status.textContent = 'No se pudo buscar en este documento.'; }
};
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (pdf && zoom === 'fit') render().catch(fail); }, 150); });
try {
    const library = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
    library.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
    const source = new URLSearchParams(location.search).get('file');
    const url = new URL(source || '../assets/documents/CV_Flroencia_Alicia_Sombra.pdf', location.href);
    if (url.origin !== location.origin) throw new Error('Origen inválido');
    pdf = await library.getDocument(url.href).promise;
    $('#total').textContent = `/ ${pdf.numPages}`; $('#page').max = pdf.numPages;
    document.querySelectorAll('.toolbar button, .toolbar input, .toolbar select').forEach((control) => control.disabled = false);
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i), viewport = page.getViewport({ scale: .18 });
        const button = document.createElement('button'); button.className = 'thumb'; button.setAttribute('aria-label', `Ir a página ${i}`);
        const canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height; canvas.setAttribute('aria-hidden', 'true');
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        button.append(canvas, document.createTextNode(String(i))); button.onclick = () => go(i); $('aside').append(button);
    }
    await render();
} catch { fail(); }
