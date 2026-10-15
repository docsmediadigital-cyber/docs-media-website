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

/** Canonical origin, no trailing slash. Falls back to localhost for local dev. */
export const SITE_URL = (rawUrl && rawUrl.length > 0 ? rawUrl : "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export const siteConfig = {
  name: "DOCS MEDIA",
  legalName: "DOCS MEDIA",
  tagline: "Digital marketing agency",
  description:
    "DOCS MEDIA is a digital marketing agency for Indian businesses: Meta Ads, social media marketing, SEO, website development, Shopify stores and creative content.",
  url: SITE_URL,
  locale: "en_IN",
  /** BCP 47 tag: English as used in India. Drives <html lang>, hreflang and schema inLanguage. */
  language: "en-IN",
  /** Country the business markets to (schema.org areaServed). */
  areaServed: "India",
  /** Used for the copyright line. Static on purpose (prerendered pages can't read the clock). */
  copyrightYear: 2026,
  whatsapp: {
    /** Digits only, with country code — used for schema.org telephone. */
    number: "917736332903",
    display: "+91 77363 32903",
    url: "https://wa.me/917736332903",
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

/** Core search topics for India. Used for the keywords meta tag and schema `knowsAbout`. */
export const seoKeywords = [
  "digital marketing agency in India",
  "Meta Ads agency India",
  "Facebook and Instagram ads India",
  "Shopify development India",
  "Shopify store setup",
  "website development company India",
  "social media marketing India",
  "SEO services India",
  "performance marketing",
  "landing page design",
  "personal branding services India",
  "creative studio India",
  "reels and video production",
] as const;

export type SocialKey = keyof typeof siteConfig.socials;

export type NavLink = {
  href: string;
  label: string;
  /** Compact label for the desktop bar, where space is tight. */
  shortLabel?: string;
  /** Hide from the desktop bar below the xl breakpoint (still in mobile menu + footer). */
  xlOnly?: boolean;
};

export const navLinks: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/personal-branding", label: "Personal Branding", shortLabel: "Personal Brand", xlOnly: true },
  { href: "/creative-studio", label: "Creative Studio", shortLabel: "Studio", xlOnly: true },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
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
export const CONTENT_LAST_UPDATED = "2026-10-15";
