export type IconName =
  | "social"
  | "ads"
  | "search"
  | "creative"
  | "web"
  | "brand"
  | "profile"
  | "studio";

export type Service = {
  slug: string;
  title: string;
  /** One-line summary used on cards and in structured data. */
  summary: string;
  /** Longer description for the Services page. */
  description: string;
  deliverables: string[];
  icon: IconName;
  /** Slug of a related blog post, linked from the Services page (internal linking). */
  guideSlug?: string;
  /** Dedicated landing page for this service, when one exists. Cards and links point here. */
  href?: string;
};

/**
 * Service catalogue. Edit freely — pages, sitemap anchors, structured data and
 * the enquiry-form dropdown are all generated from this list.
 */
export const services: Service[] = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    summary:
      "Consistent, on-brand Instagram and Facebook presence built around a clear content strategy.",
    description:
      "We plan, create and publish social media content for the platforms where your audience actually spends time, then review what works and adjust the plan month by month.",
    deliverables: [
      "Platform and audience strategy",
      "Monthly content calendar",
      "Post, carousel and short-video production",
      "Community management and replies",
      "Monthly performance review",
    ],
    icon: "social",
    guideSlug: "monthly-social-media-content-plan",
  },
  {
    slug: "performance-marketing",
    title: "Meta Ads & Performance Marketing",
    summary:
      "Facebook, Instagram and Google ad campaigns structured, tracked and optimised against your goals.",
    description:
      "Paid campaigns need clean tracking and steady testing. We set up measurement first, then test audiences, creatives and offers on Meta Ads and Google Ads so your budget moves toward what works.",
    deliverables: [
      "Campaign structure and audience planning",
      "Pixel, event and conversion tracking setup",
      "Click-to-WhatsApp and lead-generation ad setup",
      "Ad creative and copy testing",
      "Budget and bid optimisation",
      "Clear reporting against agreed goals",
    ],
    icon: "ads",
    guideSlug: "meta-ads-campaign-basics",
  },
  {
    slug: "seo",
    title: "Search Engine Optimisation (SEO)",
    summary:
      "Technical, on-page and content SEO that helps the right people find you.",
    description:
      "We audit your site, fix what blocks crawling and indexing, and build content around the questions your customers search for, in the way your customers search for them.",
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword and search-intent research",
      "On-page optimisation and metadata",
      "SEO content planning",
      "Local SEO and Google Business Profile guidance",
      "Search Console and analytics tracking",
    ],
    icon: "search",
    guideSlug: "on-page-seo-checklist",
  },
  {
    slug: "content-and-creative",
    title: "Content & Creative",
    summary:
      "Graphics, short-form video and copy that carry your message across channels.",
    description:
      "Strong creative is what stops the scroll. We produce campaign visuals, social assets and written content that stay consistent with your brand.",
    deliverables: [
      "Social and ad creatives",
      "Short-form video concepts and editing",
      "Website and landing-page copy",
      "Brand-consistent design templates",
    ],
    icon: "creative",
  },
  {
    slug: "website-and-landing-pages",
    title: "Website Development & Shopify",
    summary:
      "Fast, mobile-first websites, landing pages and Shopify stores designed to turn visits into enquiries and orders.",
    description:
      "Your website is where every channel lands. We design and build responsive, search-friendly websites and Shopify stores with clear calls to action, enquiry forms, WhatsApp click-to-chat and the tracking needed to measure them.",
    deliverables: [
      "Responsive, mobile-first website design and development",
      "Shopify store setup, theme customisation and product pages",
      "Checkout, payment and shipping setup for your customers",
      "Landing pages for campaigns",
      "On-page SEO foundations",
      "Analytics and conversion tracking",
      "Enquiry forms and WhatsApp click-to-chat",
    ],
    icon: "web",
    guideSlug: "shopify-store-launch-checklist",
  },
  {
    slug: "branding",
    title: "Branding & Identity",
    summary:
      "A clear visual identity and voice so your brand looks and sounds like one business.",
    description:
      "From logo and colour to tone of voice, we help define how your brand shows up so every post, ad and page feels connected.",
    deliverables: [
      "Logo and visual identity",
      "Colour and typography system",
      "Brand voice guidelines",
      "Social profile and asset kits",
    ],
    icon: "brand",
  },
  {
    slug: "personal-branding",
    title: "Personal Branding",
    summary:
      "Positioning, profiles, content and a personal website that make founders, experts and creators easy to find and trust.",
    description:
      "We help founders, professionals and creators define who they are and show up consistently on Instagram, LinkedIn, YouTube and the web, with a clear story, a consistent look and content in their own voice.",
    deliverables: [
      "Brand positioning and messaging",
      "Profile makeover for chosen platforms",
      "Content pillars and monthly calendar",
      "Personal website with SEO foundations",
    ],
    icon: "profile",
    guideSlug: "monthly-social-media-content-plan",
    href: "/personal-branding",
  },
  {
    slug: "creative-studio",
    title: "Creative Studio",
    summary:
      "Reels, video, product photography, ad creatives and graphic design produced in one consistent brand style.",
    description:
      "Our creative studio plans, shoots, edits and designs the visuals your brand needs for social media, ads, your website and your online store, so everything looks like it belongs together.",
    deliverables: [
      "Reels and short-form video production",
      "Product and brand photography",
      "Ad and social creatives",
      "Graphic design and templates",
    ],
    icon: "studio",
    guideSlug: "meta-ads-campaign-basics",
    href: "/creative-studio",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const processSteps = [
  {
    title: "Discover",
    text: "We learn about your business, audience, offers and goals before recommending anything.",
  },
  {
    title: "Plan",
    text: "You get a focused strategy: channels, content, budget split and how success will be measured.",
  },
  {
    title: "Create & launch",
    text: "We produce the creatives, set up tracking and launch campaigns or pages.",
  },
  {
    title: "Measure & improve",
    text: "We review the numbers regularly, report plainly and refine what we do next.",
  },
] as const;

export const principles = [
  {
    title: "Strategy before spend",
    text: "Clear goals and tracking come first, so budget is never spent blind.",
  },
  {
    title: "Plain-language reporting",
    text: "You see what was done, what the numbers say and what happens next.",
  },
  {
    title: "Mobile-first thinking",
    text: "Most customers meet your brand on a phone, so we design for that first.",
  },
  {
    title: "Honest expectations",
    text: "We set realistic goals and do not promise rankings or sales we cannot control.",
  },
] as const;
