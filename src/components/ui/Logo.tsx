import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/i18n/config";

/**
 * PLACEHOLDER brand mark: a purple rounded square with a white "D" and a
 * wordmark. The official logo file was not available when this was built.
 * To use the real logo, set `siteConfig.logo.src` in src/lib/site.ts.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="10" fill="#600a79" />
      <path d="M11 9h9a11 11 0 0 1 0 22h-9V9Z" fill="#ffffff" />
      <circle cx="21" cy="20" r="4.2" fill="#a470fb" />
    </svg>
  );
}

export function Logo({
  inverted,
  className,
  size = "md",
  lang = "en",
}: {
  lang?: Locale;
  /** White wordmark for dark backgrounds. */
  inverted?: boolean;
  className?: string;
  /** "md" for the header, "lg" for the footer. */
  size?: "md" | "lg";
}) {
  const { logo, name } = siteConfig;

  return (
    <Link
      href={localePath(lang, "/")}
      aria-label={`${name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 transition duration-300 hover:opacity-90",
        className,
      )}
    >
      {logo.src ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          priority
          className={cn(
            "w-auto drop-shadow-[0_2px_10px_rgb(0_0_0/0.18)] transition duration-300 group-hover:scale-[1.03]",
            size === "lg" ? "h-20" : "h-12 sm:h-14",
          )}
        />
      ) : (
        <>
          <LogoMark />
          <span
            className={cn(
              "whitespace-nowrap font-display text-lg font-extrabold tracking-tight",
              inverted ? "text-white" : "text-brand-950",
            )}
          >
            DOCS <span className={inverted ? "text-brand-300" : "text-brand-600"}>MEDIA</span>
          </span>
        </>
      )}
    </Link>
  );
}
