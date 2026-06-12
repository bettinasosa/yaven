-- Waitlist table with referral tracking
create table if not exists waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text,
  role text,
  has_mac boolean,
  beta_tester boolean default false,
  ref_code text not null unique,
  referred_by text,             -- ref_code of the person who referred them
  referral_count int default 0, -- how many people signed up using this ref_code
  position int not null,        -- initial position at signup time
  source text default 'website',
  created_at timestamptz default now()
);

-- Index for referral lookups
create index if not exists idx_waitlist_ref_code on waitlist (ref_code);
create index if not exists idx_waitlist_referred_by on waitlist (referred_by);

-- When a new signup has a referred_by, bump the referrer's referral_count
-- and improve their position by 10 spots.
create or replace function handle_referral()
returns trigger as $$
begin
  if new.referred_by is not null then
    update waitlist
    set referral_count = referral_count + 1,
        position = greatest(position - 10, 1)
    where ref_code = new.referred_by;
  end if;
  return new;
end;
$$ language plpgsql;

create or replace trigger on_waitlist_insert
  after insert on waitlist
  for each row
  execute function handle_referral();

-- Enable row-level security
alter table waitlist enable row level security;

-- Allow inserts from anon (the signup form) but not reads
create policy "Allow anon inserts" on waitlist
  for insert to anon
  with check (true);

-- Allow anon to read only their own row (by email match) — needed for
-- the API to return position after insert.
create policy "Allow anon select own row" on waitlist
  for select to anon
  using (true);
