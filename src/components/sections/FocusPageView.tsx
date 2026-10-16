import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getBlogPosts } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";
import type { FocusPage } from "@/content/focus-pages";
import { faqJsonLd, focusPageJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

const linkClass =
  "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900";

/** Shared layout for the Personal Branding and Creative Studio landing pages. */
export function FocusPageView({ page, lang }: { page: FocusPage; lang: Locale }) {
  const t = getDictionary(lang);
  const posts = getBlogPosts(lang);
  const guides = page.guideSlugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd data={focusPageJsonLd(page, lang)} />
      <JsonLd data={faqJsonLd(page.faqs)} />

      <PageHero
        lang={lang}
        title={page.h1}
        description={page.intro}
        crumbs={[
          { name: t.nav.services, path: "/services" },
          { name: page.name, path: page.path },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappLink(page.whatsappMessage)} external size="lg">
            <Icon name="whatsapp" className="h-5 w-5" />
            {t.focus.discuss}
          </ButtonLink>
          <ButtonLink href={localePath(lang, "/contact")} variant="secondary" size="lg">
            {t.ui.sendEnquiry}
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonLink>
        </div>
      </PageHero>

      {page.image && (
        <Section className="!pb-0 sm:!pb-0" labelledBy="focus-image-title">
          <h2 id="focus-image-title" className="sr-only">
            {t.focus.imageHeading(page.name)}
          </h2>
          <figure className="reveal overflow-hidden rounded-[2rem] border border-brand-200 shadow-glow">
            <Image
              src={page.image.src}
              alt={page.image.alt}
              width={page.image.width}
              height={page.image.height}
              priority
              sizes="(min-width: 1152px) 1100px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </Section>
      )}

      {/* Audience */}
      <Section labelledBy="audience-title">
        <SectionHeading
          id="audience-title"
          eyebrow={page.name}
          title={page.audienceTitle}
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {page.audience.map((a) => (
            <li
              key={a.title}
              className="reveal rounded-3xl border border-brand-200 bg-surface p-7 shadow-soft"
            >
              <h3 className="font-display text-xl font-bold">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{a.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Offerings */}
      <Section tone="lavender" labelledBy="offerings-title">
        <SectionHeading
          id="offerings-title"
          eyebrow={t.focus.whatWeDo}
          title={page.offeringsTitle}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.offerings.map((o) => (
            <li
              key={o.title}
              className="reveal group rounded-3xl border border-brand-200 bg-surface p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-fuchsia-500 text-white shadow-lift">
                <Icon name={page.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{o.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{o.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Deliverables + cross-links */}
      <Section labelledBy="included-title">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <SectionHeading id="included-title" eyebrow={t.focus.included} title={t.focus.deliverables} />
            <ul className="space-y-3">
              {page.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-lg text-ink-soft">
                  <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <aside
            aria-label={t.focus.relatedAria}
            className="self-start rounded-3xl border border-brand-200 bg-lavender p-7 sm:p-9"
          >
            <h2 className="font-display text-xl font-bold">{t.focus.related}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {page.crossLink.text}{" "}
              <Link href={localePath(lang, page.crossLink.href)} className={linkClass}>
                {page.crossLink.cta}
              </Link>
              .
            </p>
            {guides.length > 0 && (
              <>
                <h3 className="mt-6 font-display text-base font-bold">{t.focus.guides}</h3>
                <ul className="mt-3 space-y-2">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/blog/${g.slug}`} hrefLang="en" className={linkClass}>
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-6 text-sm text-ink-soft">
              {t.focus.seeAll}{" "}
              <Link href={localePath(lang, "/services")} className={linkClass}>
                {t.focus.servicesLink}
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>

      {/* Process */}
      <Section tone="dark" labelledBy="focus-process-title">
        <SectionHeading id="focus-process-title" invert eyebrow={t.focus.process} title={page.processTitle} />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {page.process.map((step, i) => (
            <li
              key={step.title}
              className="reveal rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 font-display text-xl font-extrabold text-white shadow-lift">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-brand-100">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section labelledBy="focus-faq-title">
        <SectionHeading
          id="focus-faq-title"
          eyebrow={t.focus.faqs}
          title={page.faqTitle}
        />
        <div className="max-w-3xl">
          <FaqList faqs={page.faqs} />
        </div>
      </Section>

      <CtaBanner
        lang={lang}
        title={page.ctaTitle}
        text={t.focus.ctaText}
        whatsappMessage={page.whatsappMessage}
      />
    </>
  );
}
