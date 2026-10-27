-- Regression test: execute as administrator in SQL Editor after the migration.
-- All test rows are rolled back. No existing rows are modified.
begin;
insert into public.portfolio_organizations(slug,name) values ('policy-test-hidden-org','Private test organization');
insert into public.portfolio_projects(slug,title_es,description_es,category,published)
values ('policy-test-hidden-project','Private project','Private description','TEST',false);
insert into public.portfolio_experiences(slug,organization_id,title_es,period_es,role_es,published)
select 'policy-test-hidden-experience',id,'Private role','Private period','Private title',false
from public.portfolio_organizations where slug='policy-test-hidden-org';
insert into public.portfolio_experience_paragraphs(experience_id,text_es)
select id,'policy-test-private-paragraph' from public.portfolio_experiences where slug='policy-test-hidden-experience';
insert into public.portfolio_credentials(slug,organization_id,kind,title_es,published)
select 'policy-test-hidden-credential',id,'certification','Private credential',false
from public.portfolio_organizations where slug='policy-test-hidden-org';
set local role anon;
do $$
begin
    if exists(select 1 from public.portfolio_projects where slug='policy-test-hidden-project') then raise exception 'Draft project is public'; end if;
    if exists(select 1 from public.portfolio_experiences where slug='policy-test-hidden-experience') then raise exception 'Draft experience is public'; end if;
    if exists(select 1 from public.portfolio_credentials where slug='policy-test-hidden-credential') then raise exception 'Draft credential is public'; end if;
    if exists(select 1 from public.portfolio_organizations where slug='policy-test-hidden-org') then raise exception 'Private organization is public'; end if;
    if exists(select 1 from public.portfolio_experience_paragraphs where text_es='policy-test-private-paragraph') then raise exception 'Private paragraph is public'; end if;
    if has_table_privilege('anon','public.portfolio_projects','INSERT')
       or has_table_privilege('authenticated','public.portfolio_projects','UPDATE') then raise exception 'Public write privilege detected'; end if;
end $$;
rollback;
