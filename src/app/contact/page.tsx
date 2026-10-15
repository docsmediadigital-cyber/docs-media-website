import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, SITE_URL } from "@/lib/site";
import { absoluteUrl, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Marketing & Website Enquiries",
  description:
    "Contact DOCS MEDIA on WhatsApp or send an enquiry about Meta Ads, SEO, social media marketing, website development and Shopify stores in India.",
  path: "/contact",
  keywords: ["contact digital marketing agency", "get a marketing quote India"],
});

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteConfig.name}`,
  url: absoluteUrl("/contact"),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  inLanguage: siteConfig.language,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      <PageHero
        title="Contact DOCS MEDIA: let’s talk about your brand"
        description="Send us a few details about your project, or start a chat on WhatsApp for the fastest reply."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14">
          <div>
            <h2 className="sr-only">Enquiry form</h2>
            <EnquiryForm />
          </div>

          <aside aria-label="Other ways to reach us" className="space-y-6">
            <div className="rounded-3xl bg-brand-950 p-8 text-white shadow-lift">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-200">
                <Icon name="whatsapp" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold">WhatsApp us</h2>
              <p className="mt-2 leading-relaxed text-brand-100">
                The quickest way to reach the team. Tap to open a chat.
              </p>
              <p className="mt-4 font-display text-xl font-bold tracking-tight">
                {siteConfig.whatsapp.display}
              </p>
              <ButtonLink
                href={whatsappLink(
                  "Hi DOCS MEDIA, I'd like to discuss digital marketing, a website or a Shopify store.",
                )}
                external
                variant="whatsapp"
                size="lg"
                className="mt-6 w-full"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                Open WhatsApp
              </ButtonLink>
            </div>

            {siteConfig.email && (
              <div className="rounded-3xl border border-brand-200 bg-surface p-8 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon name="mail" className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold">Email</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-block break-all font-semibold text-brand-700 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              </div>
            )}

            <div className="rounded-3xl border border-brand-200 bg-lavender p-8">
              <h2 className="font-display text-xl font-bold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-ink-soft">
                <li className="flex gap-3">
                  <span className="w-5 shrink-0 font-display font-bold text-brand-700">1.</span>
                  We read your message and note your goals.
                </li>
                <li className="flex gap-3">
                  <span className="w-5 shrink-0 font-display font-bold text-brand-700">2.</span>
                  We get back to you with questions or suggested next steps.
                </li>
                <li className="flex gap-3">
                  <span className="w-5 shrink-0 font-display font-bold text-brand-700">3.</span>
                  If it is a good fit, we put together a proposal.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
