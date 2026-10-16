import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

export type LangProps = { params: Promise<{ lang: string }> };

/** Resolve and validate the [lang] segment (404 for anything unknown). */
export async function resolveLang(params: LangProps["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
