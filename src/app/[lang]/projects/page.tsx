import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { projects } from "@/content/projects";
import { getLocalizedService } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { resolveLang, type LangProps } from "@/i18n/params";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, collectionPageJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const lang = await resolveLang(params);
  const pp = getDictionary(lang).projectsPage;
  return buildMetadata({
    title: pp.metaTitle,
    description: projects.length ? pp.metaDescriptionFilled : pp.metaDescriptionEmpty,
    path: "/projects",
    keywords: pp.keywords,
    lang,
  });
}

export default async function ProjectsPage({ params }: LangProps) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const pp = t.projectsPage;
  const pageDescription = projects.length ? pp.metaDescriptionFilled : pp.metaDescriptionEmpty;
  // Filter chips = only the service categories that real projects use.
  const used = Array.from(new Set(projects.flatMap((p) => p.services)));
  const filters = used
    .map((slug) => ({ slug, label: getLocalizedService(lang, slug)?.title }))
    .filter((f): f is { slug: string; label: string } => Boolean(f.label));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: pp.schemaName,
          description: pageDescription,
          path: "/projects",
          itemPaths: projects.map((p) => `/projects/${p.slug}`),
          lang,
        })}
      />
      <PageHero
        lang={lang}
        title={pp.title}
        description={projects.length ? pp.descriptionFilled : pp.descriptionEmpty}
        crumbs={[{ name: pp.crumb, path: "/projects" }]}
      />
      <Section>
        {projects.length > 0 ? (
          <>
            <h2 className="sr-only">{pp.all}</h2>
            <ProjectGrid projects={projects} filters={filters} lang={lang} />
          </>
        ) : (
          <EmptyProjects lang={lang} />
        )}
      </Section>
      <CtaBanner
        lang={lang}
        title={pp.ctaTitle}
        text={pp.ctaText}
        whatsappMessage={t.wa.projects}
      />
    </>
  );
}
