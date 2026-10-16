export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  updated?: string;
  category: string;
  /** Service slugs (src/content/services.ts) shown as "Related services" under the post. */
  relatedServices?: string[];
  body: Block[];
};

/**
 * Blog posts. These are general, educational articles — they make no claims
 * about DOCS MEDIA clients or results. Edit, replace or add posts here; the
 * blog index, post pages, structured data and sitemap update automatically.
 * Posts are sorted by date automatically, so array order does not matter.
 */
const posts: BlogPost[] = [
  {
    slug: "monthly-social-media-content-plan",
    title: "A simple monthly content plan for your social media",
    description:
      "A practical framework for planning a month of social media content around goals, themes and a repeatable weekly rhythm.",
    date: "2026-10-12",
    category: "Social Media",
    relatedServices: ["social-media-marketing", "content-and-creative"],
    body: [
      {
        type: "p",
        text: "Posting whenever inspiration strikes usually leads to gaps, inconsistent messaging and content that does not support any business goal. A short monthly plan fixes that without turning content into a full-time job.",
      },
      { type: "h2", text: "1. Start with one goal for the month" },
      {
        type: "p",
        text: "Pick a single primary goal: more enquiries, more followers in a target audience, more visits to a particular page, or awareness of a new offer. Every piece of content should either support that goal or build trust with the audience you want to reach.",
      },
      { type: "h2", text: "2. Choose three or four content themes" },
      {
        type: "p",
        text: "Themes keep your feed focused and make ideas easier to find. A common mix looks like this:",
      },
      {
        type: "ul",
        items: [
          "Educational: tips, how-tos and answers to questions customers ask you.",
          "Proof: real work, real customer feedback and behind-the-scenes process, shared only with permission and only if genuine.",
          "Offer: what you sell, who it is for and how to enquire.",
          "Personality: the people and values behind the brand.",
        ],
      },
      { type: "h2", text: "3. Build a repeatable weekly rhythm" },
      {
        type: "p",
        text: "Assign each theme to a regular slot, for example educational content early in the week and an offer post towards the end. A rhythm you can actually sustain beats an ambitious schedule you abandon in week three.",
      },
      { type: "h2", text: "4. Batch your creation" },
      {
        type: "p",
        text: "Write captions, design graphics and film short videos in batches. Doing similar tasks together is faster than starting from scratch each day, and it leaves room to react to timely topics.",
      },
      { type: "h2", text: "5. Review and adjust" },
      {
        type: "p",
        text: "At the end of the month, look at which posts earned saves, shares, replies and clicks rather than only likes. Keep the themes and formats that moved you toward your goal and retire the ones that did not.",
      },
      {
        type: "p",
        text: "Treat the plan as a living document. Small monthly improvements compound far more reliably than occasional bursts of effort.",
      },
    ],
  },
  {
    slug: "on-page-seo-checklist",
    title: "An on-page SEO checklist to run before you publish",
    description:
      "Ten practical on-page SEO checks for any new page or blog post, from search intent and titles to internal links and speed.",
    date: "2026-10-08",
    category: "SEO",
    relatedServices: ["seo", "website-and-landing-pages"],
    body: [
      {
        type: "p",
        text: "On-page SEO is the part of search optimisation you fully control: how a page is written, structured and marked up. Run through this checklist before publishing any new page.",
      },
      { type: "h2", text: "Match the search intent" },
      {
        type: "p",
        text: "Search the main phrase yourself and look at what already ranks. Is the searcher trying to learn, compare, or buy? Your page should clearly serve that need rather than the one you wish they had.",
      },
      { type: "h2", text: "The ten-point checklist" },
      {
        type: "ol",
        items: [
          "One clear primary topic per page, with related phrases used naturally.",
          "A unique, descriptive title tag that leads with the topic and stays short enough to display fully in results.",
          "A meta description that accurately summarises the page and invites the click.",
          "One H1 that states what the page is about, followed by logical H2 and H3 headings.",
          "A clean, readable URL that describes the page.",
          "Helpful, original content that answers the question completely and is easy to scan.",
          "Descriptive internal links to related pages on your own site.",
          "Meaningful alt text for informative images, and properly sized image files.",
          "Fast loading and a layout that works well on mobile screens.",
          "Structured data where it fits, such as article or FAQ markup, validated before launch.",
        ],
      },
      { type: "h2", text: "Do not forget indexing basics" },
      {
        type: "p",
        text: "Make sure the page is not blocked by robots rules, has a self-referencing canonical URL and appears in your XML sitemap. After publishing, check it in Google Search Console and request indexing if needed.",
      },
      {
        type: "p",
        text: "SEO is a long game. Strong pages that genuinely help your audience, supported by a technically healthy site, are what search engines reward over time.",
      },
    ],
  },
  {
    slug: "meta-ads-campaign-basics",
    title: "Meta Ads basics: how to structure your first campaigns",
    description:
      "A beginner-friendly guide to planning Meta (Facebook and Instagram) ad campaigns: goals, audiences, creatives, tracking and testing.",
    date: "2026-10-03",
    category: "Paid Ads",
    relatedServices: ["performance-marketing", "website-and-landing-pages"],
    body: [
      {
        type: "p",
        text: "Meta advertising can reach people on Facebook and Instagram, but a messy account structure wastes budget quickly. These fundamentals help you start with a clear, testable setup.",
      },
      { type: "h2", text: "Decide what a good result means" },
      {
        type: "p",
        text: "Before building anything, define the action you want: a message on WhatsApp, a form enquiry, a purchase or a page visit. That choice determines the campaign objective and how you judge success.",
      },
      { type: "h2", text: "Set up tracking first" },
      {
        type: "p",
        text: "Install the Meta Pixel and, where possible, the Conversions API, and confirm your key events fire correctly. Without reliable tracking, optimisation is guesswork.",
      },
      { type: "h2", text: "Keep the structure simple" },
      {
        type: "ul",
        items: [
          "Start with one campaign per main objective.",
          "Use a small number of ad sets with clearly different audiences.",
          "Test several creatives within each ad set so you learn what resonates.",
        ],
      },
      { type: "h2", text: "Creative and message matter most" },
      {
        type: "p",
        text: "Your image or video and the first line of copy decide whether anyone stops to read. Lead with the customer's problem or benefit, show the offer clearly and make the next step obvious.",
      },
      { type: "h2", text: "Test one thing at a time and give it room" },
      {
        type: "p",
        text: "Change a single variable, such as the audience or the creative, and let it gather enough data before drawing conclusions. Constant edits reset learning and make results hard to interpret.",
      },
      { type: "h2", text: "Review regularly" },
      {
        type: "p",
        text: "Look beyond clicks to the cost of the action you actually care about. Pause what is not working, put more budget behind what is, and keep refreshing creative so performance does not fade.",
      },
    ],
  },
  {
    slug: "shopify-store-launch-checklist",
    title: "Shopify store launch checklist",
    description:
      "A practical pre-launch checklist for a Shopify store: products, INR pricing, payments, shipping, policies, SEO, tracking and a test order.",
    date: "2026-10-15",
    category: "Shopify",
    relatedServices: ["website-and-landing-pages", "seo", "performance-marketing"],
    body: [
      {
        type: "p",
        text: "Launching a Shopify store is more than adding products and publishing. Customers compare options quickly on their phones, so small gaps in pricing, delivery information or trust signals cost orders. Use this checklist before you go live.",
      },
      { type: "h2", text: "1. Get the product pages right" },
      {
        type: "ul",
        items: [
          "Write a clear title that says what the product is, not only the brand name.",
          "Use sharp photos from several angles, compressed so pages stay fast on mobile data.",
          "Describe sizes, materials, what is in the box and who the product is for.",
          "Add descriptive alt text to product images.",
        ],
      },
      { type: "h2", text: "2. Set prices, tax and payments" },
      {
        type: "p",
        text: "Show prices in INR and confirm with your accountant how GST should appear on prices and invoices for your business. Then decide which payment methods to offer. Shoppers commonly expect UPI and cards, and many also look for cash on delivery. Availability depends on the payment gateways that Shopify supports for your business, so check this early rather than the day before launch.",
      },
      { type: "h2", text: "3. Make shipping and delivery clear" },
      {
        type: "ul",
        items: [
          "Set shipping rates and free-shipping thresholds you can sustain.",
          "State realistic delivery times and which locations you serve.",
          "Explain how returns, refunds and exchanges work before checkout.",
        ],
      },
      { type: "h2", text: "4. Add trust pages and policies" },
      {
        type: "p",
        text: "Publish shipping, returns, privacy and terms pages, along with clear contact details and your business information. Buyers use these to decide whether a small store is safe to order from, and E-commerce consumer rules expect sellers to be transparent. Check the current requirements for your business type.",
      },
      { type: "h2", text: "5. Cover the SEO basics" },
      {
        type: "ul",
        items: [
          "Give every product and collection a unique title tag and meta description.",
          "Write short, useful collection descriptions instead of leaving them empty.",
          "Use clean, readable URLs and link related products and collections together.",
          "Submit your store's sitemap in Google Search Console after launch.",
        ],
      },
      { type: "h2", text: "6. Install tracking before you spend on ads" },
      {
        type: "p",
        text: "Set up Google Analytics and the Meta Pixel, ideally with the Conversions API, and confirm that add-to-cart, checkout and purchase events fire correctly. Running Meta Ads without reliable tracking makes optimisation guesswork.",
      },
      { type: "h2", text: "7. Make it easy to ask a question" },
      {
        type: "p",
        text: "Many buyers want to check size, stock or delivery before ordering. A visible WhatsApp chat link on product pages and in the footer gives them a fast way to ask, and gives you a direct line to customers who are close to buying.",
      },
      { type: "h2", text: "8. Place a test order" },
      {
        type: "p",
        text: "Before launch, place a real test order on a phone. Check the checkout, payment confirmation, order emails and how the store looks on a small screen. Fixing a problem now is far cheaper than fixing it after your first campaign sends traffic.",
      },
    ],
  },
  {
    slug: "click-to-whatsapp-ads-for-businesses",
    title: "Click-to-WhatsApp ads for businesses",
    description:
      "How businesses can use Click-to-WhatsApp ads on Facebook and Instagram: when they fit, how to set them up and how to measure real results.",
    date: "2026-10-14",
    category: "Paid Ads",
    relatedServices: ["performance-marketing", "website-and-landing-pages"],
    body: [
      {
        type: "p",
        text: "Many customers prefer to ask a question on WhatsApp before they buy or book. Click-to-WhatsApp ads are Meta ads on Facebook and Instagram that open a WhatsApp chat with your business when someone taps the button, instead of sending them to a website form.",
      },
      { type: "h2", text: "When Click-to-WhatsApp ads make sense" },
      {
        type: "ul",
        items: [
          "Services and high-consideration purchases where customers want to ask questions first.",
          "Local businesses that take bookings, quotes or appointments.",
          "Stores whose customers want to confirm size, stock, price or delivery before ordering.",
          "Businesses whose team can reply quickly during business hours.",
        ],
      },
      { type: "h2", text: "Set up the basics first" },
      {
        type: "ol",
        items: [
          "Use a WhatsApp Business account connected to your Facebook Page and ad account.",
          "Write a short welcome message that confirms what the person asked about.",
          "Prepare quick replies for common questions such as price, timing and location.",
          "Decide who answers, how quickly, and how leads are recorded.",
        ],
      },
      { type: "h2", text: "Qualify the conversation" },
      {
        type: "p",
        text: "A tap is not a customer. Ask two or three simple questions at the start of the chat, such as what the person needs and when, so your team spends time on genuine enquiries. Keep the tone helpful rather than pushy.",
      },
      { type: "h2", text: "Respect consent" },
      {
        type: "p",
        text: "Only send marketing messages to people who have agreed to receive them, and follow WhatsApp's business messaging policies. Someone starting a chat with you is not permission for unlimited promotional broadcasts.",
      },
      { type: "h2", text: "Measure beyond clicks" },
      {
        type: "p",
        text: "Track the cost per conversation, then the cost per qualified enquiry and, where you can, the cost per sale. Record outcomes from your WhatsApp chats so you can tell Meta Ads which campaigns bring real customers. Refresh creatives regularly and test one change at a time.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Flatten a post body to plain text (for reading time). */
export function postPlainText(post: BlogPost): string {
  return post.body
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      return b.text;
    })
    .join(" ");
}
