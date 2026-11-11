import { articles } from "./blog-content";
import type { MetadataRoute } from "next";
import { categories } from "./recycling-content";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    { url: siteUrl },
    { url: `${siteUrl}/blogs` },
    ...articles.map(({ slug }) => ({ url: `${siteUrl}/blogs/${slug}` })),
    ...categories.map(({ slug }) => ({ url: `${siteUrl}/recycling/${slug}` })),
  ];
}
