import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [{ url: site.url, priority: 1 }];

  if (site.sections.projects) {
    const projects = await getProjects();
    entries.push(
      { url: `${site.url}/trabajos`, priority: 0.8 },
      ...projects.map((project) => ({
        url: `${site.url}/trabajos/${project.slug}`,
        lastModified: project.date,
        priority: 0.6,
      })),
    );
  }

  return entries;
}
