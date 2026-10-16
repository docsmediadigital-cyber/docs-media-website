import type { Metadata } from "next";
import { FocusPageView } from "@/components/sections/FocusPageView";
import { getLocalizedFocusPage } from "@/content/localized";
import { buildMetadata } from "@/lib/seo";
import { resolveLang, type LangProps } from "@/i18n/params";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getLocalizedFocusPage(lang, "personal-branding");
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    keywords: page.keywords,
    lang,
  });
}

export default async function PersonalBrandingPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  return <FocusPageView page={getLocalizedFocusPage(lang, "personal-branding")} lang={lang} />;
}
