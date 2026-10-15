import { siteConfig, SITE_URL } from "@/lib/site";

/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Build an absolute URL on the configured site origin. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** WhatsApp deep link, optionally with a prefilled message. */
export function whatsappLink(message?: string): string {
  if (!message) return siteConfig.whatsapp.url;
  return `${siteConfig.whatsapp.url}?text=${encodeURIComponent(message)}`;
}

/** Format an ISO date (YYYY-MM-DD) for display, timezone-safe. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Reading time estimate from plain text. */
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function socialEntries(): Array<{ key: string; url: string }> {
  return Object.entries(siteConfig.socials)
    .filter(([, url]) => url)
    .map(([key, url]) => ({ key, url }));
}
