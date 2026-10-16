import { z } from "zod";
import { services } from "@/content/services";

/** Service options offered in the form (slug values + a catch-all). */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

/**
 * Shared by the client form (instant feedback) and the API route (the source
 * of truth). Keep limits generous but bounded.
 */
export type EnquiryMessages = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: string;
};

const englishMessages: EnquiryMessages = {
  name: "Please enter your name",
  email: "Enter a valid email address",
  phone: "Use digits, spaces, + or - only",
  service: "Choose a service",
  message: "Tell us a little more (at least 10 characters)",
  consent: "Please agree so we can contact you about your enquiry",
};

export function makeEnquirySchema(m: EnquiryMessages = englishMessages) {
  return z.object({
  name: z.string().trim().min(2, m.name).max(100),
  email: z.string().trim().email(m.email).max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-\s]*$/, m.phone)
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.enum(serviceValues, { message: m.service }),
  message: z
    .string()
    .trim()
    .min(10, m.message)
    .max(3000, "Please keep your message under 3000 characters"),
  consent: z.literal(true, { message: m.consent }),
  /** Honeypot: real users never see or fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
  });
}

/** Server-side schema (English messages). The form validates with a localised copy first. */
export const enquirySchema = makeEnquirySchema();

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export type EnquiryResponse =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string; fieldErrors?: EnquiryFieldErrors };

export function serviceLabel(value: string): string {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

/** Flatten zod issues into { field: message } (first issue wins). */
export function toFieldErrors(error: z.ZodError): EnquiryFieldErrors {
  const out: EnquiryFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
