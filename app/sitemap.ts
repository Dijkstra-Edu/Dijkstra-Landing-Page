import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { products } from "@/content/products";
import { posts } from "@/content/blog";
import { legalDocs } from "@/content/legal";

const staticRoutes = [
  "",
  "/features",
  "/products",
  "/pricing",
  "/roadmap",
  "/integrations",
  "/compare",
  "/case-studies",
  "/about",
  "/mission",
  "/team",
  "/careers",
  "/contact",
  "/blog",
  "/press",
  "/partners",
  "/faq",
  "/knowledge-base",
  "/developers",
  "/changelog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...products.map((p) => `/products/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
    ...legalDocs.map((d) => `/legal/${d.slug}`),
  ];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" || route === "/team" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
