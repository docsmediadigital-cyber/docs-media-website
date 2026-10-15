import "server-only";
import { siteConfig } from "@/lib/site";
import { serviceLabel, type EnquiryInput } from "@/lib/enquiry-schema";

/**
 * Enquiry delivery adapters. Each channel is optional and enabled purely by
 * environment variables (see .env.example). With none configured the API still
 * validates and responds `delivered: false`, and the form steers the visitor to
 * WhatsApp with their message prefilled — nothing is silently dropped.
 *
 *  1. Email via Resend   → RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *  2. Generic webhook    → ENQUIRY_WEBHOOK_URL (Make, Zapier, Apps Script, n8n…)
 */

type Channel = { name: string; send: (data: EnquiryInput) => Promise<void> };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function plainText(data: EnquiryInput): string {
  return [
    `New enquiry — ${siteConfig.name} website`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || "—"}`,
    `Company: ${data.company || "—"}`,
    `Service: ${serviceLabel(data.service)}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function htmlBody(data: EnquiryInput): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b5b8a;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;
  return `<div style="font-family:Arial,sans-serif;color:#1a0b33">
<h2 style="color:#600a79;margin:0 0 12px">New website enquiry</h2>
<table style="border-collapse:collapse">
${row("Name", data.name)}
${row("Email", data.email)}
${row("Phone / WhatsApp", data.phone || "—")}
${row("Company", data.company || "—")}
${row("Service", serviceLabel(data.service))}
</table>
<p style="margin:16px 0 4px;color:#6b5b8a">Message</p>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
</div>`;
}

function resendChannel(): Channel | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;

  return {
    name: "email",
    async send(data) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: data.email,
          subject: `New enquiry from ${data.name} — ${serviceLabel(data.service)}`,
          text: plainText(data),
          html: htmlBody(data),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        throw new Error(`Resend responded ${res.status}`);
      }
    },
  };
}

function webhookChannel(): Channel | null {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return null;

  return {
    name: "webhook",
    async send(data) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: siteConfig.name,
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          company: data.company || "",
          service: serviceLabel(data.service),
          message: data.message,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        throw new Error(`Webhook responded ${res.status}`);
      }
    },
  };
}

export type DeliveryResult = {
  /** True when at least one configured channel accepted the enquiry. */
  delivered: boolean;
  /** True when channels are configured but every one of them failed. */
  failed: boolean;
};

export async function deliverEnquiry(data: EnquiryInput): Promise<DeliveryResult> {
  const channels = [resendChannel(), webhookChannel()].filter(
    (c): c is Channel => c !== null,
  );

  if (channels.length === 0) {
    // Not configured: log so a developer sees it in local/server logs.
    console.warn(
      "[enquiry] No delivery channel configured (set RESEND_API_KEY/ENQUIRY_TO_EMAIL/ENQUIRY_FROM_EMAIL or ENQUIRY_WEBHOOK_URL). Enquiry was validated but not forwarded.",
    );
    return { delivered: false, failed: false };
  }

  const results = await Promise.allSettled(channels.map((c) => c.send(data)));
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[enquiry] ${channels[i].name} delivery failed:`, r.reason);
    }
  });

  const delivered = results.some((r) => r.status === "fulfilled");
  return { delivered, failed: !delivered };
}
