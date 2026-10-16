import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Blog posts renamed without "india"/"indian" in the URL: keep old links and rankings working.
  async redirects() {
    return [
      {
        source: "/blog/shopify-store-launch-checklist-india",
        destination: "/blog/shopify-store-launch-checklist",
        permanent: true,
      },
      {
        source: "/blog/click-to-whatsapp-ads-indian-businesses",
        destination: "/blog/click-to-whatsapp-ads-for-businesses",
        permanent: true,
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
