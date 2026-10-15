/**
 * Renders a JSON-LD <script>. `<` is escaped to its unicode form so content can
 * never close the script tag (recommended by the Next.js JSON-LD guide).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
