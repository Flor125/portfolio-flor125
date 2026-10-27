-- Public portfolio content. Only published cards are readable; no public writes.
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
alter table public.portfolio_organizations enable row level security;
revoke all on public.portfolio_organizations from public, anon, authenticated;
grant select on public.portfolio_organizations to anon, authenticated;
grant all on public.portfolio_organizations to service_role;
alter table public.portfolio_projects enable row level security;
revoke all on public.portfolio_projects from public, anon, authenticated;
grant select on public.portfolio_projects to anon, authenticated;
grant all on public.portfolio_projects to service_role;
alter table public.portfolio_technologies enable row level security;
revoke all on public.portfolio_technologies from public, anon, authenticated;
grant select on public.portfolio_technologies to anon, authenticated;
grant all on public.portfolio_technologies to service_role;
alter table public.portfolio_project_technologies enable row level security;
revoke all on public.portfolio_project_technologies from public, anon, authenticated;
grant select on public.portfolio_project_technologies to anon, authenticated;
grant all on public.portfolio_project_technologies to service_role;
alter table public.portfolio_experiences enable row level security;
revoke all on public.portfolio_experiences from public, anon, authenticated;
grant select on public.portfolio_experiences to anon, authenticated;
grant all on public.portfolio_experiences to service_role;
alter table public.portfolio_experience_paragraphs enable row level security;
revoke all on public.portfolio_experience_paragraphs from public, anon, authenticated;
grant select on public.portfolio_experience_paragraphs to anon, authenticated;
grant all on public.portfolio_experience_paragraphs to service_role;
alter table public.portfolio_credentials enable row level security;
revoke all on public.portfolio_credentials from public, anon, authenticated;
grant select on public.portfolio_credentials to anon, authenticated;
grant all on public.portfolio_credentials to service_role;
create policy "Read published cards" on public.portfolio_projects for select to anon, authenticated using (published);
create index portfolio_projects_published_order_idx on public.portfolio_projects(sort_order, id) where published;
create policy "Read published cards" on public.portfolio_experiences for select to anon, authenticated using (published);
create index portfolio_experiences_published_order_idx on public.portfolio_experiences(sort_order, id) where published;
create policy "Read published cards" on public.portfolio_credentials for select to anon, authenticated using (published);
create index portfolio_credentials_published_order_idx on public.portfolio_credentials(sort_order, id) where published;
create policy "Read public technologies" on public.portfolio_technologies for select to anon, authenticated using (true);
create policy "Read published project technologies" on public.portfolio_project_technologies for select to anon, authenticated
using (exists (select 1 from public.portfolio_projects p where p.id = project_id and p.published));
create policy "Read published experience paragraphs" on public.portfolio_experience_paragraphs for select to anon, authenticated
using (exists (select 1 from public.portfolio_experiences e where e.id = experience_id and e.published));
create policy "Read organizations with published cards" on public.portfolio_organizations for select to anon, authenticated
using (exists (select 1 from public.portfolio_experiences e where e.organization_id = portfolio_organizations.id and e.published)
    or exists (select 1 from public.portfolio_credentials c where c.organization_id = portfolio_organizations.id and c.published));
insert into public.portfolio_organizations (slug, name) values ('organization-1', 'GrantFox') on conflict (slug) do nothing;
insert into public.portfolio_organizations (slug, name) values ('organization-2', 'Universidad Nacional de Villa Mercedes') on conflict (slug) do nothing;
insert into public.portfolio_organizations (slug, name) values ('organization-3', 'Desafío LATAM') on conflict (slug) do nothing;
insert into public.portfolio_organizations (slug, name) values ('organization-4', 'IBM & LearnQuest') on conflict (slug) do nothing;
insert into public.portfolio_organizations (slug, name) values ('organization-5', 'IBM & Coursera') on conflict (slug) do nothing;
insert into public.portfolio_organizations (slug, name) values ('organization-6', 'IBM') on conflict (slug) do nothing;
insert into public.portfolio_organizations (slug, name) values ('organization-7', 'EF SET Cert') on conflict (slug) do nothing;
insert into public.portfolio_projects (slug, sort_order, published, title_es, title_en, description_es, description_en, category, url, image_path, image_alt_es, image_alt_en, image_fill, status_es, status_en) values ('padron-electoral', 1, true, 'Padrón Electoral', 'Electoral Register', 'Sistema de gestión de registros electorales desarrollado en Java, con interfaz gráfica y persistencia de datos en MySQL', 'Electoral record management system built in Java, with a graphical interface and MySQL data persistence.', 'JAVA DESKTOP', 'https://github.com/Flor125/padron', null, '', '', false, '', '') on conflict (slug) do nothing;
insert into public.portfolio_technologies (name) values ('Java') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,0 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='padron-electoral' and t.name='Java' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('Swing') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,1 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='padron-electoral' and t.name='Swing' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('JDBC') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,2 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='padron-electoral' and t.name='JDBC' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('MySQL') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,3 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='padron-electoral' and t.name='MySQL' on conflict do nothing;
insert into public.portfolio_projects (slug, sort_order, published, title_es, title_en, description_es, description_en, category, url, image_path, image_alt_es, image_alt_en, image_fill, status_es, status_en) values ('kiosco-management-system', 2, true, 'Kiosco Management System', 'Kiosco Management System', 'Sistema de gestión de inventario y ventas desplegado en IBM LinuxONE Community Cloud, que integra una aplicación web con procesamiento batch en COBOL.', 'Inventory and sales management system deployed on IBM LinuxONE Community Cloud, integrating a web application with COBOL batch processing.', 'BACKEND & MAINFRAME', 'https://github.com/Flor125/kiosco-management-system-mainframe', 'assets/images/Inventory App Smartphone Mockups.png', 'Mockup de la aplicación de inventario Kiosco Management System', 'Kiosco Management System inventory app mockup', true, '', '') on conflict (slug) do nothing;
insert into public.portfolio_technologies (name) values ('Python') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,0 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='kiosco-management-system' and t.name='Python' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('Flask') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,1 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='kiosco-management-system' and t.name='Flask' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('COBOL') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,2 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='kiosco-management-system' and t.name='COBOL' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('Db2') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,3 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='kiosco-management-system' and t.name='Db2' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('Docker') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,4 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='kiosco-management-system' and t.name='Docker' on conflict do nothing;
insert into public.portfolio_projects (slug, sort_order, published, title_es, title_en, description_es, description_en, category, url, image_path, image_alt_es, image_alt_en, image_fill, status_es, status_en) values ('seeki', 3, true, 'Seeki', 'Seeki', 'Aplicación móvil en desarrollo para crear CVs, adaptarlos a ofertas laborales y organizar postulaciones.', 'Mobile app in development for creating resumes, tailoring them to job openings, and tracking applications.', 'MOBILE DEVELOPMENT', null, 'assets/images/Florencia Resume App Showcase.png', 'Mockup de la aplicación móvil Seeki para crear currículums', 'Seeki resume builder mobile app mockup', false, 'En desarrollo', 'In development') on conflict (slug) do nothing;
insert into public.portfolio_technologies (name) values ('Kotlin') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,0 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='seeki' and t.name='Kotlin' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('Compose') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,1 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='seeki' and t.name='Compose' on conflict do nothing;
insert into public.portfolio_technologies (name) values ('Firebase') on conflict (name) do nothing;
insert into public.portfolio_project_technologies (project_id,technology_id,sort_order) select p.id,t.id,2 from public.portfolio_projects p cross join public.portfolio_technologies t where p.slug='seeki' and t.name='Firebase' on conflict do nothing;
insert into public.portfolio_experiences (slug, sort_order, published, title_es, title_en, subtitle_es, subtitle_en, label_es, label_en, period_es, period_en, role_es, role_en, location_es, location_en, sector_es, sector_en, image_path, organization_id) select 'grantfox', 1, true, 'GrantFox', 'GrantFox', 'Open Source Contributor', 'Open Source Contributor', 'GrantFox — Open Source', 'GrantFox — Open Source', '2026 – Actualidad', '2026 – Present', 'Software Developer Contributor', 'Software Developer Contributor', 'Remoto', 'Remote', 'Desarrollo de software / Open Source', 'Software development / Open Source', 'https://cdn.21st.dev/assets/mirror/25/2501b7e36b9dfc22ae0ade86672f90657a84ab125de956c829ae945ea020807d.jpg',id from public.portfolio_organizations where slug='organization-1' on conflict (slug) do nothing;
insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,'Analicé problemas reportados en repositorios colaborativos e implementé correcciones y mejoras en aplicaciones existentes.','I analyzed issues reported in collaborative repositories and implemented fixes and improvements in existing applications.',0 from public.portfolio_experiences where slug='grantfox' on conflict do nothing;
insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,'Contribuí al desarrollo de funcionalidades y endpoints de verificación del estado de servicios. Trabajé con Git, GitHub, pull requests y revisiones de código.','I contributed features and service health-check endpoints, working with Git, GitHub, pull requests, and code reviews.',1 from public.portfolio_experiences where slug='grantfox' on conflict do nothing;
insert into public.portfolio_experiences (slug, sort_order, published, title_es, title_en, subtitle_es, subtitle_en, label_es, label_en, period_es, period_en, role_es, role_en, location_es, location_en, sector_es, sector_en, image_path, organization_id) select 'practica-profesional', 2, true, 'Práctica Profesional Supervisada', 'Supervised Professional Practice', 'Desarrollo de aplicación de gestión comercial', 'Business management application development', 'Universidad Nacional de Villa Mercedes', 'Universidad Nacional de Villa Mercedes', 'Marzo 2025 – Marzo 2026', 'March 2025 – March 2026', 'Desarrolladora de Software', 'Software Developer', 'Villa Mercedes, San Luis', 'Villa Mercedes, San Luis', 'Desarrollo de software / Gestión comercial', 'Software development / Business management', 'https://cdn.21st.dev/assets/mirror/df/df53cb4060307c6af7dcd889264e29c4699fb65cacd0a51675255888f8d8d96f.jpg',id from public.portfolio_organizations where slug='organization-2' on conflict (slug) do nothing;
insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,'Realicé el relevamiento de necesidades, diseñé e implementé funcionalidades para la administración de información comercial e inventario.','I gathered requirements and designed and implemented features for managing business information and inventory.',0 from public.portfolio_experiences where slug='practica-profesional' on conflict do nothing;
insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,'Integré tecnologías como Python, Flask y bases de datos, realizando pruebas funcionales, validación de información y presentación de resultados ante una evaluación académica.','I integrated Python, Flask, and databases, performed functional testing and data validation, and presented the results for academic evaluation.',1 from public.portfolio_experiences where slug='practica-profesional' on conflict do nothing;
insert into public.portfolio_experiences (slug, sort_order, published, title_es, title_en, subtitle_es, subtitle_en, label_es, label_en, period_es, period_en, role_es, role_en, location_es, location_en, sector_es, sector_en, image_path, organization_id) select 'desafio-latam', 3, true, 'Desafío LATAM', 'Desafío LATAM', 'Programa de colaboración intergeneracional para desarrollar soluciones digitales accesibles a problemas reales.', 'An intergenerational collaboration program developing accessible digital solutions to real-world problems.', 'Becada', 'Scholarship recipient', 'Agosto – Septiembre 2026', 'August – September 2026', 'Colaboradora de Desarrollo y UX', 'Development & UX Collaborator', 'Remoto — Chile', 'Remote — Chile', 'Desarrollo web / UX / Innovación', 'Web development / UX / Innovation', 'https://cdn.21st.dev/assets/mirror/e0/e0737d3f72c598463cd478c389540cf3b14909b84cefef714fbd4d55813b1aa6.jpg',id from public.portfolio_organizations where slug='organization-3' on conflict (slug) do nothing;
insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,'Trabajé durante aproximadamente dos meses junto a una profesional senior en el diseño y desarrollo de un MVP para la gestión de turnos de licencias de conducir.','For approximately two months, I worked alongside a senior professional to design and develop an MVP for managing driving license appointments.',0 from public.portfolio_experiences where slug='desafio-latam' on conflict do nothing;
insert into public.portfolio_experience_paragraphs (experience_id,text_es,text_en,sort_order) select id,'Participé en la construcción de interfaces con Figma y Lovable, utilizando herramientas de inteligencia artificial para acelerar el prototipado y desarrollo. Colaboré en la organización de tareas, reuniones de seguimiento y validación de la propuesta con 27 participantes.','I helped build interfaces with Figma and Lovable, using AI tools to accelerate prototyping and development. I collaborated on task planning, progress meetings, and validating the proposal with 27 participants.',1 from public.portfolio_experiences where slug='desafio-latam' on conflict do nothing;
insert into public.portfolio_credentials (slug, sort_order, published, kind, title_es, title_en, url, image_path, image_alt_es, image_alt_en, organization_id) select 'unvime', 1, true, 'education', 'Programadora Universitaria de Sistemas', 'Associate Degree in System Programming', 'https://registrograduados.siu.edu.ar/consulta.php?id_tipo_documento%5E%5EVlR4S0pDbi9qZ3BQUkVrOFAyMGNpUT09%7C%7Cnro_documento%5E%5EcFJlYWlQdG9LdXhGb1hnN3d0OFpsQT09%7C%7Cnombres%5E%5EUjFUakt4cTlSaE1SS0tHSFFOQkxOZz09%7C%7Capellidos%5E%5ESEdQaFRUbGVRWGNZNUpjQXkwYkJNZz09', 'assets/images/UNViMe.png', 'Universidad Nacional de Villa Mercedes', 'Universidad Nacional de Villa Mercedes',id from public.portfolio_organizations where slug='organization-2' on conflict (slug) do nothing;
insert into public.portfolio_credentials (slug, sort_order, published, kind, title_es, title_en, url, image_path, image_alt_es, image_alt_en, organization_id) select 'ibm-mainframe-developer', 2, true, 'certification', 'IBM Mainframe Developer', 'IBM Mainframe Developer', 'https://coursera.org/share/813eda16ddae3ede23facf0dc32981e8', 'assets/images/Coursera FPUYVS949317-1.png', 'Certificado IBM Mainframe Developer de IBM y LearnQuest', 'IBM Mainframe Developer certificate from IBM and LearnQuest',id from public.portfolio_organizations where slug='organization-4' on conflict (slug) do nothing;
insert into public.portfolio_credentials (slug, sort_order, published, kind, title_es, title_en, url, image_path, image_alt_es, image_alt_en, organization_id) select 'ibm-zos-practitioner', 3, true, 'certification', 'IBM z/OS Mainframe Practitioner', 'IBM z/OS Mainframe Practitioner', 'https://coursera.org/share/256300a3595b414c249972f53db222ff', 'assets/images/Coursera QHJIMTA7C94O-1.png', 'Certificado IBM z/OS Mainframe Practitioner', 'IBM z/OS Mainframe Practitioner certificate',id from public.portfolio_organizations where slug='organization-5' on conflict (slug) do nothing;
insert into public.portfolio_credentials (slug, sort_order, published, kind, title_es, title_en, url, image_path, image_alt_es, image_alt_en, organization_id) select 'ibm-cics', 4, true, 'certification', 'Modernize Applications with IBM CICS', 'Modernize Applications with IBM CICS', 'https://www.credly.com/badges/a29cd4c8-ef90-410c-b21d-1f4b2c81fb0a/public_url', 'assets/images/IBMDesign20261025-20-6rwo75-1.png', 'Certificado Modernize Applications with IBM CICS', 'Modernize Applications with IBM CICS certificate',id from public.portfolio_organizations where slug='organization-6' on conflict (slug) do nothing;
insert into public.portfolio_credentials (slug, sort_order, published, kind, title_es, title_en, url, image_path, image_alt_es, image_alt_en, organization_id) select 'efset-c1', 5, true, 'certification', 'C1 Advanced', 'C1 Advanced', 'https://cert.efset.org/a19rjQ', 'assets/images/EF SET Certificate-1.png', 'Certificado EF SET C1 Advanced', 'EF SET C1 Advanced certificate',id from public.portfolio_organizations where slug='organization-7' on conflict (slug) do nothing;
commit;
