import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

/** Inner-page header: breadcrumbs (+ BreadcrumbList JSON-LD), H1 and intro. */
export function PageHero({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description?: string;
  /** Trail after "Home", ending with the current page. */
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <div className="relative overflow-hidden border-b border-brand-200 bg-lavender">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-dots-light pointer-events-none absolute inset-0"
      />
      <Container className="relative py-14 sm:py-20">
        <JsonLd data={breadcrumbJsonLd(trail)} />
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="font-medium text-brand-800">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link href={c.path} className="hover:text-brand-700">
                        {c.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="rise max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="rise rise-2 mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </div>
  );
}
