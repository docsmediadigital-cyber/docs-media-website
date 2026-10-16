import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";

/**
 * Any URL that matches no real page lands here and returns a real HTTP 404,
 * rendered inside the language layout. The sentinel param keeps the route
 * prerenderable (Cache Components needs at least one param).
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang, rest: ["__not-found__"] }));
}

export default function CatchAll() {
  notFound();
}
