import { isValidEmail } from "@/lib/blueprint/validation"

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

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    return Response.json({ error: "Webhook not configured" }, { status: 500 })
  }

  try {
    // Google Apps Script webhooks return a 302 redirect after processing doPost.
    // The data IS written before the redirect fires, so any response (including
    // non-ok) means Google received it. Only a network-level throw is a real failure.
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        source: "website",
        submittedAt: new Date().toISOString(),
        ...payload,
        email: String(payload.email).trim()
      })
    })
  } catch (err) {
    console.error("[waitlist] webhook fetch failed:", err)
    return Response.json({ error: "Failed to save" }, { status: 502 })
  }

  return Response.json({ ok: true, success: true })
}
