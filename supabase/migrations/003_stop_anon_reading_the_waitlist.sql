-- The anon role could read the entire waitlist.
--
-- The policy was named "Allow anon select own row", but its predicate was
-- `using (true)`, which matches every row rather than the caller's own. Verified
-- against production by running as the role: 665 rows and 665 email addresses
-- readable. The anon key is public by design — it ships in browser bundles — so
-- the only thing standing between that key and the whole list was the fact that
-- no client component happened to import the Supabase client yet.
--
-- Nothing in the browser talks to Supabase directly. Every signup goes through
-- POST /api/waitlist, which is server-side, so the anon role needs no access to
-- this table at all. The route now authenticates with the service role key.
--
-- ORDER MATTERS: deploy the website change that switches the API route to
-- SUPABASE_SERVICE_ROLE_KEY before applying this migration. Dropping these
-- policies first would break live signups, because the running site still
-- authenticates as anon.

drop policy if exists "Allow anon select own row" on waitlist;
drop policy if exists "Allow anon inserts" on waitlist;

-- Row-level security stays enabled. With no policies for anon, the role now has
-- no access, while the service role continues to bypass RLS as it always has.
alter table waitlist enable row level security;
