import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/products", "/services", "/contact"];
  return routes.map((path) => ({
    url: `${company.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
