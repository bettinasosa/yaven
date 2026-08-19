import { createClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client.
 *
 * This used to authenticate as `anon` via NEXT_PUBLIC_SUPABASE_ANON_KEY. The
 * waitlist's select policy was named "Allow anon select own row" but its
 * predicate was `using (true)`, so the anon role could read every row — all 665
 * signups and their email addresses. Nothing leaked, because this module is only
 * imported by the API route and a NEXT_PUBLIC_ value is inlined into the client
 * bundle only where a client component references it. But the prefix advertises
 * the key as safe to expose, and one `"use client"` import would have published
 * the entire list.
 *
 * The service role key is deliberately NOT prefixed NEXT_PUBLIC_, so Next.js
 * cannot inline it into browser code: the variable is simply undefined there.
 * Keep it that way — every read of this table stays behind the API route.
 */
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
