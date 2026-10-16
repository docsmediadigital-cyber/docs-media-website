"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

type Filter = { slug: string; label: string };

/**
 * Filterable project grid. `filters` are the service categories actually used
 * by the projects passed in; the "All" chip is added automatically and the
 * chip row is hidden when there is nothing to filter.
 */
export function ProjectGrid({
  projects,
  filters,
  lang = "en",
}: {
  projects: Project[];
  filters: Filter[];
  lang?: Locale;
}) {
  const t = getDictionary(lang).project;
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.services.includes(active)),
    [active, projects],
  );

  const chip = (slug: string, label: string) => (
    <button
      key={slug}
      type="button"
      onClick={() => setActive(slug)}
      aria-pressed={active === slug}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition",
        active === slug
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-brand-200 bg-surface text-brand-800 hover:border-brand-400 hover:bg-brand-100",
      )}
    >
      {label}
    </button>
  );

  return (
    <div>
      {filters.length > 1 && (
        <div
          role="group"
          aria-label="Filter projects by service"
          className="mb-10 flex flex-wrap gap-2"
        >
          {chip("all", t.filterAll)}
          {filters.map((f) => chip(f.slug, f.label))}
        </div>
      )}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((project) => (
          <li key={project.slug} className="relative">
            <ProjectCard project={project} lang={lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}
