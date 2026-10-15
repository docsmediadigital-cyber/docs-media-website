import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatDate, readingMinutes } from "@/lib/utils";
import { postPlainText, type BlogPost } from "@/content/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const minutes = readingMinutes(postPlainText(post));

  return (
    <article className="group card-ring reveal relative flex h-full flex-col rounded-3xl border border-brand-200 bg-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-brand-700">
        <span className="rounded-full bg-brand-50 px-3 py-1">{post.category}</span>
        <span className="text-ink-soft normal-case tracking-normal">
          {minutes} min read
        </span>
      </p>
      <h3 className="mt-4 font-display text-xl font-bold leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 hover:text-brand-700"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{post.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <time dateTime={post.date} className="text-ink-soft">
          {formatDate(post.date)}
        </time>
        <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
          Read
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
