import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { projects } from "@/content/projects";
import { getService } from "@/content/services";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, collectionPageJsonLd } from "@/lib/seo";

const pageDescription = projects.length
  ? "Digital marketing, Meta Ads, SEO, website and Shopify projects from DOCS MEDIA, with the thinking behind each one."
  : "DOCS MEDIA is preparing case studies from its digital marketing, website and Shopify work. Talk to us on WhatsApp about your project.";

export const metadata: Metadata = buildMetadata({
  title: "Projects & Case Studies: Marketing & Shopify",
  description: pageDescription,
  path: "/projects",
  keywords: ["digital marketing case studies", "Shopify projects", "website portfolio"],
});

export default function ProjectsPage() {
  // Filter chips = only the service categories that real projects use.
  const used = Array.from(new Set(projects.flatMap((p) => p.services)));
  const filters = used
    .map((slug) => ({ slug, label: getService(slug)?.title }))
    .filter((f): f is { slug: string; label: string } => Boolean(f.label));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: "DOCS MEDIA projects and case studies",
          description: pageDescription,
          path: "/projects",
          itemPaths: projects.map((p) => `/projects/${p.slug}`),
        })}
      />
      <PageHero
        title="Projects & case studies"
        description={
          projects.length
            ? "A selection of our work and the thinking behind it."
            : "Our showcase is being prepared. Genuine projects will appear here as they are published."
        }
        crumbs={[{ name: "Projects", path: "/projects" }]}
      />
      <Section>
        {projects.length > 0 ? (
          <>
            <h2 className="sr-only">All projects</h2>
            <ProjectGrid projects={projects} filters={filters} />
          </>
        ) : (
          <EmptyProjects />
        )}
      </Section>
      <CtaBanner
        title="Have a project in mind?"
        text="Tell us what you are working on and we will help you plan it."
        whatsappMessage="Hi DOCS MEDIA, I saw your Projects page and I have a project in mind."
      />
    </>
  );
}
