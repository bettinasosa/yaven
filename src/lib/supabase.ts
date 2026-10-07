import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client, created on first use rather than at import.
 *
 * Next.js evaluates route modules during "Collecting page data" at build time,
 * so a client built at module scope needs its key to exist during the build.
 * `createClient` throws "supabaseKey is required" when it does not, which fails
 * the whole build rather than the one request that actually needed the key.
 * Building lazily keeps a missing variable a runtime error on /api/waitlist,
 * with a message that says which variable to set.
 *
 * This used to authenticate as `anon` via NEXT_PUBLIC_SUPABASE_ANON_KEY. The
 * waitlist's select policy was named "Allow anon select own row" but its
 * predicate was `using (true)`, so the anon role could read every row — all 665
 * signups and their email addresses. Nothing leaked, because this module is only
 * imported by the API route, but the prefix advertises the key as safe to expose
 * and one `"use client"` import would have published the list.
 *
 * The secret key is deliberately NOT prefixed NEXT_PUBLIC_, so Next.js cannot
 * inline it into browser code: the variable is simply undefined there.
 */
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (client) return client

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  // Supabase now issues `sb_secret_…` keys and calls the old JWT ones legacy
  // service_role. Either works, so accept both names.
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is not set")
  if (!key) throw new Error("SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) is not set")

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
