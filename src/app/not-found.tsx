import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-lavender py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-display text-7xl font-extrabold text-brand-700 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
          We couldn’t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          The link may be broken or the page may have moved. Let’s get you back on
          track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">
            Our services
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
