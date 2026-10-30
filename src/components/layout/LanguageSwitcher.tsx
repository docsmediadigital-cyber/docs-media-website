"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  hasTranslation,
  localePath,
  stripLocale,
  translationFallback,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

/**
 * Links to the same page in the other language. Blog posts and local landing
 * pages exist only in English, so from those the Arabic link goes to the closest
 * Arabic page (the blog index, or Contact for a local page).
 */
export function LanguageSwitcher({ lang, className }: { lang: Locale; className?: string }) {
  const pathname = usePathname();
  const t = getDictionary(lang);
  const target: Locale = lang === "en" ? "ar" : "en";
  const base = stripLocale(pathname);
  const path = hasTranslation(base) ? base : translationFallback(base);

  return (
    <Link
      href={localePath(target, path)}
      hrefLang={target === "ar" ? "ar" : "en"}
      lang={target}
      aria-label={t.ui.languageSwitch}
      className={cn(
        "inline-flex items-center rounded-full border border-white/30 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-white/10",
        className,
      )}
    >
      {t.ui.otherLanguageLabel}
    </Link>
  );
}
