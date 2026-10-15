import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { NavLinks, NavLinksFallback } from "@/components/layout/NavLinks";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { whatsappLink } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-700 shadow-[0_8px_30px_-12px_rgb(37_3_48/0.6)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent"
      />
      <div className="relative mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <Suspense fallback={<NavLinksFallback />}>
          <NavLinks />
        </Suspense>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink
              href={whatsappLink("Hi DOCS MEDIA, I'd like to know more about your services.")}
              external
              variant="light"
              className="whitespace-nowrap"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp us
            </ButtonLink>
          </div>
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
