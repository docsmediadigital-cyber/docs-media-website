import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { blogPosts } from "@/content/blog";
import { services } from "@/content/services";
import { locationPages, type LocationPage } from "@/content/locations";
import { getDictionary } from "@/i18n/dictionary";
import { faqJsonLd, locationPageJsonLd } from "@/lib/seo";
import { mapsUrl, siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

const linkClass =
  "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900";

/**
 * Shared layout for the Kanhangad and Kasaragod landing pages. English only,
 * so labels come from the English dictionary or the page content.
 */
export function LocationPageView({ page }: { page: LocationPage }) {
  const t = getDictionary("en");
  const pageServices = page.services
    .map(({ slug, text }) => {
      const service = services.find((s) => s.slug === slug);
      return service ? { ...service, text } : undefined;
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const guides = page.guideSlugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const otherPages = locationPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <JsonLd data={locationPageJsonLd({ ...page, services: pageServices })} />
      <JsonLd data={faqJsonLd(page.faqs)} />

      <PageHero
        title={page.h1}
        description={page.intro}
        crumbs={[{ name: page.linkLabel.en, path: page.path }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappLink(page.whatsappMessage)} external size="lg">
            <Icon name="whatsapp" className="h-5 w-5" />
            {t.focus.discuss}
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            {t.ui.sendEnquiry}
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonLink>
        </div>
      </PageHero>

      {/* Why local + office */}
      <Section labelledBy="local-why-title">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <SectionHeading id="local-why-title" eyebrow={page.place} title={page.whyTitle} />
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              {page.why.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside
            aria-labelledby="local-office-title"
            className="self-start rounded-3xl border border-brand-200 bg-surface p-8 shadow-soft"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon name="pin" className="h-6 w-6" />
            </span>
            <h2 id="local-office-title" className="mt-5 font-display text-xl font-bold">
              {t.contactPage.visitTitle}
            </h2>
            <address className="mt-2 not-italic leading-relaxed text-ink-soft">
              <span className="block font-semibold text-ink">{siteConfig.name}</span>
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-ink-soft">
              {t.footer.whatsapp}:{" "}
              <a href={whatsappLink(page.whatsappMessage)} className={linkClass}>
                {siteConfig.whatsapp.display}
              </a>
            </p>
            <ButtonLink href={mapsUrl} external variant="secondary" className="mt-5">
              {t.contactPage.openMap}
            </ButtonLink>
          </aside>
        </div>
      </Section>

      {/* Services */}
      <Section tone="lavender" labelledBy="local-services-title">
        <SectionHeading
          id="local-services-title"
          eyebrow={t.focus.whatWeDo}
          title={page.servicesTitle}
          description={page.servicesIntro}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={s.href ?? `/services#${s.slug}`}
                className="group card-ring reveal flex h-full flex-col rounded-3xl border border-brand-200 bg-surface p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-fuchsia-500 text-white shadow-lift">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {t.ui.learnMore}
                  <Icon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-1.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Who we help */}
      <Section labelledBy="local-audience-title">
        <SectionHeading id="local-audience-title" eyebrow={page.place} title={page.audienceTitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Areas + related reading */}
      <Section tone="lavender" labelledBy="local-areas-title">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <SectionHeading id="local-areas-title" eyebrow={page.place} title={page.areasTitle} />
            <p className="text-lg text-ink-soft">{page.areasText}</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {page.areas.map((area) => (
                <li
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-surface px-4 py-2 text-sm font-medium text-brand-800"
                >
                  <Icon name="pin" className="h-4 w-4 text-brand-600" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
          <aside
            aria-label={t.focus.relatedAria}
            className="self-start rounded-3xl border border-brand-200 bg-surface p-7 shadow-soft sm:p-9"
          >
            <h2 className="font-display text-xl font-bold">{t.focus.related}</h2>
            <ul className="mt-3 space-y-2">
              {otherPages.map((p) => (
                <li key={p.slug}>
                  <Link href={p.path} className={linkClass}>
                    {p.linkLabel.en}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={linkClass}>
                  All digital marketing services
                </Link>
              </li>
            </ul>
            {guides.length > 0 && (
              <>
                <h3 className="mt-6 font-display text-base font-bold">{t.focus.guides}</h3>
                <ul className="mt-3 space-y-2">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/blog/${g.slug}`} className={linkClass}>
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section labelledBy="local-faq-title">
        <SectionHeading id="local-faq-title" eyebrow={t.focus.faqs} title={page.faqTitle} />
        <div className="max-w-3xl">
          <FaqList faqs={page.faqs} />
        </div>
      </Section>

      <CtaBanner title={page.ctaTitle} text={t.focus.ctaText} whatsappMessage={page.whatsappMessage} />
    </>
  );
}
