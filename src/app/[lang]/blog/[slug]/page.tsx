import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { blogPosts, getPost, postPlainText } from "@/content/blog";
import { getService } from "@/content/services";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";

/** Articles are written in English only; /ar/blog/<slug> returns 404 (the Arabic blog index links to the English URLs). */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ lang: "en", slug: post.slug }));
}

type Props = { params: Promise<{ lang: string; slug: string }> };

/** Must match the root layout's title template ("%s | DOCS MEDIA"). */
const TITLE_SUFFIX = " | DOCS MEDIA";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const post = lang === "en" ? getPost(slug) : undefined;
  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }
  const metadata = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    translated: false,
    publishedTime: post.date,
    modifiedTime: post.updated,
    keywords: [post.category, post.title],
  });
  // Search results cut titles at about 60 characters: drop the " | DOCS MEDIA"
  // suffix when it would push a long article title past that.
  return `${post.title}${TITLE_SUFFIX}`.length > 60
    ? { ...metadata, title: { absolute: post.title } }
    : metadata;
}

export default async function BlogPostPage(props: Props) {
  const { slug, lang } = await props.params;
  if (lang !== "en") notFound();
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = readingMinutes(postPlainText(post));
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const related = (post.relatedServices ?? [])
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s));
  const wordCount = postPlainText(post).trim().split(/\s+/).length;

  return (
    <>
      <JsonLd data={blogPostingJsonLd({ ...post, wordCount })} />
      <PageHero
        title={post.title}
        description={post.description}
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      >
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
          <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800 shadow-soft">
            {post.category}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{minutes} min read</span>
        </p>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-3xl">
          <article>
            <ArticleBody blocks={post.body} />
          </article>
          {related.length > 0 && (
            <aside aria-labelledby="related-services-title" className="mt-12">
              <h2
                id="related-services-title"
                className="font-display text-xl font-bold"
              >
                Related services
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {related.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center rounded-full border border-brand-200 bg-surface px-4 py-2 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-100"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="mt-12">
            <Link
              href="/blog"
              className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="lavender" labelledBy="more-title">
          <h2 id="more-title" className="mb-8 font-display text-2xl font-bold sm:text-3xl">
            Keep reading
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner
        title="Want help putting this into practice?"
        whatsappMessage={`Hi DOCS MEDIA, I read "${post.title}" and I'd like some help with this.`}
      />
    </>
  );
}
