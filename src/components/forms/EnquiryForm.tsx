"use client";

import { useId, useState, type FormEvent } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import {
  enquirySchema,
  serviceLabel,
  serviceOptions,
  toFieldErrors,
  type EnquiryFieldErrors,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";
import { cn, whatsappLink } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-brand-200 bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-100";

/** WhatsApp prefill so the visitor can send their enquiry in one tap. */
function buildWhatsAppMessage(v: Values): string {
  const lines = [
    `Hi DOCS MEDIA, I'm ${v.name.trim()}.`,
    v.service ? `I'm interested in: ${serviceLabel(v.service)}.` : "",
    v.company.trim() ? `Company: ${v.company.trim()}.` : "",
    "",
    v.message.trim().slice(0, 700),
  ];
  return lines.filter((l, i) => l !== "" || i === 3).join("\n");
}

export function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string>("");
  const [delivered, setDelivered] = useState(false);
  const [submitted, setSubmitted] = useState<Values | null>(null);

  const id = (field: string) => `${uid}-${field}`;

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setFormError("");
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("idle");
      // Move focus to the first invalid field for keyboard / screen-reader users.
      const first = (Object.keys(fieldErrors)[0] ?? "") as string;
      document.getElementById(id(first))?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as EnquiryResponse;

      if (data.ok) {
        setSubmitted(values);
        setDelivered(data.delivered);
        setStatus("success");
        setValues(initialValues);
        return;
      }

      if (data.fieldErrors) setErrors(data.fieldErrors);
      setFormError(data.error);
      setStatus("error");
    } catch {
      setFormError(
        "Network problem. Please check your connection and try again, or message us on WhatsApp.",
      );
      setStatus("error");
    }
  }

  if (status === "success" && submitted) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-brand-200 bg-surface p-8 shadow-soft sm:p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Icon name="check" className="h-6 w-6" />
        </span>
        {delivered ? (
          <>
            <h3 className="mt-5 font-display text-2xl font-bold">
              Thank you, {submitted.name.trim().split(" ")[0]}.
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Your enquiry has been sent and we will get back to you soon. For a
              faster reply, you can also continue the conversation on WhatsApp.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-5 font-display text-2xl font-bold">
              One more step: send it on WhatsApp
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Your details look good. Tap the button below to send your enquiry to us
              on WhatsApp with your message already filled in.
            </p>
          </>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappLink(buildWhatsAppMessage(submitted))}
            external
            variant="whatsapp"
            size="lg"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            {delivered ? "Continue on WhatsApp" : "Send on WhatsApp"}
          </ButtonLink>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSubmitted(null);
            }}
            className="rounded-full border border-brand-200 px-6 py-3.5 text-base font-semibold text-brand-800 hover:bg-brand-100"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const fieldError = (field: keyof Values) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="mt-1.5 text-sm text-red-700">
        {errors[field]}
      </p>
    ) : null;

  const aria = (field: keyof Values) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? id(`${field}-error`) : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-brand-200 bg-surface p-6 shadow-soft sm:p-10"
      aria-label="Enquiry form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="text-sm font-semibold">
            Name <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="Your full name"
            {...aria("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={id("email")} className="text-sm font-semibold">
            Email <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
            {...aria("email")}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor={id("phone")} className="text-sm font-semibold">
            Phone / WhatsApp <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="+91 …"
            {...aria("phone")}
          />
          {fieldError("phone")}
        </div>

        <div>
          <label htmlFor={id("company")} className="text-sm font-semibold">
            Company / brand <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
            placeholder="Your business name"
            {...aria("company")}
          />
          {fieldError("company")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("service")} className="text-sm font-semibold">
            What do you need help with?{" "}
            <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <select
            id={id("service")}
            name="service"
            required
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            className={inputClass}
            {...aria("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="text-sm font-semibold">
            Tell us about your project{" "}
            <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass, "resize-y")}
            placeholder="What are you selling, who is it for, and what would you like to achieve?"
            {...aria("message")}
          />
          {fieldError("message")}
        </div>

        {/* Honeypot — hidden from people and assistive tech; bots fill it in. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={id("website")}>Leave this field empty</label>
          <input
            id={id("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-brand-300 accent-brand-700"
              {...aria("consent")}
            />
            <span>
              I agree to DOCS MEDIA contacting me about this enquiry using the
              details I have provided.
            </span>
          </label>
          {fieldError("consent")}
        </div>
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {formError}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-brand-800 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
        </button>
        <p className="text-sm text-ink-soft">
          Prefer chat?{" "}
          <a
            href={whatsappLink("Hi DOCS MEDIA, I'd like to discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    </form>
  );
}
