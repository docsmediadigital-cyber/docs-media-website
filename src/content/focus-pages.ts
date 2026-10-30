import type { Faq } from "@/content/faqs";
import type { IconName } from "@/content/services";

export type FocusPage = {
  /** URL segment and matching service slug in src/content/services.ts */
  slug: "personal-branding" | "creative-studio";
  path: string;
  /** Short label for the section eyebrow and breadcrumbs. */
  name: string;
  icon: IconName;
  /** <title> WITHOUT the site suffix (the root layout template adds it). */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** On-page H1. Carries the primary keyword. */
  h1: string;
  intro: string;
  /** Optional feature image shown under the page hero. File lives in /public. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Short, equal-length summary for the home-page highlight cards. */
  blurb: string;
  /** Pre-filled WhatsApp text, page-specific so leads can be attributed. */
  whatsappMessage: string;
  audienceTitle: string;
  audience: Array<{ title: string; text: string }>;
  offeringsTitle: string;
  offerings: Array<{ title: string; text: string }>;
  deliverables: string[];
  processTitle: string;
  process: Array<{ title: string; text: string }>;
  faqs: Faq[];
  exploreCta: string;
  ctaTitle: string;
  faqTitle: string;
  /** Blog slugs to link from the page (internal linking). */
  guideSlugs: string[];
  /** Other focus page / service paths to cross-link. */
  crossLink: { label: string; href: string; text: string; cta: string };
};

/**
 * Two dedicated landing pages. Copy is deliberately general: no client claims,
 * results, equipment lists or locations that have not been confirmed. Edit
 * freely; pages, schema, sitemap and the home-page sections all read from here.
 */
export const focusPages: FocusPage[] = [
  {
    slug: "personal-branding",
    path: "/personal-branding",
    name: "Personal Branding",
    icon: "profile",
    metaTitle: "Personal Branding for Founders & Creators",
    metaDescription:
      "Personal branding for founders, doctors, coaches and creators: brand positioning, LinkedIn and Instagram presence, content and a personal website.",
    keywords: [
      "personal branding services",
      "personal branding agency",
      "founder branding",
      "LinkedIn personal branding",
      "Instagram personal brand",
      "personal brand website",
    ],
    h1: "Personal branding services for founders, professionals and creators",
    intro:
      "People buy from people they recognise and trust. We help you define who you are, what you stand for and who you want to reach, then show up consistently on Instagram, LinkedIn, YouTube and your own website.",
    image: {
      src: "/personal-branding-team.jpg",
      alt: "The DOCS MEDIA team in the studio lifting a giant cartoon banana mascot together",
      width: 1267,
      height: 768,
    },
    blurb:
      "Define who you are and what you stand for, then show up consistently on Instagram, LinkedIn, YouTube and your own website.",
    whatsappMessage:
      "Hi DOCS MEDIA, I'm interested in personal branding. Can we discuss how to build my brand?",
    audienceTitle: "Who personal branding is for",
    audience: [
      {
        title: "Founders and business owners",
        text: "Put a face and a point of view behind your company so customers, partners and hires trust you faster.",
      },
      {
        title: "Doctors, consultants and coaches",
        text: "Build credibility and a clear, professional presence for people who are searching for someone they can rely on.",
      },
      {
        title: "Creators and experts",
        text: "Turn your knowledge into a recognisable brand with a consistent look, voice and content rhythm.",
      },
    ],
    offeringsTitle: "What we build for your personal brand",
    offerings: [
      {
        title: "Brand positioning and story",
        text: "A clear answer to who you help, how you are different and what you want to be known for.",
      },
      {
        title: "Visual identity and profile makeover",
        text: "Profile photos, bios, banners, highlights and templates that look like one person across every platform.",
      },
      {
        title: "Content strategy and creation",
        text: "Content pillars, a monthly calendar, reels, carousels and posts written in your own voice.",
      },
      {
        title: "Personal website and link hub",
        text: "A fast, mobile-first, search-friendly website with your story, services and enquiry or WhatsApp contact.",
      },
      {
        title: "LinkedIn and Instagram growth support",
        text: "Profile optimisation, posting rhythm and engagement habits that build visibility with the right audience.",
      },
      {
        title: "Search visibility for your name",
        text: "Make sure people who Google you find accurate, professional results: your site, profiles and content.",
      },
    ],
    deliverables: [
      "Brand positioning and messaging document",
      "Profile optimisation for chosen platforms",
      "Content pillars and monthly content calendar",
      "Post, carousel and short-video production",
      "Personal website with on-page SEO foundations",
      "Monthly review and next-step plan",
    ],
    processTitle: "How we build a personal brand",
    process: [
      {
        title: "Define",
        text: "We talk through your story, strengths, audience and goals to find a positioning that is true to you.",
      },
      {
        title: "Design",
        text: "We shape your visual identity, voice and profile setup so everything feels consistent.",
      },
      {
        title: "Create",
        text: "We plan and produce content, and build your website or link hub if you need one.",
      },
      {
        title: "Grow",
        text: "We review what resonates, refine the plan and keep your presence active and credible.",
      },
    ],
    faqs: [
      {
        question: "What is personal branding and why does it matter?",
        answer:
          "Personal branding is the deliberate way you present your expertise, values and personality online. It matters because customers, clients and employers often look you up before they get in touch, and a clear, consistent presence builds trust before the first conversation.",
      },
      {
        question: "Which platforms do you work on for personal branding?",
        answer:
          "Most commonly Instagram, LinkedIn and YouTube, plus your own website. We recommend platforms based on where your audience actually spends time, not on trends.",
      },
      {
        question: "Do I need to appear on camera?",
        answer:
          "Not always. Video helps because it builds familiarity, but we can also build your brand through written posts, carousels, quotes and voice-led content. We will agree a format that you are comfortable with.",
      },
      {
        question: "How long does it take to see results from personal branding?",
        answer:
          "Personal branding is a steady, compounding effort rather than a quick fix. Visibility and trust build with consistent posting and engagement, so we set realistic goals and review progress monthly instead of promising follower counts or sales.",
      },
      {
        question: "Can you also build my personal website?",
        answer:
          "Yes. We build fast, mobile-first personal websites with your story, services, enquiry form and WhatsApp click-to-chat, with on-page SEO foundations so people searching for you can find you.",
      },
    ],
    exploreCta: "Explore personal branding",
    ctaTitle: "Ready to start with personal branding?",
    faqTitle: "Personal Branding: common questions",
    guideSlugs: ["monthly-social-media-content-plan", "on-page-seo-checklist"],
    crossLink: {
      cta: "Explore creative studio",
      label: "Creative Studio",
      href: "/creative-studio",
      text: "Need photos, reels or video for your brand? Our creative studio produces content for you.",
    },
  },
  {
    slug: "creative-studio",
    path: "/creative-studio",
    name: "Creative Studio",
    icon: "studio",
    metaTitle: "Creative Studio: Video, Reels, Photo & Design",
    metaDescription:
      "DOCS MEDIA creative studio for brands: reels and short-form video, product and brand photography, ad creatives, graphic design and content production.",
    keywords: [
      "creative studio",
      "video production for brands",
      "reels and short video production",
      "product photography",
      "ad creative design",
      "content production agency",
    ],
    h1: "Creative studio for reels, video, photography and design",
    intro:
      "Strong creative is what stops the scroll. Our creative studio plans, shoots, edits and designs the visuals your brand needs for social media, ads, your website and your store, all in one consistent look.",
    image: {
      src: "/creative-studio.jpg",
      alt: "DOCS MEDIA creative studio with a purple brand wall, camera, softbox lighting and a desk workspace",
      width: 1672,
      height: 941,
    },
    blurb:
      "Reels, photography, ad creatives and design, planned, shot and edited in one consistent look for your brand and store.",
    whatsappMessage:
      "Hi DOCS MEDIA, I'm interested in your creative studio. Can we discuss a shoot or content project?",
    audienceTitle: "Who the creative studio is for",
    audience: [
      {
        title: "Brands and D2C stores",
        text: "Product visuals, ad creatives and social content that make your catalogue and campaigns look professional.",
      },
      {
        title: "Local and service businesses",
        text: "Reels, photos and promos that show your work, your team and your offers clearly to local customers.",
      },
      {
        title: "Founders, creators and experts",
        text: "Brand shoots, talking-head videos and content batches that keep your channels active.",
      },
    ],
    offeringsTitle: "What our creative studio produces",
    offerings: [
      {
        title: "Reels and short-form video",
        text: "Concepts, scripting, shooting and editing for Instagram Reels, YouTube Shorts and Facebook.",
      },
      {
        title: "Product and brand photography",
        text: "Clean product shots, lifestyle visuals and brand portraits for your store, catalogue and social profiles.",
      },
      {
        title: "Ad creatives",
        text: "Static, carousel and video ads built for Meta Ads and Google, with variations ready for testing.",
      },
      {
        title: "Graphic design",
        text: "Social post templates, banners, brochures, packaging visuals and presentation design in your brand style.",
      },
      {
        title: "Brand video and promos",
        text: "Short brand films, launch videos and offer promos with clear messaging and call to action.",
      },
      {
        title: "Content batches",
        text: "Plan one shoot, get a month of content: photos, clips and designs organised and ready to publish.",
      },
    ],
    deliverables: [
      "Creative concept and shot list",
      "Shoot planning and production",
      "Video editing, captions and cover designs",
      "Photo editing and retouching",
      "Ad and social creative sets in multiple sizes",
      "Organised files ready to publish",
    ],
    processTitle: "How a creative project runs",
    process: [
      {
        title: "Brief",
        text: "We understand your brand, audience, offer and where the content will be used.",
      },
      {
        title: "Plan",
        text: "We agree concepts, scripts, shot lists and a schedule before anything is shot.",
      },
      {
        title: "Produce",
        text: "We shoot, edit and design, sharing drafts so you can review and request changes.",
      },
      {
        title: "Deliver",
        text: "You receive final files in the right formats, ready for social, ads and your website.",
      },
    ],
    faqs: [
      {
        question: "What does your creative studio do?",
        answer:
          "We produce reels and short-form video, product and brand photography, ad creatives, graphic design and complete content batches for social media, ads, websites and online stores.",
      },
      {
        question: "Can you shoot product photos and videos for my online store?",
        answer:
          "Yes. We create product photography and short videos for Shopify stores, marketplaces and social channels, planned around your products and how customers will see them.",
      },
      {
        question: "Can the creative studio work with my Meta Ads campaigns?",
        answer:
          "Yes. We design and edit ad creatives in the sizes Meta Ads and Google need, and make variations so different hooks, visuals and offers can be tested properly.",
      },
      {
        question: "How do you handle revisions?",
        answer:
          "We share drafts for review and incorporate agreed feedback. Revision rounds are confirmed in the project scope before work starts so there are no surprises.",
      },
      {
        question: "Do I need to be in the same city as the studio?",
        answer:
          "Not for planning, editing and design, which we handle remotely. For shoots, we will confirm location and logistics with you when we scope the project.",
      },
    ],
    exploreCta: "Explore creative studio",
    ctaTitle: "Ready to start with creative studio?",
    faqTitle: "Creative Studio: common questions",
    guideSlugs: ["monthly-social-media-content-plan", "meta-ads-campaign-basics"],
    crossLink: {
      cta: "Explore personal branding",
      label: "Personal Branding",
      href: "/personal-branding",
      text: "Building a brand around yourself? Pair studio content with a personal branding plan.",
    },
  },
];

export function getFocusPage(slug: FocusPage["slug"]): FocusPage {
  const page = focusPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown focus page: ${slug}`);
  return page;
}
