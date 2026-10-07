-- Referrals were recorded but never credited: 16 signups carry a referred_by,
-- yet every referral_count was still 0.
--
-- The trigger and function were both present and correct. The problem is RLS.
-- handle_referral() was not SECURITY DEFINER, so it ran as `anon` (the role the
-- signup form uses), and waitlist has policies for INSERT and SELECT but none for
-- UPDATE. Postgres therefore filtered every row out of the trigger's UPDATE and
-- reported success: zero rows changed, no error, signup completes.
--
-- The narrow fix is to let this one function bypass RLS, rather than adding an
-- anon UPDATE policy, which would let the public edit arbitrary waitlist rows.
-- search_path is pinned because a SECURITY DEFINER function that resolves names
-- through a caller-controlled search_path is a privilege-escalation risk.

create or replace function handle_referral()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.referred_by is not null then
    update waitlist
    set referral_count = referral_count + 1,
        position = greatest(position - 10, 1)
    where ref_code = new.referred_by;
  end if;
  return new;
end;
$$;

-- Columns that exist in production but were never declared in a migration, so the
-- repo finally describes the live schema.
alter table waitlist add column if not exists signup_source text;
alter table waitlist add column if not exists utm_source    text;
alter table waitlist add column if not exists utm_medium    text;
alter table waitlist add column if not exists utm_campaign  text;
alter table waitlist add column if not exists utm_content   text;
alter table waitlist add column if not exists utm_term      text;
alter table waitlist add column if not exists landing_page  text;
alter table waitlist add column if not exists referrer      text;

-- Backfill the credit the trigger should have given.
--
-- Counts only, deliberately not positions. The trigger moves a referrer up 10
-- places, but these people already saw their position and some were emailed it;
-- retroactively reshuffling the queue would contradict what they were told.
update waitlist w
set referral_count = c.n
from (
  select referred_by, count(*) as n
  from waitlist
  where referred_by is not null
  group by referred_by
) c
where w.ref_code = c.referred_by
  and w.referral_count is distinct from c.n;
