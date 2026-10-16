import type { Metadata } from "next";
import { mapsUrl, seoKeywords, siteConfig, SITE_URL } from "@/lib/site";
import { absoluteUrl, socialEntries } from "@/lib/utils";
import { localeMeta, localePath, type Locale } from "@/i18n/config";

/**
 * A page-level `openGraph`/`twitter` object REPLACES the parent's (Next.js merges
 * metadata shallowly), which would drop the file-based social image defined in
 * src/app/opengraph-image.tsx. So every page re-declares the default images.
 */
const socialImageAlt = `${siteConfig.name} — ${siteConfig.tagline}`;
const ogImages = [
  { url: "/opengraph-image", width: 1200, height: 630, alt: socialImageAlt },
];
const twitterImages = [{ url: "/twitter-image", alt: socialImageAlt }];

type PageSeo = {
  /** Page title WITHOUT the site suffix (the root layout template adds it). */
  title: string;
  description: string;
  /** Path starting with "/", used for canonical + og:url. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Extra page-specific keywords, merged with the site-wide list. */
  keywords?: string[];
  noindex?: boolean;
  /** Page language. Defaults to English. */
  lang?: Locale;
  /** False for pages that exist in one language only (blog posts): no Arabic alternate is declared. */
  translated?: boolean;
};

/**
 * Per-page metadata with canonical URL, en hreflang, Open Graph and Twitter
 * cards. The OG image is supplied by src/app/opengraph-image.tsx.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noindex,
  lang = "en",
  translated = true,
}: PageSeo): Metadata {
  const localized = localePath(lang, path);
  return {
    title,
    description,
    keywords: [...(keywords ?? []), ...seoKeywords],
    alternates: {
      canonical: localized,
      languages: translated
        ? { "en": path, ar: localePath("ar", path), "x-default": path }
        : { [localeMeta[lang].hreflang]: localized },
    },
    openGraph: {
      title,
      description,
      url: localized,
      siteName: siteConfig.name,
      locale: localeMeta[lang].ogLocale,
      type,
      images: ogImages,
      ...(type === "article" && publishedTime
        ? { publishedTime, ...(modifiedTime ? { modifiedTime } : {}) }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ----------------------------- JSON-LD builders ---------------------------- */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** Inline publisher/author node (also carries the logo Google may display). */
function publisherNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.schemaLogo.src),
      width: siteConfig.schemaLogo.width,
      height: siteConfig.schemaLogo.height,
    },
  };
}

/**
 * Organization + ProfessionalService. The postal address matches the one shown
 * on the Contact page and in the footer. Deliberately NO ratings or review
 * markup: none exist yet, and schema must describe real, visible facts.
 */
export function organizationJsonLd() {
  const sameAs = socialEntries().map((s) => s.url);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    description: siteConfig.description,
    logo: publisherNode().logo,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.countryCode,
    },
    hasMap: mapsUrl,
    serviceType: [
      "Digital marketing",
      "Meta Ads management",
      "Social media marketing",
      "Search engine optimisation",
      "Website development",
      "Shopify development",
      "Personal branding",
      "Creative studio video and photography production",
    ],
    knowsAbout: [...seoKeywords],
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${siteConfig.whatsapp.number}`,
        availableLanguage: ["English"],
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
      },
    ],
  };
}

export function websiteJsonLd(lang: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: localeMeta[lang].htmlLang,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>, lang: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localePath(lang, item.path)),
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceListJsonLd(
  services: Array<{ title: string; summary: string; slug: string; href?: string }>,
  lang: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: absoluteUrl(localePath(lang, s.href ?? `/services#${s.slug}`)),
        serviceType: s.title,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

export function aboutPageJsonLd(lang: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    url: absoluteUrl(localePath(lang, "/about")),
    inLanguage: localeMeta[lang].htmlLang,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** CollectionPage for listing pages (projects). Lists the item URLs. */
export function collectionPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  itemPaths: string[];
  lang?: Locale;
}) {
  const lang = opts.lang ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(localePath(lang, opts.path)),
    inLanguage: localeMeta[lang].htmlLang,
    isPartOf: { "@id": SITE_ID },
    ...(opts.itemPaths.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: opts.itemPaths.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(localePath(lang, p)),
            })),
          },
        }
      : {}),
  };
}

export function blogJsonLd(
  posts: Array<{ title: string; slug: string; date: string; description: string }>,
  lang: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} blog`,
    description:
      "Practical guides on Meta Ads, SEO, Shopify, websites and social media for businesses.",
    url: absoluteUrl(localePath(lang, "/blog")),
    inLanguage: localeMeta[lang].htmlLang,
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: absoluteUrl(`/blog/${p.slug}`),
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  category?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    author: publisherNode(),
    publisher: publisherNode(),
    inLanguage: siteConfig.language,
  };
}

export function projectJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  year?: number;
  coverImage?: { src: string };
}, lang: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(localePath(lang, `/projects/${project.slug}`)),
    inLanguage: localeMeta[lang].htmlLang,
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    ...(project.coverImage ? { image: absoluteUrl(project.coverImage.src) } : {}),
    creator: { "@id": ORG_ID },
  };
}

/**
 * Service + WebPage schema for a dedicated service landing page. Describes only
 * what the page says: no ratings, prices or client claims.
 */
export function focusPageJsonLd(
  page: {
  name: string;
  path: string;
  metaDescription: string;
  h1: string;
  offerings: Array<{ title: string }>;
  image?: { src: string };
  },
  lang: Locale = "en",
) {
  const url = absoluteUrl(localePath(lang, page.path));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.h1,
        description: page.metaDescription,
        inLanguage: localeMeta[lang].htmlLang,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": `${url}#service` },
        ...(page.image
          ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(page.image.src) } }
          : {}),
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.name,
        serviceType: page.name,
        description: page.metaDescription,
        url,
        provider: { "@id": ORG_ID },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${page.name} services`,
          itemListElement: page.offerings.map((o) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: o.title },
          })),
        },
      },
    ],
  };
}
