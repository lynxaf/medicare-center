-- alter table public.patients enable row level security;

-- drop policy if exists "Authenticated users can view patients" on public.patients;

-- create policy "Authenticated users can view patients"
-- on public.patients
-- for select
-- to authenticated
-- using (true);

-- drop policy if exists "Authenticated users can create patients" on public.patients;

-- create policy "Authenticated users can create patients"
-- on public.patients
-- for insert
-- to authenticated
-- with check (true);

-- drop policy if exists "Authenticated users can update patients" on public.patients;

-- create policy "Authenticated users can update patients"
-- on public.patients
-- for update
-- to authenticated
-- using (true)
-- with check (true);

-- drop policy if exists "Authenticated users can delete patients" on public.patients;

-- create policy "Authenticated users can delete patients"
-- on public.patients
-- for delete
-- to authenticated
-- using (true);

revoke all on table public.patients from anon;

revoke all on table public.patients from authenticated;

grant
    select,
    insert,
    update,
    delete
on table public.patients to anon;

grant
    select,
    insert,
    update,
    delete
on table public.patients to authenticated;

alter table public.patients enable row level security;

drop policy if exists patients_select_authenticated on public.patients;

create policy patients_select_authenticated on public.patients
for select to authenticated using (true);

drop policy if exists patients_insert_authenticated on public.patients;

create policy patients_insert_authenticated on public.patients
for insert to authenticated
with check (true);

drop policy if exists patients_update_authenticated on public.patients;

create policy patients_update_authenticated on public.patients
for update to authenticated
using (true)
with check (true);

drop policy if exists patients_delete_authenticated on public.patients;

create policy patients_delete_authenticated on public.patients for delete to authenticated using (true);

drop policy if exists patients_select_anon on public.patients;

create policy patients_select_anon on public.patients
for select to anon
using (true);

drop policy if exists patients_insert_anon on public.patients;

create policy patients_insert_anon on public.patients
for insert to anon
with check (true);

drop policy if exists patients_update_anon on public.patients;

create policy patients_update_anon on public.patients
for update to anon
using (true)
with check (true);

drop policy if exists patients_delete_anon on public.patients;

create policy patients_delete_anon on public.patients for delete to anon using (true);