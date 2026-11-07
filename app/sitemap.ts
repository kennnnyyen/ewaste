import type { MetadataRoute } from "next";
import { categories } from "./recycling-content";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    { url: siteUrl },
    ...categories.map(({ slug }) => ({ url: `${siteUrl}/recycling/${slug}` })),
  ];
}
