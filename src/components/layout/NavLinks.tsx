"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string, home: string): boolean {
  if (href === home) return pathname === home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function label(lang: Locale, key: (typeof navLinks)[number]["key"]) {
  const t = getDictionary(lang);
  return (t.navShort as Record<string, string>)[key] ?? t.nav[key];
}

/** Desktop navigation with current-page highlighting. */
export function NavLinks({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const home = localePath(lang, "/");

  return (
    <nav
      aria-label={getDictionary(lang).ui.primaryNav}
      className="hidden items-center gap-1 lg:flex"
    >
      {navLinks.map((link) => {
        const href = localePath(lang, link.href);
        const active = isActive(pathname, href, home);
        return (
          <Link
            key={link.href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition xl:px-3.5",
              link.xlOnly && "hidden xl:inline-block",
              active
                ? "bg-white/15 text-white"
                : "text-brand-100 hover:bg-white/10 hover:text-white",
            )}
          >
            {label(lang, link.key)}
          </Link>
        );
      })}
    </nav>
  );
}

/** Static fallback shown while the pathname resolves (no highlighting). */
export function NavLinksFallback({ lang }: { lang: Locale }) {
  return (
    <nav
      aria-label={getDictionary(lang).ui.primaryNav}
      className="hidden items-center gap-1 lg:flex"
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={localePath(lang, link.href)}
          className={cn(
            "rounded-full px-3 py-2 text-sm font-medium text-brand-100 hover:bg-white/10 hover:text-white xl:px-3.5",
            link.xlOnly && "hidden xl:inline-block",
          )}
        >
          {label(lang, link.key)}
        </Link>
      ))}
    </nav>
  );
}
