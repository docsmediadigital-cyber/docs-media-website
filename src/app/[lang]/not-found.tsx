import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { en } from "@/i18n/en";
import { ar } from "@/i18n/ar";

export const metadata: Metadata = {
  title: "Page not found | الصفحة غير موجودة",
  robots: { index: false, follow: false },
};

/**
 * Next.js does not pass params to not-found pages, so this one is bilingual:
 * English first, with the Arabic message and links underneath.
 */
export default function NotFound() {
  return (
    <section className="bg-lavender py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-display text-7xl font-extrabold text-brand-700 sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl" lang="en" dir="ltr">
          {en.notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft" lang="en" dir="ltr">
          {en.notFound.text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" lang="en" dir="ltr">
          <ButtonLink href="/" size="lg">{en.notFound.home}</ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">{en.notFound.services}</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">{en.notFound.contact}</ButtonLink>
        </div>

        <hr className="mx-auto my-12 max-w-xs border-brand-200" />

        <h2 className="font-display text-2xl font-bold sm:text-3xl" lang="ar" dir="rtl">
          {ar.notFound.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink-soft" lang="ar" dir="rtl">
          {ar.notFound.text}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row" lang="ar" dir="rtl">
          <ButtonLink href="/ar" size="lg">{ar.notFound.home}</ButtonLink>
          <ButtonLink href="/ar/services" variant="secondary" size="lg">{ar.notFound.services}</ButtonLink>
          <ButtonLink href="/ar/contact" variant="secondary" size="lg">{ar.notFound.contact}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
