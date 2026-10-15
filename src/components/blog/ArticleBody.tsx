import type { Block } from "@/content/blog";

/** Renders structured blog blocks as semantic, readable HTML. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="!mt-10 font-display text-2xl font-bold leading-snug sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-ink-soft">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="list-disc space-y-2 pl-6 text-ink-soft marker:text-brand-500"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="list-decimal space-y-2 pl-6 text-ink-soft marker:font-semibold marker:text-brand-600"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}
