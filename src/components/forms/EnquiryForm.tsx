"use client";

import { useId, useState, type FormEvent } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import {
  makeEnquirySchema,
  toFieldErrors,
  type EnquiryFieldErrors,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
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
function buildWhatsAppMessage(
  v: Values,
  f: ReturnType<typeof getDictionary>["form"],
  options: ServiceOption[],
): string {
  const label = options.find((o) => o.value === v.service)?.label ?? v.service;
  const lines = [
    f.waHi(v.name.trim()),
    v.service ? f.waInterested(label) : "",
    v.company.trim() ? f.waCompany(v.company.trim()) : "",
    "",
    v.message.trim().slice(0, 700),
  ];
  return lines.filter((l, i) => l !== "" || i === 3).join("\n");
}

type ServiceOption = { value: string; label: string };

/** `options` (localised service list + "not sure") is passed by the page to keep content out of the client bundle. */
export function EnquiryForm({ lang = "en", options }: { lang?: Locale; options: ServiceOption[] }) {
  const t = getDictionary(lang);
  const f = t.form;
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
    const parsed = makeEnquirySchema(f.errors).safeParse(values);
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
      setFormError(f.network);
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
              {f.thanks(submitted.name.trim().split(" ")[0])}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {f.sentText}
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-5 font-display text-2xl font-bold">
              {f.oneMore}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {f.oneMoreText}
            </p>
          </>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappLink(buildWhatsAppMessage(submitted, f, options))}
            external
            variant="whatsapp"
            size="lg"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            {delivered ? f.continueWa : f.sendWa}
          </ButtonLink>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSubmitted(null);
            }}
            className="rounded-full border border-brand-200 px-6 py-3.5 text-base font-semibold text-brand-800 hover:bg-brand-100"
          >
            {f.another}
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
      aria-label={f.ariaLabel}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="text-sm font-semibold">
            {f.name} <span className="text-red-700" aria-hidden="true">*</span>
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
            placeholder={f.namePh}
            {...aria("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={id("email")} className="text-sm font-semibold">
            {f.email} <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
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
            {f.phone} <span className="font-normal text-ink-soft">{f.optional}</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            dir="ltr"
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
            {f.company} <span className="font-normal text-ink-soft">{f.optional}</span>
          </label>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
            placeholder={f.companyPh}
            {...aria("company")}
          />
          {fieldError("company")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("service")} className="text-sm font-semibold">
            {f.service}{" "}
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
              {f.selectService}
            </option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="text-sm font-semibold">
            {f.message}{" "}
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
            placeholder={f.messagePh}
            {...aria("message")}
          />
          {fieldError("message")}
        </div>

        {/* Honeypot — hidden from people and assistive tech; bots fill it in. */}
        <div
          aria-hidden="true"
          className="absolute -start-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={id("website")}>{f.honeypot}</label>
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
              {f.consent}
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
          {status === "submitting" ? f.sending : f.send}
          {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
        </button>
        <p className="text-sm text-ink-soft">
          {f.preferChat}{" "}
          <a
            href={whatsappLink(t.wa.form)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
          >
            {f.messageWhatsApp}
          </a>
        </p>
      </div>
    </form>
  );
}
