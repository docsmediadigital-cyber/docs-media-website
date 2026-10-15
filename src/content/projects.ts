/**
 * PROJECTS — add genuine work here.
 *
 * This list is intentionally empty: no client names, results or screenshots
 * are invented. The Projects page, the home-page "Selected work" strip, the
 * project detail pages and the sitemap all read from this array, so adding an
 * entry is the only step needed to publish a project.
 *
 * Only add a project (and especially a client name or metrics) once you have
 * the client's permission and the numbers are real.
 *
 * Images: drop files in /public/projects/ and reference them as
 * "/projects/my-image.jpg" with the true pixel width/height.
 *
 * Example entry (copy, uncomment and fill with real details):
 *
 * {
 *   slug: "example-project",                 // URL: /projects/example-project
 *   title: "Project title",
 *   client: "Client name",                   // optional
 *   year: 2026,                              // optional
 *   services: ["performance-marketing"],     // slugs from services.ts
 *   summary: "One or two sentences describing the project.",
 *   challenge: "What the client needed.",    // optional
 *   approach: "What you did.",               // optional
 *   outcome: "What changed.",                // optional
 *   results: [{ label: "Metric name", value: "Real value" }], // optional, real data only
 *   coverImage: { src: "/projects/example.jpg", alt: "Describe the image", width: 1600, height: 1000 },
 *   liveUrl: "https://example.com",          // optional
 *   featured: true,                          // show on the home page
 * }
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectResult = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  client?: string;
  year?: number;
  /** Service slugs from src/content/services.ts — also drive the filter chips. */
  services: string[];
  summary: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  results?: ProjectResult[];
  coverImage?: ProjectImage;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(limit = 3): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}
