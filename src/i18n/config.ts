/**
 * Languages. English is the default and lives at the plain URLs (/about);
 * Arabic lives under /ar (/ar/about) and is rendered right-to-left.
 * Files are routed as app/[lang]/..., and src/proxy.ts rewrites /about → /en/about.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeMeta: Record<
  Locale,
  { htmlLang: string; dir: "ltr" | "rtl"; ogLocale: string; label: string; hreflang: string }
> = {
  en: { htmlLang: "en", dir: "ltr", ogLocale: "en_US", label: "English", hreflang: "en" },
  ar: { htmlLang: "ar", dir: "rtl", ogLocale: "ar_AR", label: "العربية", hreflang: "ar" },
};

/** Public URL path for a page in a language. English has no prefix. */
export function localePath(lang: Locale, path: string): string {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Remove a leading locale (/ar, or /en) from a pathname. /en must be stripped too:
 * on the server, English pages see the proxy's internal path (/en/about), and
 * keeping it produced broken /ar/en/about links in the prerendered HTML.
 */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/** Pages that exist in every language (everything except individual blog posts). */
export function hasTranslation(pathWithoutLocale: string): boolean {
  return !/^\/blog\/[^/]+/.test(pathWithoutLocale);
}
