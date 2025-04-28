export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL_SITE_SUBMISSIONS;

  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook URL missing" }, { status: 500 });
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    return NextResponse.json(
      { error: "Failed to send webhook" },
      { status: 500 },
    );
  }
}
