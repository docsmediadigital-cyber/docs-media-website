import type { Locale } from "@/i18n/config";
import { faqs, type Faq } from "@/content/faqs";
import { focusPages, type FocusPage } from "@/content/focus-pages";
import {
  principles,
  processSteps,
  services,
  type Service,
} from "@/content/services";
import { blogPosts, type BlogPost } from "@/content/blog";
import { blogAr, faqsAr, focusAr, principlesAr, processAr, servicesAr } from "@/content/ar";

/** Language-aware accessors. English returns the source content untouched. */

export function getServices(lang: Locale): Service[] {
  if (lang === "en") return services;
  return services.map((s) => ({ ...s, ...(servicesAr[s.slug] ?? {}) }));
}

export function getLocalizedService(lang: Locale, slug: string): Service | undefined {
  return getServices(lang).find((s) => s.slug === slug);
}

export function getProcessSteps(lang: Locale): ReadonlyArray<{ title: string; text: string }> {
  return lang === "en" ? processSteps : processAr;
}

export function getPrinciples(lang: Locale): ReadonlyArray<{ title: string; text: string }> {
  return lang === "en" ? principles : principlesAr;
}

export function getFaqs(lang: Locale): Faq[] {
  return lang === "en" ? faqs : faqsAr;
}

export function getFocusPages(lang: Locale): FocusPage[] {
  if (lang === "en") return focusPages;
  return focusPages.map((p) => ({ ...p, ...focusAr[p.slug] }));
}

export function getLocalizedFocusPage(lang: Locale, slug: FocusPage["slug"]): FocusPage {
  const page = getFocusPages(lang).find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown focus page: ${slug}`);
  return page;
}

/** Blog cards: Arabic shows translated title/summary; the article itself is English. */
export function getBlogPosts(lang: Locale): BlogPost[] {
  if (lang === "en") return blogPosts;
  return blogPosts.map((p) => ({ ...p, ...(blogAr[p.slug] ?? {}) }));
}
