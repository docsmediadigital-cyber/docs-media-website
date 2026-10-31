import { NextResponse, type NextRequest } from "next/server";
import { blogPosts } from "@/content/blog";
import { projects } from "@/content/projects";
import { locationPaths } from "@/content/location-paths";

/**
 * Language routing + real 404s.
 *
 *  - English lives at the plain URLs (/about) and Arabic under /ar (/ar/about).
 *    Files are routed as app/[lang]/..., so English requests are rewritten to
 *    /en/... internally. A direct /en/... request is redirected to the plain URL
 *    so each page has one canonical address.
 *  - Blog and project URLs whose slug does not exist get a real HTTP 404 (not a
 *    streamed 200 + noindex "soft 404"). Blog articles and the local landing pages
 *    exist in English only, so /ar/blog/<slug> and /ar/<local page> are also 404s.
 */
const blogSlugs = new Set(blogPosts.map((p) => p.slug));
const projectSlugs = new Set(projects.map((p) => p.slug));

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const first = pathname.split("/")[1];

  // /en/about → /about (one canonical URL per page)
  if (first === "en") {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const lang = first === "ar" ? "ar" : "en";
  const rest = lang === "ar" ? pathname.slice(3) || "/" : pathname;
  const [, section, slug] = rest.split("/");

  const isMissing =
    (section === "blog" && slug && !(lang === "en" && blogSlugs.has(slug))) ||
    (section === "projects" && slug && !projectSlugs.has(slug)) ||
    (lang === "ar" && locationPaths.has(rest));

  if (isMissing) {
    // No route matches, so the [lang]/[...rest] page renders the 404 with a 404 status.
    url.pathname = `/${lang}/__not-found__`;
    return NextResponse.rewrite(url);
  }

  if (lang === "ar") return NextResponse.next();

  url.pathname = `/en${rest === "/" ? "" : rest}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except API routes, Next internals, files with an extension
  // (robots.txt, sitemap.xml, images) and the metadata image routes.
  matcher: ["/((?!api|_next|_vercel|.*\\..*|icon|apple-icon|opengraph-image|twitter-image).*)"],
};
