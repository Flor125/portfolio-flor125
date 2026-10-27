"""Build the initial portfolio migration from the reviewed seed; no remote writes."""
from pathlib import Path
import json

def quote(value):
    if value is None:return 'null'
    if isinstance(value,bool):return 'true' if value else 'false'
    if isinstance(value,int):return str(value)
    return "'"+str(value).replace("'","''")+"'"
def pair(value):return [value['es'],value['en']]
def insert(table,fields,values,conflict='slug'):
    return f"insert into public.{table} ({', '.join(fields)}) values ({', '.join(quote(x) for x in values)}) on conflict ({conflict}) do nothing;\n"
text='''-- Public portfolio content. Only published cards are readable; no public writes.
-- Existing tables outside the portfolio_* namespace are untouched.
begin;
create table public.portfolio_organizations (
    id bigint generated always as identity primary key,
    slug text not null unique,
    name text not null check (length(trim(name)) > 0)
);
create table public.portfolio_projects (
    id bigint generated always as identity primary key,
    slug text not null unique,
    title_es text not null check (length(trim(title_es)) > 0), title_en text,
    description_es text not null, description_en text,
    category text not null,
    url text check (url is null or url ~ '^https://'),
    image_path text, image_alt_es text, image_alt_en text,
    image_fill boolean not null default false,
    status_es text, status_en text,
    sort_order integer not null default 0,
    published boolean not null default false,
    created_at timestamptz not null default now()
);
create table public.portfolio_technologies (
    id bigint generated always as identity primary key,
    name text not null unique
);
create table public.portfolio_project_technologies (
    project_id bigint not null references public.portfolio_projects(id) on delete cascade,
    technology_id bigint not null references public.portfolio_technologies(id) on delete restrict,
    sort_order integer not null default 0,
    primary key (project_id, technology_id)
);
create index portfolio_project_technologies_technology_idx on public.portfolio_project_technologies(technology_id);
create table public.portfolio_experiences (
    id bigint generated always as identity primary key,
    slug text not null unique,
    organization_id bigint not null references public.portfolio_organizations(id) on delete restrict,
    title_es text not null check (length(trim(title_es)) > 0), title_en text,
    subtitle_es text, subtitle_en text,
    label_es text, label_en text,
    period_es text not null, period_en text,
    role_es text not null, role_en text,
    location_es text, location_en text,
    sector_es text, sector_en text,
    image_path text,
    start_date date, end_date date,
    sort_order integer not null default 0,
    published boolean not null default false,
    created_at timestamptz not null default now(),
    check (end_date is null or start_date is null or end_date >= start_date)
);
create index portfolio_experiences_organization_idx on public.portfolio_experiences(organization_id);
create table public.portfolio_experience_paragraphs (
    id bigint generated always as identity primary key,
    experience_id bigint not null references public.portfolio_experiences(id) on delete cascade,
    text_es text not null, text_en text,
    sort_order integer not null default 0,
    unique (experience_id, sort_order)
);
create table public.portfolio_credentials (
    id bigint generated always as identity primary key,
    slug text not null unique,
    organization_id bigint not null references public.portfolio_organizations(id) on delete restrict,
    kind text not null check (kind in ('education','certification')),
    title_es text not null check (length(trim(title_es)) > 0), title_en text,
    url text check (url is null or url ~ '^https://'),
    image_path text, image_alt_es text, image_alt_en text,
    issued_on date,
    sort_order integer not null default 0,
    published boolean not null default false,
    created_at timestamptz not null default now()
);
create index portfolio_credentials_organization_idx on public.portfolio_credentials(organization_id);
'''
tables=['organizations','projects','technologies','project_technologies','experiences','experience_paragraphs','credentials']
for table in tables:
    t='portfolio_'+table
    text+=f'alter table public.{t} enable row level security;\n'
    text+=f'revoke all on public.{t} from public, anon, authenticated;\ngrant select on public.{t} to anon, authenticated;\n'
    text+=f'grant all on public.{t} to service_role;\n'
for table in ['projects','experiences','credentials']:
    text+=f'create policy "Read published cards" on public.portfolio_{table} for select to anon, authenticated using (published);\n'
    text+=f'create index portfolio_{table}_published_order_idx on public.portfolio_{table}(sort_order, id) where published;\n'
text+='''create policy "Read public technologies" on public.portfolio_technologies for select to anon, authenticated using (true);
create policy "Read published project technologies" on public.portfolio_project_technologies for select to anon, authenticated
using (exists (select 1 from public.portfolio_projects p where p.id = project_id and p.published));
create policy "Read published experience paragraphs" on public.portfolio_experience_paragraphs for select to anon, authenticated
using (exists (select 1 from public.portfolio_experiences e where e.id = experience_id and e.published));
create policy "Read organizations with published cards" on public.portfolio_organizations for select to anon, authenticated
using (exists (select 1 from public.portfolio_experiences e where e.organization_id = id and e.published)
    or exists (select 1 from public.portfolio_credentials c where c.organization_id = id and c.published));
'''
# Qualify the outer id to avoid confusing it with the inner experience/credential id.
text=text.replace('e.organization_id = id','e.organization_id = portfolio_organizations.id').replace('c.organization_id = id','c.organization_id = portfolio_organizations.id')
data=json.loads(Path('database/portfolio-seed.json').read_text())
orgs={name:f'organization-{i+1}' for i,name in enumerate(dict.fromkeys(x['organization'] for group in ['experiences','credentials'] for x in data[group]))}
for name,slug in orgs.items():text+=insert('portfolio_organizations',['slug','name'],[slug,name])
for p in data['projects']:
    fields=['slug','sort_order','published','title_es','title_en','description_es','description_en','category','url','image_path','image_alt_es','image_alt_en','image_fill','status_es','status_en']
    text+=insert('portfolio_projects',fields,[p['slug'],p['sort_order'],True,*pair(p['title']),*pair(p['description']),p['category'],p['url'],p['image_path'],*pair(p['image_alt']),p['image_fill'],*pair(p['status'])])
    for i,tech in enumerate(p['technologies']):
        text+=insert('portfolio_technologies',['name'],[tech],'name')
        text+=f"insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,{i} from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug={quote(p['slug'])} and t.name={quote(tech)} on conflict do nothing;\n"
for e in data['experiences']:
    fields=['slug','sort_order','published','title_es','title_en','subtitle_es','subtitle_en','label_es','label_en','period_es','period_en','role_es','role_en','location_es','location_en','sector_es','sector_en','image_path']
    values=[e['slug'],e['sort_order'],True,*pair(e['title']),*pair(e['subtitle']),*pair(e['label']),*pair(e['period']),*pair(e['role']),*pair(e['location']),*pair(e['sector']),e['image_path']]
    text+=f"insert into public.portfolio_experiences ({', '.join(fields)}, organization_id) select {', '.join(quote(x) for x in values)},id from public.portfolio_organizations where slug={quote(orgs[e['organization']])} on conflict (slug) do nothing;\n"
    for i,para in enumerate(e['paragraphs']):text+=f"insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,{quote(para['es'])},{quote(para['en'])},{i} from public.portfolio_experiences where slug={quote(e['slug'])} on conflict do nothing;\n"
for c in data['credentials']:
    fields=['slug','sort_order','published','kind','title_es','title_en','url','image_path','image_alt_es','image_alt_en']
    values=[c['slug'],c['sort_order'],True,c['kind'],*pair(c['title']),c['url'],c['image_path'],*pair(c['image_alt'])]
    text+=f"insert into public.portfolio_credentials ({', '.join(fields)}, organization_id) select {', '.join(quote(x) for x in values)},id from public.portfolio_organizations where slug={quote(orgs[c['organization']])} on conflict (slug) do nothing;\n"
text+='commit;\n'
files=list(Path('supabase/migrations').glob('*_portfolio_content.sql'))
assert len(files)==1, 'Create the migration with supabase migration new portfolio_content first'
files[0].write_text(text)
print(files[0])
