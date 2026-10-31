/**
 * Central site configuration.
 *
 * Everything that changes between environments or that the owner will fill in
 * later lives here (or in .env.local — see .env.example):
 *  - production domain  → NEXT_PUBLIC_SITE_URL
 *  - WhatsApp number    → whatsapp.* below
 *  - social profiles    → socials (leave empty until real URLs exist)
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Live domain. Used when NEXT_PUBLIC_SITE_URL is not set. */
export const PRODUCTION_URL = "https://www.connectdocsmedia.com";

/**
 * Canonical origin, no trailing slash. Falls back to the live domain (never
 * localhost) so a missing env var can't ship localhost canonicals, hreflang or
 * sitemap URLs to search engines.
 */
export const SITE_URL = (rawUrl && rawUrl.length > 0 ? rawUrl : PRODUCTION_URL).replace(
  /\/+$/,
  "",
);

export const siteConfig = {
  name: "DOCS MEDIA",
  legalName: "DOCS MEDIA",
  tagline: "Digital marketing agency",
  description:
    "DOCS MEDIA is a digital marketing agency in Kanhangad, Kerala: Meta Ads, social media marketing, SEO, website development, Shopify stores and creative content.",
  url: SITE_URL,
  locale: "en_US",
  /** BCP 47 tag. Drives <html lang>, hreflang and schema inLanguage. */
  language: "en",
  /** Used for the copyright line. Static on purpose (prerendered pages can't read the clock). */
  copyrightYear: 2026,
  whatsapp: {
    /** Digits only, with country code — used for schema.org telephone. */
    number: "917736332903",
    display: "+91 77363 32903",
    url: "https://wa.me/917736332903",
  },
  /** Business location. Shown in the footer and on the Contact page, and used in structured data. */
  address: {
    lines: ["CA MALL", "Near Mathoth Sree Mahavishnu Temple", "Kanhangad South, Kanhangad", "Kerala 671315"],
    streetAddress: "CA MALL, Near Mathoth Sree Mahavishnu Temple",
    locality: "Kanhangad",
    area: "Kanhangad South",
    region: "Kerala",
    postalCode: "671315",
    /** ISO country code, used only in structured data (not displayed). */
    countryCode: "IN",
  },
  /**
   * Where the business serves in person. Used for schema.org areaServed. Only the
   * office's own town and district, the areas the local pages target.
   */
  serviceArea: {
    city: "Kanhangad",
    district: "Kasaragod district",
    region: "Kerala",
    country: "India",
  },
  /** Optional. Leave empty until a real address exists; it is hidden when empty. */
  email: "",
  /** Real profile URLs only. Empty entries are not rendered or added to structured data. */
  socials: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
  themeColor: "#600a79",
  /**
   * Official logo. Put the file in /public (e.g. /public/logo.svg) and set
   * `src: "/logo.svg"` with its real pixel size to replace the built-in
   * placeholder mark everywhere (header + footer). Leave `src` empty to keep
   * the placeholder.
   */
  logo: {
    src: "/logo.png",
    alt: "DOCS MEDIA digital marketing agency logo",
    width: 710,
    height: 330,
  },
  /**
   * Logo used in structured data. Google shows logos on light backgrounds, so
   * this must be the purple/dark version (the header logo is white).
   */
  schemaLogo: { src: "/logo-purple.png", width: 710, height: 330 },
} as const;

/** Core search topics. Used for the keywords meta tag and schema `knowsAbout`. */
export const seoKeywords = [
  "digital marketing agency",
  "Meta Ads agency",
  "Facebook and Instagram ads",
  "Shopify development",
  "Shopify store setup",
  "website development company",
  "social media marketing",
  "SEO services",
  "performance marketing",
  "landing page design",
  "personal branding services",
  "creative studio",
  "reels and video production",
] as const;

export type SocialKey = keyof typeof siteConfig.socials;

/** Google Maps link for the business address (opens the maps app on phones). */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.streetAddress}, ${siteConfig.address.area}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
)}`;

export type NavKey =
  | "home"
  | "about"
  | "services"
  | "personalBranding"
  | "creativeStudio"
  | "projects"
  | "blog"
  | "faqs"
  | "contact";

export type NavLink = {
  /** Path without a language prefix. */
  href: string;
  /** Key into the dictionary's `nav` (and `navShort`) labels. */
  key: NavKey;
  /** Hide from the desktop bar below the xl breakpoint (still in mobile menu + footer). */
  xlOnly?: boolean;
};

export const navLinks: readonly NavLink[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/personal-branding", key: "personalBranding", xlOnly: true },
  { href: "/creative-studio", key: "creativeStudio", xlOnly: true },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/faqs", key: "faqs" },
  { href: "/contact", key: "contact" },
];

/** Static pages included in the sitemap, with relative priority. */
export const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/personal-branding", priority: 0.9, changeFrequency: "monthly" },
  { path: "/creative-studio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
] as const;

/**
 * Date used as `lastModified` for static pages in the sitemap.
 * Update when site content changes meaningfully (kept constant so builds are
 * deterministic and prerendering never needs the clock).
 */
export const CONTENT_LAST_UPDATED = "2026-10-30";
