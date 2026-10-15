import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/utils";

/** Floating click-to-chat button, fixed bottom-right on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi DOCS MEDIA, I'd like to know more about your services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DOCS MEDIA on WhatsApp"
      className="fixed bottom-5 right-5 z-40 isolate inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#128c4a] text-white shadow-lift transition hover:scale-105 hover:bg-[#0e7a40] focus-visible:outline-offset-4 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping-soft rounded-full bg-[#128c4a]/60"
      />
      <Icon name="whatsapp" className="h-7 w-7 sm:h-5 sm:w-5" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
