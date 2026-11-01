-- create table if not exists public.patients (
--   id uuid primary key default gen_random_uuid(),
--   no_rm text not null unique,
--   name text not null,
--   nik text not null unique,
--   birth_date date not null,
--   gender text not null check (gender in ('Laki-laki', 'Perempuan')),
--   phone text not null,
--   clinic text not null check (clinic in ('Poli Jantung', 'Poli Anak', 'Poli Umum')),
--   status text not null check (status in ('Rawat Jalan', 'Rawat Inap', 'Selesai')),
--   address text not null,
--   created_at timestamptz not null default now(),
--   updated_at timestamptz not null default now(),

--   constraint patients_nik_length check (char_length(nik) = 16),
--   constraint patients_nik_digits check (nik ~ '^[0-9]{16}$')
-- );

-- create index if not exists patients_name_idx
-- on public.patients using btree (name);

-- create index if not exists patients_clinic_idx
-- on public.patients using btree (clinic);

-- create index if not exists patients_status_idx
-- on public.patients using btree (status);

-- create or replace function public.set_patients_updated_at()
-- returns trigger
-- language plpgsql
-- as $$
-- begin
--   new.updated_at = now();
--   return new;
-- end;
-- $$;

-- drop trigger if exists set_patients_updated_at on public.patients;

-- create trigger set_patients_updated_at
-- before update on public.patients
-- for each row
-- execute function public.set_patients_updated_at();

create extension if not exists "pgcrypto";

do $$
begin 
if not exists (select 1 from pg_type where typname = 'gender_enum') then
    create type public.gender_enum as enum ('Laki-laki', 'Perempuan');
end if;

if not exists (
  select 1 
  from pg_type
  where 
    typname = 'care_status_enum'
) then create type public.care_status_enum as enum ('Rawat Jalan', 'Rawat Inap', 'observasi', 'Selesai');
end if;

if not exists (
  select 1 
  from pg_type
  where 
    typname = 'clinic_enum'
) then create type public.clinic_enum as enum ('poli umum','poli_gigi','Poli Jantung','poli_penyakit_dalam', 'Poli Kandungan', 'Poli Anak', 'Poli darurat');
end if;

end $$;

create table if not exists public.patients (

    id uuid primary key default gen_random_uuid(),

    medical_record_no varchar(40) not null unique,

    national_id varchar(30) not null unique,

    full_name varchar(150) not null,

    birth_date date not null,

    gender public.gender_enum not null,

    phone varchar(30) not null,

    poli public.clinic_enum not null,

    care_status public.care_status_enum not null default 'Rawat Jalan',

    address text not null,

    avatar_url text,

    created_at timestamptz not null default timezone('utc', now()),

    updated_at timestamptz not null default timezone('utc', now()),

    constraint patients_national_id_format_check check (
        national_id ~ '^[0-9]{16}$'
    ),

    constraint patients_phone_format_check check (
        phone ~ '^[0-9+()\\-\\s]{8,30}$'
    )

);

create index if not exists patients_full_name_idx on public.patients (full_name);

create index if not exists patients_poli_idx on public.patients (poli);

create index if not exists patients_care_status_idx on public.patients (care_status);

create index if not exists patients_created_at_idx on public.patients (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc', now());

    return new;
end;
$$;

drop trigger if exists trg_patients_set_updated_at on public.patients;

create trigger trg_patients_set_updated_at
before update on public.patients
for each row
execute function public.set_updated_at();

comment on table public.patients is 'Table Patients.';

comment on column public.patients.medical_record_no is 'No. Rekam Medis (RM).';

comment on column public.patients.national_id is 'NIK stored as string to preserve leading zeros.';

comment on column public.patients.phone is 'Phone number stored as string.';