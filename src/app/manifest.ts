import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Metropolitan",
    start_url: "/",
    display: "browser",
    background_color: "#fbf8f2",
    theme_color: "#1a4a2b",
    icons: [{ src: "/images/logos/icon-192.png", sizes: "192x192", type: "image/png" }],
  };
}
