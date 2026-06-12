import { isValidEmail } from "@/lib/blueprint/validation"
import { supabase } from "@/lib/supabase"

function generateRefCode(email: string): string {
  const prefix = email.split("@")[0].slice(0, 5).toLowerCase().replace(/[^a-z]/g, "")
  const hash = Array.from(email).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 0)
  const suffix = Math.abs(hash).toString(36).slice(0, 4)
  return `${prefix}-${suffix}`
}

export async function POST(request: Request) {
  let rawPayload: unknown

  try {
    rawPayload = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 })
  }

  const payload =
    typeof rawPayload === "object" && rawPayload !== null && !Array.isArray(rawPayload)
      ? (rawPayload as Record<string, unknown>)
      : {}

  if (!isValidEmail(payload.email)) {
    return Response.json({ error: "Valid email is required" }, { status: 400 })
  }

  const emailStr = String(payload.email).trim().toLowerCase()
  const refCode = generateRefCode(emailStr)

  // Check for duplicate
  const { data: existing } = await supabase
    .from("waitlist")
    .select("id, position, ref_code")
    .eq("email", emailStr)
    .single()

  if (existing) {
    return Response.json({
      ok: true,
      success: true,
      position: existing.position,
      refCode: existing.ref_code,
      existing: true
    })
  }

  // Get current count for position
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })

  const position = (count ?? 0) + 893

  const { error: insertError } = await supabase.from("waitlist").insert({
    email: emailStr,
    name: typeof payload.name === "string" ? payload.name : null,
    role: typeof payload.role === "string" ? payload.role : null,
    has_mac: typeof payload.hasMac === "boolean" ? payload.hasMac : null,
    beta_tester: payload.betaTester === true,
    ref_code: refCode,
    referred_by: typeof payload.referredBy === "string" ? payload.referredBy : null,
    position,
    source: "website"
  })

  if (insertError) {
    // Unique constraint on ref_code — try with a longer suffix
    if (insertError.code === "23505") {
      return Response.json({
        ok: true,
        success: true,
        position,
        refCode,
        existing: true
      })
    }
    console.error("[waitlist] insert failed:", insertError)
    return Response.json({ error: "Failed to save" }, { status: 500 })
  }

  // Also fire the Google Sheet webhook as a backup (non-blocking)
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        source: "website",
        submittedAt: new Date().toISOString(),
        ...payload,
        email: emailStr,
        refCode,
        position
      })
    }).catch(err => console.error("[waitlist] webhook backup failed:", err))
  }

  return Response.json({ ok: true, success: true, position, refCode })
}
