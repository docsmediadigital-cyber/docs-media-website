import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getBlogPosts } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { resolveLang, type LangProps } from "@/i18n/params";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogJsonLd, buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const b = getDictionary(lang).blogPage;
  return buildMetadata({
    title: b.metaTitle,
    description: b.metaDescription,
    path: "/blog",
    keywords: b.keywords,
    lang,
  });
}

export default async function BlogPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const b = t.blogPage;
  const blogPosts = getBlogPosts(lang);

  return (
    <>
      <JsonLd data={blogJsonLd(blogPosts, lang)} />
      <PageHero
        lang={lang}
        title={b.title}
        description={b.description}
        crumbs={[{ name: b.crumb, path: "/blog" }]}
      />
      <Section>
        <h2 className="sr-only">{b.latest}</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} lang={lang} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBanner lang={lang} whatsappMessage={t.wa.blog} />
    </>
  );
}
