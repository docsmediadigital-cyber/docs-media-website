import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/content/services";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";

/** Compact service card for the home page and listings. */
export function ServiceCard({ service, lang = "en" }: { service: Service; lang?: Locale }) {
  const t = getDictionary(lang);
  return (
    <Link
      href={localePath(lang, service.href ?? `/services#${service.slug}`)}
      className="group card-ring reveal flex h-full flex-col rounded-3xl border border-brand-200 bg-surface p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-fuchsia-500 text-white shadow-lift">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold">{service.title}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        {t.ui.learnMore}
        <Icon
          name="arrow-right"
          className="h-4 w-4 transition group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
        />
      </span>
    </Link>
  );
}
