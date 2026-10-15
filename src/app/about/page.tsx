import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { principles, services } from "@/content/services";
import { JsonLd } from "@/components/ui/JsonLd";
import { aboutPageJsonLd, buildMetadata } from "@/lib/seo";

const linkClass =
  "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Digital Marketing Agency in India",
  description:
    "Meet DOCS MEDIA, a digital marketing agency for Indian businesses. Clear goals, honest expectations and measurable Meta Ads, SEO, website and Shopify work.",
  path: "/about",
  keywords: ["about DOCS MEDIA", "digital marketing company India"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <PageHero
        title="About DOCS MEDIA: digital marketing for Indian brands"
        description="A digital marketing agency focused on helping businesses across India show up online, earn attention and turn it into enquiries and orders."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Section labelledBy="who-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="who-title"
              eyebrow="Who we are"
              title="Marketing built around your goals"
            />
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                DOCS MEDIA is a digital marketing agency working with businesses
                across India. We combine strategy, creative and technical know-how
                so your social media, Meta Ads, search presence, website and
                Shopify store all work toward the same outcome.
              </p>
              <p>
                We believe good marketing starts with understanding your business:
                who you want to reach, what you offer and what success looks like.
                From there we plan, create, launch and keep improving, reporting
                clearly along the way.
              </p>
              <p>
                We would rather set honest expectations than make big promises, and
                we treat your budget as if it were our own.
              </p>
              <p>
                See everything we offer on our{" "}
                <Link href="/services" className={linkClass}>
                  digital marketing services
                </Link>{" "}
                page, learn from our{" "}
                <Link href="/blog" className={linkClass}>
                  marketing guides
                </Link>
                , or{" "}
                <Link href="/contact" className={linkClass}>
                  get in touch
                </Link>{" "}
                to talk about your goals.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-200 bg-lavender p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold">What we cover</h3>
            <ul className="mt-6 grid gap-4">
              {services.map((s) => (
                <li key={s.slug} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-brand-700 shadow-soft">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="lavender" labelledBy="values-title">
        <SectionHeading
          id="values-title"
          eyebrow="Our principles"
          title="What you can expect when you work with us"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-brand-200 bg-surface p-6 shadow-soft"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="process-title">
        <SectionHeading
          id="process-title"
          eyebrow="Our process"
          title="How a project runs"
          description="The same four stages, whether you need a campaign, a content plan or a new website."
        />
        <ProcessSteps />
      </Section>

      <CtaBanner whatsappMessage="Hi DOCS MEDIA, I read your About page and I'd like to talk about working together." />
    </>
  );
}
