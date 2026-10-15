import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getPost } from "@/content/blog";
import { services } from "@/content/services";
import { buildMetadata, serviceListJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing & Shopify Services in India",
  description:
    "Meta Ads, social media marketing, SEO, website development, Shopify stores, content and branding for Indian businesses. Ask us anything on WhatsApp.",
  path: "/services",
  keywords: [
    "digital marketing services",
    "Meta Ads management",
    "Shopify store development",
    "website development services",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceListJsonLd(services)} />
      <PageHero
        title="Digital marketing & website development services"
        description="Meta Ads, social media, SEO, creative, Shopify stores and websites for Indian businesses. Pick the service you need today, or combine several into one joined-up plan."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Jump to a service">
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
            const guide = service.guideSlug ? getPost(service.guideSlug) : undefined;
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
                    Service {String(i + 1).padStart(2, "0")}
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
                    <ButtonLink href="/contact">
                      Enquire about this
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </ButtonLink>
                    <ButtonLink
                      href={whatsappLink(
                        `Hi DOCS MEDIA, I'd like to know more about ${service.title}.`,
                      )}
                      external
                      variant="secondary"
                    >
                      <Icon name="whatsapp" className="h-4 w-4" />
                      Ask on WhatsApp
                    </ButtonLink>
                  </div>
                  {service.href && (
                    <p className="mt-6 text-sm text-ink-soft">
                      Full details:{" "}
                      <Link
                        href={service.href}
                        className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
                      >
                        {service.title} in India
                      </Link>
                    </p>
                  )}
                  {guide && (
                    <p className="mt-6 text-sm text-ink-soft">
                      Read our guide:{" "}
                      <Link
                        href={`/blog/${guide.slug}`}
                        className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
                      >
                        {guide.title}
                      </Link>
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-lavender p-6 sm:p-8">
                  <h3 className="font-display text-lg font-bold">What’s included</h3>
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
          eyebrow="Process"
          title="How we work with you"
          description="Every service follows the same clear path from first conversation to ongoing improvement."
        />
        <ProcessSteps />
      </Section>

      <CtaBanner
        title="Not sure which service fits?"
        text="Describe your business and goals and we will recommend a sensible place to start."
        whatsappMessage="Hi DOCS MEDIA, I'm not sure which service I need. Can you suggest where to start?"
      />
    </>
  );
}
