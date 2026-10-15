import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type Tone = "white" | "lavender" | "dark";

const tones: Record<Tone, string> = {
  white: "bg-tint text-ink",
  lavender: "bg-tint-2 text-ink",
  dark: "bg-brand-950 text-white",
};

export function Section({
  children,
  tone = "white",
  id,
  className,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24 py-16 sm:py-24", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  invert,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "reveal mb-10 max-w-2xl sm:mb-14",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em]",
            invert ? "text-brand-300" : "text-brand-700",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-0.5 w-7 rounded-full",
              invert
                ? "bg-gradient-to-r from-brand-300 to-fuchsia-300"
                : "bg-gradient-to-r from-brand-600 to-fuchsia-500",
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.7rem]"
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            invert ? "text-brand-100" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
