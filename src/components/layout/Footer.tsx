import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { mapsUrl, navLinks, siteConfig } from "@/lib/site";
import { getServices } from "@/content/localized";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";
import { socialEntries, whatsappLink } from "@/lib/utils";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
};

export function Footer({ lang }: { lang: Locale }) {
  const socials = socialEntries();
  const t = getDictionary(lang);
  const services = getServices(lang);

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand-700/30 blur-3xl"
      />
      <Container className="relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo inverted size="lg" lang={lang} />
          <div
            aria-hidden="true"
            className="mt-5 h-0.5 w-14 rounded-full bg-gradient-to-r from-brand-300 to-fuchsia-400"
          />
          <p className="mt-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            {t.footer.strap}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-200">
            {t.description}
          </p>
        </div>

        <nav aria-label={t.ui.footerNav}>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {t.footer.explore}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={localePath(lang, link.href)} className="text-brand-200 transition hover:translate-x-0.5 hover:text-white rtl:hover:-translate-x-0.5">
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {t.footer.services}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={localePath(lang, s.href ?? `/services#${s.slug}`)}
                  className="text-brand-200 transition hover:translate-x-0.5 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {t.footer.getInTouch}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-200 transition hover:translate-x-0.5 hover:text-white"
              >
                {t.footer.whatsapp}: <span dir="ltr">{siteConfig.whatsapp.display}</span>
              </a>
            </li>
            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-200 transition hover:text-white"
              >
                <span className="font-semibold text-white">{t.footer.visit}:</span>{" "}
                <span dir="ltr" lang="en" className="inline-block">
                  {siteConfig.address.lines.join(", ")}
                </span>
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-brand-200 transition hover:translate-x-0.5 hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            )}
            <li>
              <Link href={localePath(lang, "/contact")} className="text-brand-200 transition hover:translate-x-0.5 hover:text-white rtl:hover:-translate-x-0.5">
                {t.ui.sendEnquiry}
              </Link>
            </li>
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-brand-200 transition hover:translate-x-0.5 hover:text-white"
                >
                  {socialLabels[s.key] ?? s.key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 pb-24 pt-6 text-xs text-brand-300 sm:flex-row sm:pb-6 sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <p>{t.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
