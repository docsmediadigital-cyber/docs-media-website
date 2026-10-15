import type { Metadata } from "next";
import { FocusPageView } from "@/components/sections/FocusPageView";
import { getFocusPage } from "@/content/focus-pages";
import { buildMetadata } from "@/lib/seo";

const page = getFocusPage("creative-studio");

export const metadata: Metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
  keywords: page.keywords,
});

export default function CreativeStudioPage() {
  return <FocusPageView page={page} />;
}
