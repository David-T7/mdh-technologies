import type { MetadataRoute } from "next";
import { company, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/team",
    "/products",
    "/services",
    "/contact",
    ...site.team.members.map((m) => `/team/${m.slug}`),
  ];
  return routes.map((path) => ({
    url: `${company.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
