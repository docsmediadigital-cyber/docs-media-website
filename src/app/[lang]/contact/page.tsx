import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, SITE_URL, mapsUrl } from "@/lib/site";
import { getServices } from "@/content/localized";
import { locationPages } from "@/content/locations";
import { getDictionary } from "@/i18n/dictionary";
import { localeMeta, localePath } from "@/i18n/config";
import { resolveLang, type LangProps } from "@/i18n/params";
import { absoluteUrl, whatsappLink } from "@/lib/utils";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const c = getDictionary(lang).contactPage;
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: "/contact",
    keywords: c.keywords,
    lang,
  });
}

export default async function ContactPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const c = t.contactPage;
  const options = [
    ...getServices(lang).map((s) => ({ value: s.slug, label: s.title })),
    { value: "not-sure", label: t.form.notSure },
  ];
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: c.schemaName,
    url: absoluteUrl(localePath(lang, "/contact")),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: { "@id": `${SITE_URL}/#organization` },
    inLanguage: localeMeta[lang].htmlLang,
  };

  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      <PageHero
        lang={lang}
        title={c.title}
        description={c.description}
        crumbs={[{ name: c.crumb, path: "/contact" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14">
          <div>
            <h2 className="sr-only">{c.formHeading}</h2>
            <EnquiryForm lang={lang} options={options} />
          </div>

          <aside aria-label={c.otherWays} className="space-y-6">
            <div className="rounded-3xl bg-brand-950 p-8 text-white shadow-lift">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-200">
                <Icon name="whatsapp" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold">{c.whatsappTitle}</h2>
              <p className="mt-2 leading-relaxed text-brand-100">
                {c.whatsappText}
              </p>
              <p className="mt-4 font-display text-xl font-bold tracking-tight">
                <span dir="ltr">{siteConfig.whatsapp.display}</span>
              </p>
              <ButtonLink
                href={whatsappLink(t.wa.contact)}
                external
                variant="whatsapp"
                size="lg"
                className="mt-6 w-full"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                {c.openWhatsApp}
              </ButtonLink>
            </div>

            <div className="rounded-3xl border border-brand-200 bg-surface p-8 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon name="pin" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold">{c.visitTitle}</h2>
              <address className="mt-2 not-italic leading-relaxed text-ink-soft" dir="ltr" lang="en">
                {siteConfig.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <ButtonLink href={mapsUrl} external variant="secondary" className="mt-5">
                {c.openMap}
              </ButtonLink>
              <h3 className="mt-7 font-display text-base font-bold">{c.localTitle}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{c.localText}</p>
              <ul className="mt-2 space-y-1.5">
                {locationPages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.path}
                      hrefLang="en"
                      className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
                    >
                      {p.linkLabel[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {siteConfig.email && (
              <div className="rounded-3xl border border-brand-200 bg-surface p-8 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon name="mail" className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold">{c.email}</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  dir="ltr"
                  className="mt-2 inline-block break-all font-semibold text-brand-700 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              </div>
            )}

            <div className="rounded-3xl border border-brand-200 bg-lavender p-8">
              <h2 className="font-display text-xl font-bold">{c.nextTitle}</h2>
              <ol className="mt-4 space-y-3 text-ink-soft">
                {c.next.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="w-5 shrink-0 font-display font-bold text-brand-700">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
