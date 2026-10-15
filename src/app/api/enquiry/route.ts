import { NextResponse, type NextRequest } from "next/server";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import {
  enquirySchema,
  toFieldErrors,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;

function json(body: EnquiryResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  // 1. Rate limit (5 submissions / 10 minutes per IP, best effort).
  const limited = rateLimit(`enquiry:${clientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limited.allowed) {
    return json(
      {
        ok: false,
        error: "Too many enquiries from your connection. Please try again shortly or message us on WhatsApp.",
      },
      429,
      { "Retry-After": String(limited.retryAfterSeconds) },
    );
  }

  // 2. Parse a bounded JSON body.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large." }, 413);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // 3. Honeypot: pretend success so bots learn nothing.
  if (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as { website?: unknown }).website === "string" &&
    (payload as { website: string }).website.length > 0
  ) {
    return json({ ok: true, delivered: true });
  }

  // 4. Validate.
  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      400,
    );
  }

  // 5. Deliver through whichever channels are configured.
  const result = await deliverEnquiry(parsed.data);
  if (result.failed) {
    return json(
      {
        ok: false,
        error: "We could not send your enquiry right now. Please try again or message us on WhatsApp.",
      },
      502,
    );
  }

  return json({ ok: true, delivered: result.delivered });
}
