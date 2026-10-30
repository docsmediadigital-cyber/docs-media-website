/**
 * Local landing page URLs. Kept apart from the page copy in locations.ts so the
 * client-side language switcher can check them without bundling that copy.
 */
export const locationPathBySlug = {
  kanhangad: "/digital-marketing-agency-kanhangad",
  kasaragod: "/digital-marketing-agency-kasaragod",
} as const;

export const locationPaths: ReadonlySet<string> = new Set(Object.values(locationPathBySlug));
