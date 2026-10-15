"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with current-page highlighting. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition xl:px-3.5",
              link.xlOnly && "hidden xl:inline-block",
              active
                ? "bg-white/15 text-white"
                : "text-brand-100 hover:bg-white/10 hover:text-white",
            )}
          >
            {link.shortLabel ?? link.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Static fallback shown while the pathname resolves (no highlighting). */
export function NavLinksFallback() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "rounded-full px-3 py-2 text-sm font-medium text-brand-100 hover:bg-white/10 hover:text-white xl:px-3.5",
            link.xlOnly && "hidden xl:inline-block",
          )}
        >
          {link.shortLabel ?? link.label}
        </Link>
      ))}
    </nav>
  );
}
