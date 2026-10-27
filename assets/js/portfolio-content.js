import { localized, ordered, safeUrl, collections, fetchCollection } from './portfolio-model.mjs';

const config = window.portfolioDatabase;
let content = {};
const lang = () => document.documentElement.lang === 'en' ? 'en' : 'es';
const t = (es, en) => lang() === 'en' ? en : es;
const text = (row, field) => localized(row, field, lang());
function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
}
function linkCard(className, value) {
    const url = safeUrl(value);
    const node = element(url ? 'a' : 'article', className + (url ? ' ' + (className === 'project-card' ? 'project-card-link' : 'offer-card-link') : ''));
    if (url) { node.href = url; node.target = '_blank'; node.rel = 'noopener noreferrer'; }
    return node;
}
function image(path, alt, className = '') {
    const src = safeUrl(path, true);
    if (!src) return null;
    const img = element('img', className);
    img.src = src; img.alt = alt; img.loading = 'lazy'; img.decoding = 'async';
    return img;
}
function project(row, index) {
    const wrapper = element('div', 'project-perspective');
    const card = linkCard('project-card', row.url);
    if (card.tagName === 'A') card.setAttribute('aria-label', `${text(row, 'title')}: ${t('abrir proyecto en otra pestaña', 'open project in a new tab')}`);
    card.append(element('span', 'project-number card-layer', `${String(index + 1).padStart(2, '0')} / ${row.category || ''}`), element('h3', 'card-layer', text(row, 'title')), element('p', 'card-layer', text(row, 'description')));
    const cover = element('div', 'project-cover card-layer');
    const img = image(row.image_path, text(row, 'image_alt'));
    if (img) { cover.classList.add('project-cover-image'); if (row.image_fill) cover.classList.add('project-cover-fill'); cover.append(img); }
    else { cover.classList.add('cover-1'); cover.setAttribute('aria-hidden', 'true'); cover.append(element('span', '', String(index + 1).padStart(2, '0')), element('span', 'cover-symbol', '✳')); }
    const footer = element('div', 'project-footer card-layer');
    const technologies = ordered(row.portfolio_project_technologies || []).map(item => item.portfolio_technologies?.name).filter(Boolean).join(' · ');
    footer.append(element('span', '', technologies));
    const tail = element('span', card.tagName === 'A' ? '' : 'project-private', card.tagName === 'A' ? '↗' : text(row, 'status'));
    if (card.tagName === 'A') tail.setAttribute('aria-hidden', 'true');
    footer.append(tail); card.append(cover, footer); wrapper.append(card); return wrapper;
}
function experience(row, index) {
    const card = element('article', 'impact-row');
    const titleId = `experience-db-${row.id}`;
    card.setAttribute('aria-labelledby', titleId);
    const img = image(row.image_path, '', 'impact-background'); if (img) card.append(img);
    const company = element('div', 'impact-company');
    const heading = element('h3', '', text(row, 'title')); heading.id = titleId;
    company.append(element('span', 'impact-index', `${String(index + 1).padStart(2, '0')} / ${text(row, 'label') || row.portfolio_organizations?.name || ''}`), heading, element('p', '', text(row, 'subtitle')), element('p', 'impact-period', text(row, 'period')));
    const details = element('dl', 'impact-details');
    for (const [field, label] of [['role', t('Puesto', 'Role')], ['location', t('Ubicación', 'Location')], ['sector', t('Sector', 'Industry')]]) {
        details.append(element('dt', '', label), element('dd', '', text(row, field)));
    }
    const description = element('div', 'impact-description');
    for (const paragraph of ordered(row.portfolio_experience_paragraphs || [])) description.append(element('p', '', text(paragraph, 'text')));
    card.append(company, details, description); return card;
}
function credential(row) {
    const card = linkCard('offer-card', row.url);
    if (card.tagName === 'A') card.setAttribute('aria-label', `${text(row, 'title')}: ${t('ver credencial en otra pestaña', 'view credential in a new tab')}`);
    const cover = element('div', 'offer-image'), img = image(row.image_path, text(row, 'image_alt'));
    if (img) { img.width = 256; img.height = 160; cover.append(img); }
    const body = element('div', 'offer-content'), title = element('div', 'offer-title-row');
    title.append(element('h3', '', row.portfolio_organizations?.name || ''));
    body.append(title, element('p', 'offer-subtitle', text(row, 'title'))); card.append(cover, body); return card;
}
const targets = {
    projects: { selector: '.projects-grid', render: project },
    experiences: { selector: '.impact-list', render: experience },
    credentials: { selector: '.education-grid', render: credential }
};
function render(key) {
    const { selector, render } = targets[key], target = document.querySelector(selector);
    if (!target) return;
    const rows = ordered(content[key]);
    const fragment = document.createDocumentFragment();
    rows.forEach((row, i) => fragment.append(render(row, i)));
    if (!rows.length) fragment.append(element('p', 'portfolio-empty', t('Próximamente, más novedades.', 'More updates coming soon.')));
    target.replaceChildren(fragment);
    document.dispatchEvent(new CustomEvent('portfolio-content', { detail: { section: key } }));
}
document.addEventListener('portfolio-language', () => Object.keys(content).forEach(render));
if (config?.url && config.publishableKey) {
    // Sections are independent: a failed request keeps that section's initial HTML.
    for (const [key, collection] of Object.entries(collections)) {
        fetchCollection(config, collection).then(rows => { content[key] = rows; render(key); })
            .catch(() => console.warn(`Portfolio: ${key} unavailable; keeping initial content.`));
    }
}
