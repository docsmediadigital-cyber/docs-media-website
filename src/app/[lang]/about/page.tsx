import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getPrinciples, getServices } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/config";
import { resolveLang, type LangProps } from "@/i18n/params";
import { JsonLd } from "@/components/ui/JsonLd";
import { aboutPageJsonLd, buildMetadata } from "@/lib/seo";

const linkClass =
  "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const a = getDictionary(lang).about;
  return buildMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: "/about",
    keywords: a.keywords,
    lang,
  });
}

export default async function AboutPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const a = t.about;
  const services = getServices(lang);
  const principles = getPrinciples(lang);
  return (
    <>
      <JsonLd data={aboutPageJsonLd(lang)} />
      <PageHero
        lang={lang}
        title={a.title}
        description={a.description}
        crumbs={[{ name: a.crumb, path: "/about" }]}
      />

      <Section labelledBy="who-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="who-title"
              eyebrow={a.whoEyebrow}
              title={a.whoTitle}
            />
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
              <p>
                {a.seeA}{" "}
                <Link href={localePath(lang, "/services")} className={linkClass}>
                  {a.servicesLink}
                </Link>{" "}
                {a.pageLearn}{" "}
                <Link href={localePath(lang, "/blog")} className={linkClass}>
                  {a.guidesLink}
                </Link>
                {a.orWord}{" "}
                <Link href={localePath(lang, "/contact")} className={linkClass}>
                  {a.contactLink}
                </Link>{" "}
                {a.toTalk}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-200 bg-lavender p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold">{a.cover}</h3>
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
          eyebrow={a.valuesEyebrow}
          title={a.valuesTitle}
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
          eyebrow={a.processEyebrow}
          title={a.processTitle}
          description={a.processText}
        />
        <ProcessSteps lang={lang} />
      </Section>

      <CtaBanner lang={lang} whatsappMessage={t.wa.about} />
    </>
  );
}
