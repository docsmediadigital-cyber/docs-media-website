import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { faqs } from "@/content/faqs";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing, Shopify & Meta Ads FAQs",
  description:
    "Answers for Indian businesses about DOCS MEDIA's digital marketing, Meta Ads, SEO, website and Shopify services: getting started, pricing and what to expect.",
  path: "/faqs",
  keywords: ["digital marketing FAQs", "Meta Ads FAQs", "Shopify FAQs India"],
});

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        title="Frequently asked questions"
        description="Quick answers about working with DOCS MEDIA. Can’t find what you need? Just ask."
        crumbs={[{ name: "FAQs", path: "/faqs" }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={faqs} />
          <p className="mt-8 leading-relaxed text-ink-soft">
            Want the details? Browse our{" "}
            <Link
              href="/services"
              className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
            >
              digital marketing and Shopify services
            </Link>
            , read the{" "}
            <Link
              href="/blog"
              className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
            >
              DOCS MEDIA blog
            </Link>
            , or{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </Section>
      <CtaBanner
        title="Still have a question?"
        text="Message us on WhatsApp or send an enquiry and we will help."
        whatsappMessage="Hi DOCS MEDIA, I read your FAQs and I have a question."
      />
    </>
  );
}
