"use server";

import { DiscordWebhookPayload } from "@/types/discord";

export async function sendDiscordNotification(
  body: DiscordWebhookPayload,
): Promise<{ ok: boolean }> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL_SITE_SUBMISSIONS;

  if (!webhookUrl) {
    throw new Error("Webhook URL missing");
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: true };
  } catch (err) {
    console.error("Error sending to Discord:", err);
    throw new Error("Failed to send webhook");
  }
}
