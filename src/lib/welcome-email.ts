/**
 * The note that goes out the moment somebody joins the waitlist.
 *
 * Kept here rather than in the agents repo on purpose. This has to arrive
 * within seconds of the form being submitted, and an agent that runs on a
 * schedule would leave a 3am signup waiting until whenever the next run is.
 * The release email is the opposite — one message to everyone, reviewed before
 * it goes — and that one lives in the agent.
 *
 * Nothing here is allowed to fail the signup. If Resend is down, the person is
 * still on the list; they have simply not had a confirmation yet, which is
 * recoverable. A signup lost because an email provider had a bad minute is not.
 */

const RESEND_API = "https://api.resend.com/emails"

export interface WelcomeEmailInput {
  email: string
  name?: string | null
  position: number
  refCode: string
}

/**
 * Plain, short, and honest about what happens next.
 *
 * No unsubscribe link, deliberately: this is a transactional confirmation of
 * something the person just asked for, not marketing. The release emails are
 * the marketing, and those go through Resend broadcasts where the unsubscribe
 * is handled properly.
 */
export function renderWelcomeEmail(input: WelcomeEmailInput): { subject: string; html: string } {
  const first = (input.name ?? "").trim().split(/\s+/)[0]
  const hello = first ? `Hi ${escapeHtml(first)},` : "Hi,"
  const referralUrl = `https://yaven.ai/w/${encodeURIComponent(input.refCode)}`

  return {
    subject: "You're on the Yaven waitlist",
    html: `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f1e4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f1e4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;padding:32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#07348b;">
        <tr><td style="font-size:20px;font-weight:600;padding-bottom:16px;">You're in.</td></tr>
        <tr><td style="font-size:15px;line-height:1.55;padding-bottom:14px;">${hello}</td></tr>
        <tr><td style="font-size:15px;line-height:1.55;padding-bottom:14px;">
          Thanks for putting your name down for Yaven. You're number <strong>${input.position}</strong> in the queue.
        </td></tr>
        <tr><td style="font-size:15px;line-height:1.55;padding-bottom:14px;">
          We let a small group in every week and email everyone whenever we ship something worth seeing.
          It's a Mac app, so you'll need one of those when your turn comes.
        </td></tr>
        <tr><td style="font-size:15px;line-height:1.55;padding-bottom:20px;">
          If you'd like to move up, send this to someone who'd use it: every signup moves you ten places.
          <br />
          <a href="${referralUrl}" style="color:#267fe5;">${referralUrl}</a>
        </td></tr>
        <tr><td style="font-size:15px;line-height:1.55;">Nick and Bettina</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
  }
}

/**
 * Sends it, and swallows anything that goes wrong.
 *
 * The caller does not await this. Returning a boolean is for tests and for the
 * log line, not for the signup response.
 */
export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.WAITLIST_FROM_EMAIL ?? "Yaven <hello@yaven.ai>"
  if (!apiKey) {
    return false
  }

  const { subject, html } = renderWelcomeEmail(input)
  try {
    const response = await fetch(RESEND_API, {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [input.email], subject, html }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      console.error("[waitlist] welcome email rejected:", response.status, (await response.text()).slice(0, 200))
      return false
    }
    return true
  } catch (error) {
    console.error("[waitlist] welcome email failed:", error)
    return false
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
