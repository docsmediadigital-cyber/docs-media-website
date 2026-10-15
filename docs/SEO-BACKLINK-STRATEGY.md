# DOCS MEDIA: Backlink Strategy (India)

**Goal:** earn a small number of relevant, genuine links that make DOCS MEDIA easier to find and trust for Indian businesses searching for digital marketing, Meta Ads, website development and Shopify help.

**Principle:** quality and relevance over volume. Ten links from real, relevant sites beat 500 directory submissions. Never buy links, join link exchanges or use link networks (see "What to avoid").

> **Verify before you act.** The sites below are examples of the *type* of place worth pursuing. Eligibility, fees, contributor rules and even whether a site still exists change often. Check each one's current guidelines before applying, and skip any that look spammy or irrelevant.

---

## 0. Before you build links (week 1)

Links point at pages. Make sure those pages are ready first.

1. **Set `NEXT_PUBLIC_SITE_URL`** to the final domain and rebuild, so canonicals, sitemap and schema use the real URL.
2. **Verify the site** in Google Search Console and Bing Webmaster Tools (tokens go in `.env.local`), then submit `/sitemap.xml`.
3. **Decide one canonical business identity** and reuse it everywhere (NAP consistency):
   - Name: `DOCS MEDIA` (exactly as written on the site)
   - Phone/WhatsApp: `+91 77363 32903`
   - Website: the final `https://` domain, same version (www or non-www) everywhere
   - Address: add a real one only if you have a business premises you are happy to publish
4. **Create real social profiles** (LinkedIn, Facebook, Instagram, YouTube), then add their URLs to `siteConfig.socials` in `src/lib/site.ts`. They flow into the schema `sameAs` automatically.
5. **Publish genuine case studies** in `src/content/projects.ts` (with client permission). Real case studies are the strongest link magnet an agency has; the Projects page is currently empty.

---

## 1. Genuine business listings (weeks 1–3)

These are "citations": mostly nofollow or low-weight, but they confirm your business is real, build trust signals and can bring direct enquiries. Do them carefully and consistently, not in bulk.

| Priority | Listing | Why it is worth it |
| --- | --- | --- |
| High | **Google Business Profile** | Local visibility and the Maps panel. Requires verification and a genuine business location or service area. |
| High | **Bing Places** and **Apple Business Connect** | Free, quick, improves coverage beyond Google. |
| High | **LinkedIn Company Page** | Often ranks for the brand name; useful for B2B credibility. |
| Medium | **JustDial**, **Sulekha** | Indian consumer/SMB discovery. Free basic listings exist; ignore paid upsell calls unless you decide they are worth it. |
| Medium | **IndiaMART**, **TradeIndia** | Only if you actively want B2B leads from these platforms. |
| Medium | **Clutch**, **GoodFirms**, **DesignRush**, **Sortlist** | Agency directories. Reviews from *real clients* are what make these valuable. |
| As eligible | **Shopify Partners / Shopify Experts** | Highly relevant for Shopify work. Has its own eligibility rules; apply only if you qualify. |
| As eligible | **Meta Business Partners** | Requires meeting Meta's program criteria. Do not claim partner status you do not hold. |
| Low | **Crunchbase** | A brand profile that frequently ranks for the company name. |

**Rules:** use identical name/phone/URL on every listing, write a unique description (do not paste the same text everywhere), choose accurate categories, and never create fake reviews or ask friends to review a service they did not use.

---

## 2. Relevant industry and community links (weeks 2–8)

- **Local chamber of commerce and business associations** in your city or state. Membership pages often link to members' sites.
- **Industry bodies** relevant to digital and internet businesses in India (for example, IAMAI-type associations). Join only if membership is genuine and affordable.
- **Startup and MSME ecosystems:** incubators, accelerators, co-working spaces and local startup communities often list the businesses they host or support.
- **Event and meetup pages:** if you speak at or sponsor a genuine marketing, e-commerce or startup event, ask for a speaker or sponsor page link.
- **Technology and partner pages:** if you use or integrate with tools (e-commerce apps, CRMs, WhatsApp Business solution providers) that publish partner or agency directories, apply where you genuinely qualify.

---

## 3. Quality guest posts (weeks 3–12)

Guest posting is fine when the article is genuinely useful to that site's readers and the link is editorial. It becomes a problem when it is paid, mass-produced or off-topic.

**Where to look**
- Indian business and startup publications that accept community or contributor articles (for example YourStory- or Inc42-style sites, and small-business or e-commerce blogs).
- Blogs from Shopify app makers, payment/shipping providers and e-commerce tools that welcome agency expertise.
- Regional business media and industry newsletters in your city or state.
- Global marketing blogs that accept practitioner contributions, where your India angle is genuinely useful.

**Vetting checklist (skip the site if any answer is "no")**
- Does it publish real articles for a real audience, with a visible editorial standard?
- Is it on-topic (marketing, e-commerce, small business, startups)?
- Does it avoid "write for us / casino / loans / pharma / crypto" style link-selling pages?
- Does it show genuine traffic or readership (not just a high "DA" score)?
- Is there no payment required for the link? If money changes hands, the link must be marked `rel="sponsored"` and it is advertising, not a backlink strategy.

**Topic ideas where you have real expertise** (these also match the blog posts already on the site)
- Shopify store launch checklist for Indian businesses (payments, GST display, shipping, trust pages)
- Click-to-WhatsApp ads: setup, qualification and measurement
- Meta Ads tracking: Pixel and Conversions API basics for small businesses
- Local SEO basics for Indian service businesses
- Why a mobile-first website matters for Indian customers

**Link rules**
- One or two links per article: one to a relevant guide/service page on your site, optionally one to the homepage in the author bio.
- Use natural anchor text (page topic, brand name, or the page title), never the same exact-match keyword repeatedly.
- Give each guest article original content. Never republish the same piece on several sites.

---

## 4. Links you earn by being useful (ongoing)

- **Original, India-specific resources:** a Meta Ads budget calculator, a Shopify launch checklist PDF, a short survey of small-business owners (only with real data). Useful assets get cited.
- **Case studies and results:** with permission and real numbers. Ask the client to link back from their site or press page if they are happy to.
- **Client and partner mentions:** after a project, ask a happy client whether they would add a "Website by DOCS MEDIA" or a testimonial link. Keep it voluntary and use a normal, non-deceptive link.
- **Expert quotes:** answer journalist and expert-source requests on topics you genuinely know (platforms like Featured or Qwoted; check which are active for Indian topics). Quote only what you can stand behind.
- **Unlinked mentions:** search for your brand name occasionally; when a site mentions you without linking, politely ask for a link.
- **Broken-link outreach:** find broken links on relevant resource pages and, if your content is a genuine replacement, tell the owner.

---

## 5. What to avoid (these can trigger penalties)

- Buying links, or paying for "guaranteed DA 50 backlinks" packages
- Private blog networks (PBNs), link farms, expired-domain link schemes
- Link exchanges ("link to me and I'll link to you") at scale
- Mass directory, profile, forum-signature or blog-comment submissions
- Auto-generated or spun guest posts; irrelevant sites in other niches or languages
- Exact-match keyword anchors repeated across many links
- Fake reviews, fake case studies or claims of partnerships you do not have
- Sitewide footer or sidebar links on sites you do not control

Google's spam policies treat paid or manipulative links as violations. If a link is paid or exchanged for value, mark it `rel="sponsored"`. Because the risk is real, a slower, cleaner profile is better than a fast, risky one.

---

## 6. 90-day plan (realistic targets)

| Weeks | Focus | Target |
| --- | --- | --- |
| 1 | Foundations: domain, Search Console, Bing, NAP, social profiles | Site verified, sitemap submitted |
| 1–3 | Core listings: GBP, Bing Places, Apple, LinkedIn, 2–3 relevant directories | 6–8 genuine listings |
| 2–6 | Publish 2 case studies + 1 original resource; join 1–2 local/industry bodies | 2–3 relevant links |
| 4–12 | 2–3 high-quality guest articles on vetted sites; 1–2 expert-quote contributions | 3–5 editorial links |
| 8–12 | Ask satisfied clients for testimonials/links; reclaim unlinked mentions | 1–3 links |

A healthy first quarter is roughly **10–20 genuine links and listings in total**, not hundreds. Results in rankings usually take months, not weeks.

---

## 7. Tracking and hygiene

Keep a simple sheet with these columns: *site, URL of your link, type (listing / guest post / mention / partner), date, anchor text, followed or nofollow, contact, status, notes*.

- Review **Search Console > Links** monthly. A free tool such as Ahrefs Webmaster Tools can also show new and lost backlinks.
- Watch for sudden spammy links pointing at you. Ignore low-value ones; only use Google's disavow tool if you have a real, large pattern of manipulative links that you or a previous vendor created.
- Re-check listings every six months so name, phone and URL stay identical.

---

## 8. Outreach template (guest article)

> Subject: Article idea for [Site]: [specific topic]
>
> Hi [Name],
>
> I read your piece on [specific article] and found [one specific thing]. I run DOCS MEDIA, a digital marketing agency working with Indian businesses on Meta Ads, websites and Shopify.
>
> I would like to offer your readers a practical article: **"[working title]"**. It would cover [3 bullet points]. It would be original, unpublished elsewhere, and based on what we see working with small businesses.
>
> If it is a fit, I can send an outline first. Happy to follow your guidelines.
>
> Thanks,
> [Name], DOCS MEDIA, [website]

Keep it short, specific and human. Never send the identical message to dozens of sites.
