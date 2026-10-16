import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/content/faqs";

/**
 * Accessible FAQ accordion built on native <details>/<summary>: works without
 * JavaScript, and the answer text stays in the DOM for search engines.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-brand-200 overflow-hidden rounded-3xl border border-brand-200 bg-surface shadow-soft">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-5 transition open:bg-lavender sm:px-7">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold">
            {faq.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45 group-open:bg-brand-700 group-open:text-white">
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </summary>
          <p className="pb-6 pe-10 leading-relaxed text-ink-soft">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
