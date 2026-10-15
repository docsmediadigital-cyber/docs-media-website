import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { LOGO_DATA_URI } from "@/lib/logo-data";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social-share card (purple & white). Replace with a designed
 * 1200×630 image by dropping `opengraph-image.png` into src/app/ and deleting
 * this file.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #250330 0%, #4c075f 45%, #600a79 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_DATA_URI} width={258} height={120} alt={siteConfig.name} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Marketing that gets your brand noticed.
          </div>
          <div style={{ fontSize: 32, color: "#e8cbf4" }}>
            Social media · Performance ads · SEO · Creative · Web
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
