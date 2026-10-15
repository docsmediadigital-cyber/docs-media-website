import { NextResponse, type NextRequest } from "next/server";
import { blogPosts } from "@/content/blog";
import { projects } from "@/content/projects";

/**
 * Return a real HTTP 404 (not a streamed 200 + noindex "soft 404") for blog
 * and project URLs whose slug does not exist. Pages themselves still call
 * notFound() as a second line of defence.
 */
const blogSlugs = new Set(blogPosts.map((p) => p.slug));
const projectSlugs = new Set(projects.map((p) => p.slug));

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");

  const known =
    (section === "blog" && blogSlugs.has(slug)) ||
    (section === "projects" && projectSlugs.has(slug));

  if (known) return NextResponse.next();

  // No route matches this path, so the app renders src/app/not-found.tsx with a 404 status.
  return NextResponse.rewrite(new URL("/__not-found__", request.url));
}

export const config = {
  matcher: ["/blog/:slug", "/projects/:slug"],
};
