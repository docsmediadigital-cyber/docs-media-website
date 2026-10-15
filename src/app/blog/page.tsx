import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { blogPosts } from "@/content/blog";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing Blog for Indian Businesses",
  description:
    "Practical guides on Meta Ads, SEO, Shopify, website development and social media for Indian businesses, from the DOCS MEDIA team.",
  path: "/blog",
  keywords: ["digital marketing blog India", "Meta Ads guide", "Shopify guide"],
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogJsonLd(blogPosts)} />
      <PageHero
        title="Digital marketing insights"
        description="Practical, jargon-free guides on Meta Ads, SEO, Shopify, websites and social media for growing your brand online in India."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <Section>
        <h2 className="sr-only">Latest articles</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBanner whatsappMessage="Hi DOCS MEDIA, I read your blog and I'd like some marketing advice for my business." />
    </>
  );
}
