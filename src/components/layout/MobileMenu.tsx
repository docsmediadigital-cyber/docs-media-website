"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { whatsappLink, cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/** Hamburger + full-width dropdown panel for screens below `lg`. */
export function MobileMenu({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const home = localePath(lang, "/");
  const pathname = usePathname();
  const panelId = useId();

  // The menu is "open" only for the page it was opened on, so any navigation
  // (link click, back/forward) closes it without needing an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  // Close with Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAt(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
      >
        <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-brand-200 bg-surface px-5 pb-6 pt-3 shadow-lift",
        )}
      >
        <nav aria-label={t.ui.mobileNav}>
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const href = localePath(lang, link.href);
              const active =
                href === home
                  ? pathname === home
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3 py-3.5 text-base font-medium",
                      active
                        ? "bg-brand-50 text-brand-800"
                        : "text-ink hover:bg-brand-100",
                    )}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href={whatsappLink(t.wa.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#128c4a] px-5 py-3.5 text-base font-semibold text-white"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          {t.ui.chatWhatsApp}
        </a>
        <p className="mt-3 text-center text-sm text-ink-soft">
          {siteConfig.whatsapp.display}
        </p>
      </div>
    </div>
  );
}
