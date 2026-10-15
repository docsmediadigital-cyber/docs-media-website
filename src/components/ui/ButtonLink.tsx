import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "whatsapp";
type Size = "md" | "lg";

const base =
  "btn-shine inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-offset-4 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white shadow-soft hover:shadow-lift",
  secondary:
    "border border-brand-200 bg-surface text-brand-800 hover:border-brand-400 hover:bg-brand-100",
  light: "bg-surface text-brand-800 shadow-soft hover:bg-brand-100 hover:shadow-glow",
  "outline-light":
    "border border-white/40 bg-white/5 text-white backdrop-blur hover:border-white hover:bg-white/15",
  whatsapp: "bg-[#128c4a] text-white shadow-soft hover:bg-[#0e7a40]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Open in a new tab (used for WhatsApp and other external links). */
  external?: boolean;
  ariaLabel?: string;
};

/** Link styled as a button. Uses next/link for internal paths, <a> for external. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  ariaLabel,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external || /^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
