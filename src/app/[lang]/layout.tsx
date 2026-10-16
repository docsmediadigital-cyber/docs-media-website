import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/noto-sans-arabic";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL, seoKeywords, siteConfig } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  const defaultTitle = `${t.name} | ${t.tagline}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: defaultTitle, template: `%s | ${t.name}` },
    description: t.description,
    applicationName: t.name,
    keywords: [...seoKeywords],
    // No canonical here on purpose: every page sets its own through buildMetadata().
    authors: [{ name: t.name, url: SITE_URL }],
    creator: t.name,
    publisher: t.name,
    category: "marketing",
    openGraph: {
      type: "website",
      siteName: t.name,
      locale: localeMeta[lang].ogLocale,
      url: lang === "en" ? "/" : `/${lang}`,
      title: defaultTitle,
      description: t.description,
    },
    twitter: { card: "summary_large_image", title: defaultTitle, description: t.description },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const meta = localeMeta[lang];

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className="h-full">
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd(lang)} />
        <Header lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
        <WhatsAppFloat lang={lang} />
      </body>
    </html>
  );
}
