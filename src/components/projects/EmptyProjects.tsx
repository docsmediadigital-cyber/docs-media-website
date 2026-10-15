import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/utils";

/** Honest empty state shown until real projects are added to src/content/projects.ts. */
export function EmptyProjects({ compact }: { compact?: boolean }) {
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
        Our project showcase is on the way
      </Heading>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">
        We are preparing case studies to share here. In the meantime, explore our{" "}
        <Link
          href="/services"
          className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
        >
          digital marketing and website services
        </Link>
        , read our{" "}
        <Link
          href="/blog"
          className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
        >
          marketing guides
        </Link>
        , or tell us about your project and we will talk through how we could help.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/contact">
          Start a conversation
          <Icon name="arrow-right" className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink
          href={whatsappLink(
            "Hi DOCS MEDIA, I saw your Projects page and I'd like to discuss a project.",
          )}
          external
          variant="secondary"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          WhatsApp us
        </ButtonLink>
      </div>
    </div>
  );
}
