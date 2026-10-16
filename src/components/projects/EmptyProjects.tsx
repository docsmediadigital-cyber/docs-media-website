import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";

/** Honest empty state shown until real projects are added to src/content/projects.ts. */
export function EmptyProjects({ compact, lang = "en" }: { compact?: boolean; lang?: Locale }) {
  const t = getDictionary(lang).empty;
  const wa = getDictionary(lang).wa;
  // On the Projects page the H1 is directly above, so this is an H2; on the
  // home page it sits under the "Selected work" H2, so it is an H3.
  const Heading = compact ? "h3" : "h2";
  return (
    <div
      className={
        compact
          ? "rounded-3xl border border-dashed border-brand-300 bg-surface p-8 text-center sm:p-10"
          : "rounded-3xl border border-dashed border-brand-300 bg-surface p-10 text-center sm:p-16"
      }
    >
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon name="sparkle" className="h-7 w-7" />
      </span>
      <Heading className="mt-5 font-display text-2xl font-bold">
        {t.title}
      </Heading>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">
        {t.before}{" "}
        <Link
          href={localePath(lang, "/services")}
          className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
        >
          {t.servicesLink}
        </Link>
        {t.mid}{" "}
        <Link
          href={localePath(lang, "/blog")}
          className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
        >
          {t.guidesLink}
        </Link>
        {t.after}
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={localePath(lang, "/contact")}>
          {t.start}
          <Icon name="arrow-right" className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink
          href={whatsappLink(wa.projectsEmpty)}
          external
          variant="secondary"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          {t.whatsappUs}
        </ButtonLink>
      </div>
    </div>
  );
}
