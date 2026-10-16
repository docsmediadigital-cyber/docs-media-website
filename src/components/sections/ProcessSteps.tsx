import { getProcessSteps } from "@/content/localized";
import type { Locale } from "@/i18n/config";

/** Numbered 4-step "how we work" list with a connecting line on desktop. */
export function ProcessSteps({ invert, lang = "en" }: { invert?: boolean; lang?: Locale }) {
  const processSteps = getProcessSteps(lang);
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={
          invert
            ? "absolute left-[12%] right-[12%] top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent lg:block"
            : "absolute left-[12%] right-[12%] top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent lg:block"
        }
      />
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className={
              invert
                ? "reveal group rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-white/10"
                : "reveal group rounded-3xl border border-brand-200 bg-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            }
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 font-display text-xl font-extrabold text-white shadow-lift">
              {i + 1}
            </span>
            <h3 className="mt-5 font-display text-lg font-bold">{step.title}</h3>
            <p
              className={
                invert
                  ? "mt-2 leading-relaxed text-brand-100"
                  : "mt-2 leading-relaxed text-ink-soft"
              }
            >
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
