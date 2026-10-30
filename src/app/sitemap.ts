import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { projects } from "@/content/projects";
import { locationPages } from "@/content/locations";
import { localePath } from "@/i18n/config";
import { CONTENT_LAST_UPDATED, staticRoutes } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * XML sitemap generated from site config + content files, so new blog posts and
 * projects appear automatically. Every translated page is listed in English and
 * Arabic with hreflang alternates. Blog articles and local pages are English-only.
 * URLs use NEXT_PUBLIC_SITE_URL.
 */
function bilingual(path: string) {
  const en = absoluteUrl(localePath("en", path));
  const ar = absoluteUrl(localePath("ar", path));
  const alternates = { languages: { "en": en, ar, "x-default": en } };
  return { en, ar, alternates };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // blogPosts is sorted newest-first, so the blog index changes when the newest post does.
  const blogLastModified = blogPosts[0]?.updated ?? blogPosts[0]?.date ?? CONTENT_LAST_UPDATED;

  const pages: MetadataRoute.Sitemap = staticRoutes.flatMap((route) => {
    const { en, ar, alternates } = bilingual(route.path);
    const base = {
      lastModified: route.path === "/blog" ? blogLastModified : CONTENT_LAST_UPDATED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    };
    return [
      { url: en, ...base },
      { url: ar, ...base },
    ];
  });

  const local: MetadataRoute.Sitemap = locationPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const work: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const { en, ar, alternates } = bilingual(`/projects/${project.slug}`);
    const base = {
      lastModified: CONTENT_LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates,
    };
    return [
      { url: en, ...base },
      { url: ar, ...base },
    ];
  });

  return [...pages, ...local, ...posts, ...work];
}
