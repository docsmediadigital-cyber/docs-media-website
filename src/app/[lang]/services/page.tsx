import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getBlogPosts, getServices } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/config";
import { resolveLang, type LangProps } from "@/i18n/params";
import { buildMetadata, serviceListJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const sp = getDictionary(lang).servicesPage;
  return buildMetadata({
    title: sp.metaTitle,
    description: sp.metaDescription,
    path: "/services",
    keywords: sp.keywords,
    lang,
  });
}

export default async function ServicesPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const sp = t.servicesPage;
  const services = getServices(lang);
  const posts = getBlogPosts(lang);
  return (
    <>
      <JsonLd data={serviceListJsonLd(services, lang)} />
      <PageHero
        lang={lang}
        title={sp.title}
        description={sp.description}
        crumbs={[{ name: sp.crumb, path: "/services" }]}
      >
        <ul className="flex flex-wrap gap-2" aria-label={sp.jump}>
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-4 py-2 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-100"
              >
                <Icon name={s.icon} className="h-4 w-4" />
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <ul className="space-y-8 sm:space-y-10">
          {services.map((service, i) => {
            const guide = service.guideSlug ? posts.find((p) => p.slug === service.guideSlug) : undefined;
            return (
            <li key={service.slug}>
              <article
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="grid scroll-mt-28 gap-8 rounded-3xl border border-brand-200 bg-surface p-6 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
              >
                <div>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white">
                    <Icon name={service.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">
                    {sp.serviceLabel(String(i + 1).padStart(2, "0"))}
                  </p>
                  <h2
                    id={`${service.slug}-title`}
                    className="mt-2 font-display text-2xl font-bold sm:text-3xl"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={localePath(lang, "/contact")}>
                      {sp.enquire}
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </ButtonLink>
                    <ButtonLink
                      href={whatsappLink(t.wa.service(service.title))}
                      external
                      variant="secondary"
                    >
                      <Icon name="whatsapp" className="h-4 w-4" />
                      {sp.askWhatsApp}
                    </ButtonLink>
                  </div>
                  {service.href && (
                    <p className="mt-6 text-sm text-ink-soft">
                      {sp.fullDetails}{" "}
                      <Link
                        href={localePath(lang, service.href)}
                        className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
                      >
                        {sp.pageLink(service.title)}
                      </Link>
                    </p>
                  )}
                  {guide && (
                    <p className="mt-6 text-sm text-ink-soft">
                      {sp.readGuide}{" "}
                      <Link
                        href={`/blog/${guide.slug}`}
                        hrefLang="en"
                        className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
                      >
                        {guide.title}
                      </Link>
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-lavender p-6 sm:p-8">
                  <h3 className="font-display text-lg font-bold">{sp.included}</h3>
                  <ul className="mt-4 space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-soft">
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="lavender" labelledBy="process-title">
        <SectionHeading
          id="process-title"
          eyebrow={sp.processEyebrow}
          title={sp.processTitle}
          description={sp.processText}
        />
        <ProcessSteps lang={lang} />
      </Section>

      <CtaBanner
        lang={lang}
        title={sp.ctaTitle}
        text={sp.ctaText}
        whatsappMessage={t.wa.notSure}
      />
    </>
  );
}
