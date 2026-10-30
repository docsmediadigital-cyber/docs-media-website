import { blogPosts } from "@/content/blog";
import { focusPages } from "@/content/focus-pages";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * /llms.txt (https://llmstxt.org): a plain-Markdown site summary for AI search
 * and answer engines. Generated from the content files so it never drifts.
 */
export function GET() {
  const a = siteConfig.address;
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Based at ${a.streetAddress}, ${a.area}, ${a.locality}, ${a.region} ${a.postalCode}, India. Enquiries on WhatsApp: ${siteConfig.whatsapp.display} (${siteConfig.whatsapp.url}). The site is available in English and Arabic (${absoluteUrl("/ar")}).`,
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [About](${absoluteUrl("/about")})`,
    `- [Services](${absoluteUrl("/services")}): all services in one place`,
    ...focusPages.map((p) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.metaDescription}`),
    `- [Projects](${absoluteUrl("/projects")})`,
    `- [FAQs](${absoluteUrl("/faqs")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
    "## Services",
    "",
    ...services.map(
      (s) => `- [${s.title}](${absoluteUrl(s.href ?? `/services#${s.slug}`)}): ${s.summary}`,
    ),
    "",
    "## Blog",
    "",
    ...blogPosts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
