import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/auth"] },
    sitemap: "https://takatoshihirokawa.com/sitemap.xml",
  }
}
