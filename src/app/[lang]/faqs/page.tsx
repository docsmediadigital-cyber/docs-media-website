import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getFaqs } from "@/content/localized";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/config";
import { resolveLang, type LangProps } from "@/i18n/params";

const linkClass =
  "font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const f = getDictionary(lang).faqsPage;
  return buildMetadata({
    title: f.metaTitle,
    description: f.metaDescription,
    path: "/faqs",
    keywords: f.keywords,
    lang,
  });
}

export default async function FaqsPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const f = t.faqsPage;
  const faqs = getFaqs(lang);

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        lang={lang}
        title={f.title}
        description={f.description}
        crumbs={[{ name: f.crumb, path: "/faqs" }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={faqs} />
          <p className="mt-8 leading-relaxed text-ink-soft">
            {f.wantDetails}{" "}
            <Link href={localePath(lang, "/services")} className={linkClass}>
              {f.servicesLink}
            </Link>
            {f.readThe}{" "}
            <Link href={localePath(lang, "/blog")} className={linkClass}>
              {f.blogLink}
            </Link>
            {f.orWord}{" "}
            <Link href={localePath(lang, "/contact")} className={linkClass}>
              {f.contactLink}
            </Link>
            .
          </p>
        </div>
      </Section>
      <CtaBanner lang={lang} title={f.ctaTitle} text={f.ctaText} whatsappMessage={t.wa.faqs} />
    </>
  );
}
