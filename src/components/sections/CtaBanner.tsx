import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBanner({
  lang = "en",
  title,
  text,
  whatsappMessage,
}: {
  lang?: Locale;
  title?: string;
  text?: string;
  /** Pre-filled WhatsApp text. Pass a page-specific message so you can tell which page the lead came from. */
  whatsappMessage?: string;
}) {
  const t = getDictionary(lang);
  title ??= t.cta.title;
  text ??= t.cta.text;
  whatsappMessage ??= t.wa.form;
  return (
    <section aria-labelledby="cta-title" className="bg-tint py-16 sm:py-20">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 px-6 py-14 text-center text-white shadow-glow sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="bg-dots pointer-events-none absolute inset-0 opacity-60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-16 hidden h-80 w-52 rotate-12 bg-[url('/logo-mark.png')] bg-contain bg-no-repeat opacity-[0.1] sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-3xl"
          />
          <h2
            id="cta-title"
            className="relative mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-5xl"
          >
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">{text}</p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappLink(whatsappMessage)}
              external
              variant="light"
              size="lg"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              {t.ui.chatWhatsApp}
            </ButtonLink>
            <ButtonLink href={localePath(lang, "/contact")} variant="outline-light" size="lg">
              {t.ui.sendEnquiry}
              <Icon name="arrow-right" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
