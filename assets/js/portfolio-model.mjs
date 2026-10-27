export function localized(record, field, language = 'es') {
    return record[`${field}_${language}`]?.trim() || record[`${field}_es`]?.trim() || '';
}
export function ordered(rows) {
    return [...rows].sort((a, b) => (a.sort_order - b.sort_order) || (a.id - b.id));
}
export function safeUrl(value, image = false) {
    if (typeof value !== 'string' || !value.trim()) return '';
    if (image && /^assets\/images\/(?!.*(?:\.\.|[\\\u0000-\u001f]))[^?#]+$/.test(value)) return value;
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
    } catch { return ''; }
}
export const collections = {
    projects: { table: 'portfolio_projects', select: '*,portfolio_project_technologies(sort_order,portfolio_technologies(name))' },
    experiences: { table: 'portfolio_experiences', select: '*,portfolio_organizations(name),portfolio_experience_paragraphs(id,sort_order,text_es,text_en)' },
    credentials: { table: 'portfolio_credentials', select: '*,portfolio_organizations(name)' }
};
export async function fetchCollection(config, collection, fetcher = fetch) {
    const rows = [], pageSize = 100;
    for (let offset = 0; ; offset += pageSize) {
        const url = new URL(`/rest/v1/${collection.table}`, config.url);
        url.search = new URLSearchParams({ select: collection.select, published: 'eq.true', order: 'sort_order.asc,id.asc', limit: String(pageSize), offset: String(offset) });
        const response = await fetcher(url.href, {
            headers: { apikey: config.publishableKey, Accept: 'application/json' },
            signal: AbortSignal.timeout(10000), cache: 'no-store', credentials: 'omit'
        });
        if (!response.ok) throw new Error(`Portfolio API: ${response.status}`);
        const page = await response.json();
        if (!Array.isArray(page) || page.some(row => !row || typeof row !== 'object' || !Number.isFinite(row.id))) throw new Error('Invalid portfolio response');
        rows.push(...page);
        if (page.length < pageSize) return rows;
    }
}
