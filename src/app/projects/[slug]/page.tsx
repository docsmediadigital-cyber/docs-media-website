import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, projectJsonLd } from "@/lib/seo";

/**
 * Cache Components requires at least one param to prerender the route. While
 * no real projects exist we return a sentinel slug that resolves to a 404, so
 * the build passes and no fake project is ever published.
 */
export function generateStaticParams() {
  return projects.length
    ? projects.map((p) => ({ slug: p.slug }))
    : [{ slug: "_" }];
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const serviceTitles = project.services
    .map((s) => getService(s)?.title)
    .filter((t): t is string => Boolean(t));

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <PageHero
        title={project.title}
        description={project.summary}
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          {serviceTitles.map((t) => (
            <span
              key={t}
              className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-brand-800 shadow-soft"
            >
              {t}
            </span>
          ))}
          {(project.client || project.year) && (
            <span className="text-sm text-ink-soft">
              {[project.client, project.year].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-4xl space-y-12">
          {project.coverImage && (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              width={project.coverImage.width}
              height={project.coverImage.height}
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="w-full rounded-3xl border border-brand-200 object-cover shadow-soft"
            />
          )}

          {project.results && project.results.length > 0 && (
            <dl className="grid gap-4 sm:grid-cols-3">
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="rounded-2xl border border-brand-200 bg-lavender p-6"
                >
                  <dd className="font-display text-3xl font-extrabold text-brand-700">
                    {r.value}
                  </dd>
                  <dt className="mt-1 text-sm text-ink-soft">{r.label}</dt>
                </div>
              ))}
            </dl>
          )}

          {(
            [
              ["The challenge", project.challenge],
              ["Our approach", project.approach],
              ["The outcome", project.outcome],
            ] as const
          ).map(
            ([heading, text]) =>
              text && (
                <div key={heading}>
                  <h2 className="font-display text-2xl font-bold">{heading}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{text}</p>
                </div>
              ),
          )}

          {project.liveUrl && (
            <ButtonLink href={project.liveUrl} external variant="secondary">
              Visit live project
              <Icon name="external" className="h-4 w-4" />
            </ButtonLink>
          )}
        </div>
      </Section>

      <CtaBanner
        whatsappMessage={`Hi DOCS MEDIA, I saw your "${project.title}" project and I'd like to discuss something similar.`}
      />
    </>
  );
}
