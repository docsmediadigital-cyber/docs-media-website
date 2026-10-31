import type { Faq } from "@/content/faqs";
import type { Locale } from "@/i18n/config";
import { locationPathBySlug } from "@/content/location-paths";

export type LocationPage = {
  slug: keyof typeof locationPathBySlug;
  path: string;
  /** Short place name used in breadcrumbs and schema. */
  place: string;
  /** Footer / Contact link text, per language (pages themselves are English-only). */
  linkLabel: Record<Locale, string>;
  /** schema.org place the Service covers. */
  areaServed: { type: "City" | "AdministrativeArea"; name: string };
  /** <title> WITHOUT the site suffix (the root layout template adds it). */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  whatsappMessage: string;
  whyTitle: string;
  why: string[];
  servicesTitle: string;
  servicesIntro: string;
  /** Service slugs from src/content/services.ts with a place-specific line each. */
  services: Array<{ slug: string; text: string }>;
  audienceTitle: string;
  audience: Array<{ title: string; text: string }>;
  areasTitle: string;
  areasText: string;
  areas: string[];
  faqTitle: string;
  faqs: Faq[];
  ctaTitle: string;
  /** Blog slugs to link from the page (internal linking). */
  guideSlugs: string[];
};

/**
 * Local landing pages, English only (like blog posts). Copy describes services
 * the site already offers and the office address in src/lib/site.ts; it makes
 * no client, result, review or opening-hours claims. Keep the two pages
 * genuinely different: near-duplicate location pages are not indexed.
 */
export const locationPages: LocationPage[] = [
  {
    slug: "kanhangad",
    path: locationPathBySlug.kanhangad,
    place: "Kanhangad",
    linkLabel: {
      en: "Digital marketing in Kanhangad",
      ar: "التسويق الرقمي في كانهانغاد",
    },
    areaServed: { type: "City", name: "Kanhangad" },
    metaTitle: "Digital Marketing Agency in Kanhangad",
    metaDescription:
      "DOCS MEDIA is a digital marketing agency at CA MALL, Kanhangad: Meta Ads, social media, local SEO, websites, Shopify and creative content.",
    keywords: [
      "digital marketing agency Kanhangad",
      "digital marketing Kanhangad",
      "social media marketing Kanhangad",
      "website development Kanhangad",
      "Meta Ads Kanhangad",
      "SEO Kanhangad",
    ],
    h1: "Digital marketing agency in Kanhangad",
    intro:
      "DOCS MEDIA works from CA MALL in Kanhangad South. We help Kanhangad shops, clinics, schools, restaurants and service businesses get found on Google, stand out on Instagram and Facebook, and turn that attention into WhatsApp enquiries and orders.",
    whatsappMessage:
      "Hi DOCS MEDIA, I run a business in Kanhangad and I'd like to discuss digital marketing.",
    whyTitle: "A digital marketing team in Kanhangad",
    why: [
      "Most conversations with us start on WhatsApp. When you are in Kanhangad, you can also sit down with us at our office in CA MALL, near Mathoth Sree Mahavishnu Temple, and talk through your goals face to face.",
      "Being nearby makes content easier too. Reels, product photos and shop-floor videos for a Kanhangad business can be planned around your working day, and we confirm shoot locations and logistics with you when we scope the project.",
      "Local customers usually search on their phone, by service and by area, and often end in a WhatsApp chat or a call rather than a web form. We set up your Google presence, ads and website with that path in mind, and report on the enquiries it brings, not just likes and views.",
    ],
    servicesTitle: "Digital marketing services for Kanhangad businesses",
    servicesIntro:
      "Work with us on one service or combine several into one plan. Each links to the full details.",
    services: [
      {
        slug: "social-media-marketing",
        text: "Instagram and Facebook pages that look active and trustworthy, with a monthly plan built around your offers, seasons and festivals.",
      },
      {
        slug: "performance-marketing",
        text: "Meta and Google ads aimed at people in and around Kanhangad, including Click-to-WhatsApp campaigns so enquiries land straight in your chat.",
      },
      {
        slug: "seo",
        text: "Local SEO so you show up when people nearby search for what you sell, with Google Business Profile guidance and the basics fixed on your website.",
      },
      {
        slug: "website-and-landing-pages",
        text: "Fast, mobile-first websites and Shopify stores with your address, map, WhatsApp button and enquiry form where customers expect them.",
      },
      {
        slug: "creative-studio",
        text: "Reels, product photography and ad creatives for your business, with shoots planned with you in advance.",
      },
      {
        slug: "personal-branding",
        text: "Personal brands for Kanhangad doctors, consultants, coaches and founders who want to be the name people recommend.",
      },
    ],
    audienceTitle: "Kanhangad businesses we can help",
    audience: [
      {
        title: "Shops and showrooms",
        text: "Textile, jewellery, electronics, furniture and home stores that want more footfall and more WhatsApp enquiries.",
      },
      {
        title: "Clinics and healthcare",
        text: "Doctors, dental clinics and wellness centres that need a clear, trustworthy presence when patients search.",
      },
      {
        title: "Restaurants, bakeries and cafés",
        text: "Menus, reels and an up-to-date Google listing that bring in local diners and orders.",
      },
      {
        title: "Schools and training centres",
        text: "Admission campaigns, course pages and lead forms timed to the academic calendar.",
      },
      {
        title: "Real estate and builders",
        text: "Project landing pages and lead campaigns for plots, homes and commercial space.",
      },
      {
        title: "Professional services",
        text: "Consultants, travel agencies, accountants and other practices that grow on trust and referrals.",
      },
    ],
    areasTitle: "In and around Kanhangad",
    areasText:
      "We work with businesses in Kanhangad town and the places around it, including:",
    areas: ["Kanhangad town", "Kanhangad South", "Hosdurg", "Ajanur", "Nileshwar", "Bekal", "Uduma"],
    faqTitle: "Digital marketing in Kanhangad: common questions",
    faqs: [
      {
        question: "Where is the DOCS MEDIA office in Kanhangad?",
        answer:
          "Our office is at CA MALL, near Mathoth Sree Mahavishnu Temple, Kanhangad South, Kanhangad, Kerala 671315. Use the Google Maps button on this page for directions. It helps to message us on WhatsApp before you come, so the right person is available.",
      },
      {
        question: "Can I meet the team in person?",
        answer:
          "Yes. If you are in or near Kanhangad, we are happy to meet at our office to talk through your goals. You can also start on WhatsApp and meet once there is a plan to discuss.",
      },
      {
        question: "Do you only work with businesses in Kanhangad?",
        answer:
          "No. Kanhangad is our base, and we also work with businesses across Kasaragod district, elsewhere in Kerala and abroad, mostly over WhatsApp and online.",
      },
      {
        question: "How soon will a local business see results?",
        answer:
          "It depends on the channel. Ads can start bringing enquiries soon after launch, while SEO and a stronger Google presence usually build over several months. We agree goals and reporting with you before we start, and we do not promise rankings.",
      },
      {
        question: "Can you help with our Google Business Profile?",
        answer:
          "Yes. Local SEO and Google Business Profile guidance are part of our SEO service: we review how your listing, website and other profiles present your business and recommend clear, policy-compliant improvements.",
      },
    ],
    ctaTitle: "Grow your Kanhangad business online",
    guideSlugs: ["click-to-whatsapp-ads-for-businesses", "on-page-seo-checklist"],
  },
  {
    slug: "kasaragod",
    path: locationPathBySlug.kasaragod,
    place: "Kasaragod",
    linkLabel: {
      en: "Digital marketing in Kasaragod",
      ar: "التسويق الرقمي في كاسارغود",
    },
    areaServed: { type: "AdministrativeArea", name: "Kasaragod district" },
    metaTitle: "Digital Marketing Agency in Kasaragod District",
    metaDescription:
      "Digital marketing for businesses across Kasaragod district from a Kanhangad-based team: Meta Ads, social media, local SEO, websites and Shopify stores.",
    keywords: [
      "digital marketing agency Kasaragod",
      "digital marketing company in Kasaragod",
      "SEO services Kasaragod",
      "social media marketing Kasaragod",
      "website design Kasaragod",
      "Shopify developer Kerala",
    ],
    h1: "Digital marketing for businesses across Kasaragod district",
    intro:
      "From Kasaragod town and Manjeshwar to Nileshwar and Trikaripur, DOCS MEDIA helps businesses across the district reach more customers online. Our team is based in Kanhangad, inside the district, so a meeting or a shoot is never far away.",
    whatsappMessage:
      "Hi DOCS MEDIA, I have a business in Kasaragod district and I'd like to discuss digital marketing.",
    whyTitle: "Marketing for a varied district",
    why: [
      "Kasaragod is often called the land of seven languages, and its customers are just as varied: town-centre shoppers, families in the villages, visitors heading to Bekal and a large community working in the Gulf. One message rarely fits all of them, so we plan the audience, channels and timing of each campaign rather than copying a template.",
      "Distance is rarely a problem. Most of the work runs over WhatsApp and shared reports, and when a meeting or a shoot is useful, our office in Kanhangad is within the district. For shoots, we confirm location and logistics with you when we scope the project.",
      "We keep the marketing honest and measurable: clear goals at the start, tracking set up properly and regular reporting on enquiries, calls and orders, so you can see what your budget is doing.",
    ],
    servicesTitle: "What we do for Kasaragod businesses",
    servicesIntro:
      "Pick the service you need now, or combine several. Each links to the full details.",
    services: [
      {
        slug: "performance-marketing",
        text: "Meta and Google ad campaigns targeted by town, radius or interest across the district, with Click-to-WhatsApp ads for businesses that sell through chat.",
      },
      {
        slug: "seo",
        text: "Local SEO for the places you serve: Google Business Profile guidance, on-page fixes and content that matches how people nearby search.",
      },
      {
        slug: "social-media-marketing",
        text: "Consistent Instagram and Facebook content with a monthly plan built around your audience, your offers and the local calendar.",
      },
      {
        slug: "website-and-landing-pages",
        text: "Websites and Shopify stores for district businesses that want to sell beyond their town, with payments, shipping and WhatsApp contact set up clearly.",
      },
      {
        slug: "content-and-creative",
        text: "Graphics, short videos and copy that make a local business look as professional as any big-city brand.",
      },
      {
        slug: "branding",
        text: "Logo, colours and a consistent voice for new businesses or established names ready for a refresh.",
      },
    ],
    audienceTitle: "Who we work with across the district",
    audience: [
      {
        title: "Tourism and hospitality",
        text: "Resorts, hotels, homestays and tour operators around Bekal and the coast that depend on Google, Instagram and reviews for bookings.",
      },
      {
        title: "Local produce and trade",
        text: "Cashew, areca nut, coconut and spice traders and producers building a brand or selling online.",
      },
      {
        title: "Retail across the towns",
        text: "Shops in Kasaragod town, Kanhangad, Nileshwar and Cheruvathur that want more footfall and WhatsApp orders.",
      },
      {
        title: "Education",
        text: "Schools, colleges, coaching and skill-training centres running admission campaigns.",
      },
      {
        title: "Healthcare",
        text: "Hospitals, clinics and diagnostic centres that need accurate listings and a trustworthy presence online.",
      },
      {
        title: "Gulf-connected businesses",
        text: "Owners who run a business at home while living or working in the Gulf, and need marketing they can follow remotely.",
      },
    ],
    areasTitle: "Across Kasaragod district",
    areasText: "We work with businesses throughout the district, including:",
    areas: [
      "Kasaragod town",
      "Kanhangad",
      "Nileshwar",
      "Cheruvathur",
      "Trikaripur",
      "Bekal",
      "Uduma",
      "Kumbla",
      "Uppala",
      "Manjeshwar",
    ],
    faqTitle: "Digital marketing in Kasaragod: common questions",
    faqs: [
      {
        question: "Do you have an office in Kasaragod district?",
        answer:
          "Yes. Our office is in Kanhangad, at CA MALL near Mathoth Sree Mahavishnu Temple, within Kasaragod district. Businesses in Kasaragod town and elsewhere in the district can start with us on WhatsApp, and we can arrange to meet when it helps.",
      },
      {
        question: "Can you run ads that target specific towns in the district?",
        answer:
          "Yes. Meta and Google ads can target individual towns, a radius around your shop or the whole district, and leave out areas you do not serve. We suggest a setup based on where your customers are.",
      },
      {
        question: "Which platforms work best for businesses in Kasaragod?",
        answer:
          "It depends on your customers. Instagram, Facebook and WhatsApp are good at starting conversations, while Google Search and Maps reach people who are ready to buy. We recommend a mix once we understand your goals.",
      },
      {
        question: "Can a Kasaragod business sell outside the district?",
        answer:
          "Yes. With a website or Shopify store and targeted ads, you can reach customers across Kerala, India or abroad. We talk you through payment, shipping and delivery options before you commit.",
      },
      {
        question: "How do we work together if we are not in Kanhangad?",
        answer:
          "Mostly over WhatsApp and online: we share plans, drafts and reports, and agree changes in chat or on a call. For shoots or workshops, we confirm location and logistics with you in advance.",
      },
    ],
    ctaTitle: "Planning marketing for your Kasaragod business?",
    guideSlugs: [
      "meta-ads-campaign-basics",
      "shopify-store-launch-checklist",
      "monthly-social-media-content-plan",
    ],
  },
];

export function getLocationPage(slug: LocationPage["slug"]): LocationPage {
  const page = locationPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown location page: ${slug}`);
  return page;
}
