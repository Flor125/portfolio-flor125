import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localized, safeUrl, ordered, fetchCollection, collections } from '../assets/js/portfolio-model.mjs';

test('safe URLs reject script URLs, relative traversal, external credentials and unsafe local images', () => {
    for (const value of ['javascript:alert(1)', 'data:text/html,bad', '//evil.test', 'https://user:password@example.com', 'assets/images/../secret', 'assets/images/evil\\image.png']) assert.equal(safeUrl(value, true), '');
    assert.equal(safeUrl('assets/images/Inventory App Smartphone Mockups.png', true), 'assets/images/Inventory App Smartphone Mockups.png');
    assert.equal(safeUrl('https://example.com/project'), 'https://example.com/project');
});
test('language fallback and ordering support new cards', () => {
    assert.equal(localized({title_es:'Proyecto',title_en:''},'title','en'),'Proyecto');
    assert.equal(localized({title_es:'Proyecto',title_en:'Project'},'title','en'),'Project');
    assert.deepEqual(ordered([{id:2,sort_order:1},{id:4,sort_order:0},{id:1,sort_order:1}]).map(x=>x.id),[4,1,2]);
});
test('published content is fetched in pages with only a publishable key', async () => {
    const calls=[];
    const rows=await fetchCollection({url:'https://example.supabase.co',publishableKey:'sb_publishable_test'},collections.projects,async (url,opts)=>{
        calls.push({url:new URL(url),opts});return {ok:true,json:async()=>calls.length===1?Array.from({length:100},(_,i)=>({id:i})): [{id:100}]};
    });
    assert.equal(rows.length,101);assert.equal(calls[1].url.searchParams.get('offset'),'100');
    assert.equal(calls[0].url.searchParams.get('published'),'eq.true');
    assert.equal(calls[0].opts.headers.apikey,'sb_publishable_test');
    assert.equal(calls[0].opts.credentials,'omit');
});
test('network errors and malformed data reject instead of erasing initial cards',async()=>{
    const cfg={url:'https://example.supabase.co',publishableKey:'key'};
    await assert.rejects(fetchCollection(cfg,collections.projects,async()=>({ok:false,status:503})));
    await assert.rejects(fetchCollection(cfg,collections.projects,async()=>({ok:true,json:async()=>({error:'bad'})})));
});
