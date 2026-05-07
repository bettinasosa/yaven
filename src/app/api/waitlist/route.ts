export async function POST(request: Request) {
  const { email, workType } = await request.json();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, workType }),
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to save" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
