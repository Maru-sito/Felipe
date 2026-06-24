-- BoRo Lite — Core Schema
-- Apply via: Supabase Dashboard > SQL Editor

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- PROFILES (extends auth.users)
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  phone       text,
  role        text not null default 'client' check (role in ('client', 'admin')),
  created_at  timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id or is_admin());

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Admins can insert profiles"
  on profiles for insert
  with check (is_admin() or auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- MODALITIES
create table if not exists modalities (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  price_deposit integer not null,
  duration_min  integer not null,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table modalities enable row level security;

create policy "Modalities are publicly readable"
  on modalities for select
  using (true);

create policy "Only admins can manage modalities"
  on modalities for all
  using (is_admin());

-- Seed modalities
insert into modalities (slug, name, description, price_deposit, duration_min) values
  ('editorial', 'Sesión Editorial', 'Producción editorial de alto impacto. Concepto, dirección creativa y postproducción incluidos.', 350000, 180),
  ('retrato', 'Retrato de Autor', 'Retratos íntimos y expresivos. Ideal para artistas, músicos y figuras públicas.', 150000, 90),
  ('comercial', 'Fotografía Comercial', 'Contenido visual para marcas y campañas. Estética de campaña internacional.', 250000, 120)
on conflict (slug) do nothing;

-- BOOKINGS
create table if not exists bookings (
  id                        uuid primary key default gen_random_uuid(),
  client_id                 uuid references profiles(id),
  modality_id               uuid not null references modalities(id),
  session_date              date not null,
  session_time              time not null,
  status                    text not null default 'pending_payment'
                            check (status in ('pending_payment', 'confirmed', 'editing', 'delivered', 'cancelled')),
  qual_data                 jsonb,
  stripe_session_id         text,
  stripe_payment_intent_id  text,
  deposit_paid_at           timestamptz,
  contact_email             text not null,
  contact_name              text not null,
  contact_phone             text,
  notes                     text,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

alter table bookings enable row level security;

create policy "Clients can read own bookings"
  on bookings for select
  using (client_id = auth.uid() or is_admin());

create policy "Anyone can create a booking"
  on bookings for insert
  with check (true);

create policy "Admins can update bookings"
  on bookings for update
  using (is_admin());

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_updated_at
  before update on bookings
  for each row execute procedure update_updated_at();

-- FILES
create table if not exists files (
  id            uuid primary key default gen_random_uuid(),
  booking_id    uuid not null references bookings(id) on delete cascade,
  uploaded_by   uuid references profiles(id),
  storage_path  text not null,
  filename      text not null,
  size_bytes    bigint,
  mime_type     text,
  created_at    timestamptz not null default now()
);

alter table files enable row level security;

create policy "Clients can read files for their bookings"
  on files for select
  using (
    is_admin()
    or exists (
      select 1 from bookings
      where bookings.id = files.booking_id
        and bookings.client_id = auth.uid()
    )
  );

create policy "Admins can manage files"
  on files for all
  using (is_admin());

-- AVAILABLE SLOTS
create table if not exists available_slots (
  id           uuid primary key default gen_random_uuid(),
  date         date not null,
  time_slot    time not null,
  modality_id  uuid references modalities(id),
  is_booked    boolean not null default false,
  created_at   timestamptz not null default now(),
  unique(date, time_slot)
);

alter table available_slots enable row level security;

create policy "Slots are publicly readable"
  on available_slots for select
  using (true);

create policy "Only admins can manage slots"
  on available_slots for all
  using (is_admin());

-- Seed available slots for the next 30 days (Mon–Sat, 10am–6pm every 2hrs)
do $$
declare
  d date;
  t time;
  dow int;
begin
  for d in
    select generate_series(current_date + 1, current_date + 30, '1 day'::interval)::date
  loop
    dow := extract(dow from d); -- 0=Sun, 6=Sat
    if dow between 1 and 6 then
      foreach t in array array['10:00'::time, '12:00'::time, '14:00'::time, '16:00'::time]
      loop
        insert into available_slots (date, time_slot)
        values (d, t)
        on conflict (date, time_slot) do nothing;
      end loop;
    end if;
  end loop;
end;
$$;
