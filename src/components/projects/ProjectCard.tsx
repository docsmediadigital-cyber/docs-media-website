import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getLocalizedService } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";
import type { Project } from "@/content/projects";

/**
 * Reusable portfolio card. Renders a cover image when provided, otherwise a
 * neutral branded placeholder — never invented imagery.
 */
export function ProjectCard({ project, lang = "en" }: { project: Project; lang?: Locale }) {
  const t = getDictionary(lang).project;
  const serviceTitles = project.services
    .map((slug) => getLocalizedService(lang, slug)?.title)
    .filter((t): t is string => Boolean(t));

  return (
    <article className="group card-ring reveal relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-200 bg-surface shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link
        href={localePath(lang, `/projects/${project.slug}`)}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200"
        tabIndex={-1}
        aria-hidden="true"
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            width={project.coverImage.width}
            height={project.coverImage.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-brand-500">
            <Icon name="sparkle" className="h-12 w-12" />
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {serviceTitles.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2" aria-label={t.servicesProvided}>
            {serviceTitles.map((t) => (
              <li
                key={t}
                className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        <h3 className="font-display text-xl font-bold">
          <Link
            href={localePath(lang, `/projects/${project.slug}`)}
            className="after:absolute after:inset-0 hover:text-brand-700"
          >
            {project.title}
          </Link>
        </h3>
        {(project.client || project.year) && (
          <p className="mt-1 text-sm text-ink-soft">
            {[project.client, project.year].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{project.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          {t.viewProject}
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
