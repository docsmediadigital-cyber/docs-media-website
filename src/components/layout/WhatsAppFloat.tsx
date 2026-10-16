import { Icon } from "@/components/ui/Icon";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { whatsappLink } from "@/lib/utils";

/** Floating click-to-chat button, fixed to the bottom corner (right in English, left in Arabic). */
export function WhatsAppFloat({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <a
      href={whatsappLink(t.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.ui.whatsappAria}
      className="fixed bottom-5 end-5 z-40 isolate inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#128c4a] text-white shadow-lift transition hover:scale-105 hover:bg-[#0e7a40] focus-visible:outline-offset-4 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping-soft rounded-full bg-[#128c4a]/60"
      />
      <Icon name="whatsapp" className="h-7 w-7 sm:h-5 sm:w-5" />
      <span className="hidden text-sm font-semibold sm:inline">{t.ui.whatsappShort}</span>
    </a>
  );
}
