import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageView } from "@/components/sections/LocationPageView";
import { getLocationPage } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";
import { resolveLang, type LangProps } from "@/i18n/params";

const page = getLocationPage("kanhangad");

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  if (lang !== "en") return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    keywords: page.keywords,
    translated: false,
  });
}

/** English only; src/proxy.ts already returns a 404 for the /ar URL. */
export default async function KanhangadPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  if (lang !== "en") notFound();
  return <LocationPageView page={page} />;
}
