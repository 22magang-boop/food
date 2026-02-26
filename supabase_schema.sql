-- Run this in Supabase SQL editor

-- Extensions
create extension if not exists pgcrypto;

-- BUSINESS PROFILE (single row)
create table if not exists public.business_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  whatsapp text not null,
  address text not null,
  city text not null,
  province text not null,
  description text not null,
  updated_at timestamptz not null default now()
);

-- PRICING PLANS
create table if not exists public.pricing_plans (
  id text primary key,
  name text not null,
  price text not null,
  period text not null,
  description text,
  features jsonb,
  popular boolean not null default false,
  updated_at timestamptz not null default now()
);

-- CARTS / CATALOG
create table if not exists public.carts (
  id text primary key,
  icon_name text not null,
  name text not null,
  description text not null,
  features jsonb,
  updated_at timestamptz not null default now()
);

-- TESTIMONIALS
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text not null,
  avatar text,
  rating int not null default 5,
  text text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.business_profile enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.carts enable row level security;
alter table public.testimonials enable row level security;

-- Public read policies
drop policy if exists "public read business_profile" on public.business_profile;
create policy "public read business_profile" on public.business_profile
for select using (true);

drop policy if exists "public read pricing_plans" on public.pricing_plans;
create policy "public read pricing_plans" on public.pricing_plans
for select using (true);

drop policy if exists "public read carts" on public.carts;
create policy "public read carts" on public.carts
for select using (true);

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials
for select using (true);

-- Admin write policies
-- IMPORTANT: change this email to your admin email in Supabase Auth
-- This policy allows ONLY that authenticated email to write.

do $$
begin
  -- business_profile
  drop policy if exists "admin write business_profile" on public.business_profile;
  create policy "admin write business_profile" on public.business_profile
  for all
  using ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'))
  with check ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'));

  -- pricing_plans
  drop policy if exists "admin write pricing_plans" on public.pricing_plans;
  create policy "admin write pricing_plans" on public.pricing_plans
  for all
  using ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'))
  with check ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'));

  -- carts
  drop policy if exists "admin write carts" on public.carts;
  create policy "admin write carts" on public.carts
  for all
  using ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'))
  with check ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'));

  -- testimonials
  drop policy if exists "admin write testimonials" on public.testimonials;
  create policy "admin write testimonials" on public.testimonials
  for all
  using ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'))
  with check ((auth.role() = 'authenticated') and ((auth.jwt() ->> 'email') = 'admin@foudcourt.com'));
end $$;
