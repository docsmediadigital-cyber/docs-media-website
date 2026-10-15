import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { projects } from "@/content/projects";
import { CONTENT_LAST_UPDATED, staticRoutes } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * XML sitemap generated from site config + content files, so new blog posts and
 * projects appear automatically. URLs use NEXT_PUBLIC_SITE_URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // blogPosts is sorted newest-first, so the blog index changes when the newest post does.
  const blogLastModified = blogPosts[0]?.updated ?? blogPosts[0]?.date ?? CONTENT_LAST_UPDATED;

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.path === "/blog" ? blogLastModified : CONTENT_LAST_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const work: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts, ...work];
}
