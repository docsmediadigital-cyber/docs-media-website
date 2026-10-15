import { Icon } from "@/components/ui/Icon";

/** Slow-scrolling service ticker. Decorative: the full list is in the page content. */
export function Marquee({ items }: { items: string[] }) {
  const half = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-brand-200 bg-surface py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {[...half, ...half].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-bold text-brand-950/80"
          >
            {item}
            <Icon name="sparkle" className="h-5 w-5 text-brand-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
