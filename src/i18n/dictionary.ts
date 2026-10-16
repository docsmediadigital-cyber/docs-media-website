import { en } from "@/i18n/en";
import { ar } from "@/i18n/ar";
import type { Locale } from "@/i18n/config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
