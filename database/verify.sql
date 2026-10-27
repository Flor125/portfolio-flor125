-- Run as the project administrator after the migration.
select relname as table_name, relrowsecurity as rls_enabled
from pg_class join pg_namespace n on n.oid = relnamespace
where n.nspname = 'public' and relkind = 'r' and relname like 'portfolio_%'
order by relname;

select table_name, privilege_type, grantee from information_schema.role_table_grants
where table_schema = 'public' and table_name like 'portfolio_%'
and grantee in ('anon','authenticated') order by table_name, grantee, privilege_type;
-- Expected: SELECT only for these roles.

select 'projects' as section, count(*) as total, count(*) filter (where published) as published from public.portfolio_projects
union all select 'experiences',count(*),count(*) filter (where published) from public.portfolio_experiences
union all select 'credentials',count(*),count(*) filter (where published) from public.portfolio_credentials;

select p.slug,t.name,pt.sort_order from public.portfolio_projects p
join public.portfolio_project_technologies pt on pt.project_id=p.id
join public.portfolio_technologies t on t.id=pt.technology_id
order by p.sort_order,pt.sort_order;

-- Read-only anonymous policy check. Transaction is always rolled back.
begin;
set local role anon;
select slug from public.portfolio_projects order by sort_order,id;
select e.slug,o.name from public.portfolio_experiences e join public.portfolio_organizations o on o.id=e.organization_id order by e.sort_order,e.id;
select slug,kind from public.portfolio_credentials order by sort_order,id;
rollback;
