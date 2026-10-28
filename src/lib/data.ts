import { activeSite } from "@/sites";
import type {
  AboutContent,
  HeroContent,
  Project,
  Review,
  Service,
} from "@/types/content";

/**
 * Capa de acceso a datos. Los componentes y páginas solo leen contenido a
 * través de estas funciones. Para conectar una base de datos o un CMS,
 * reescribe el cuerpo de cada función manteniendo su firma.
 */

const { content } = activeSite;

export async function getHero(): Promise<HeroContent> {
  "use cache";
  return content.hero;
}

export async function getAbout(): Promise<AboutContent> {
  "use cache";
  return content.about;
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  return content.services;
}

export async function getProjects(options?: { featured?: boolean }): Promise<Project[]> {
  "use cache";
  const projects = [...content.projects].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );
  return options?.featured ? projects.filter((p) => p.featured) : projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  "use cache";
  return content.projects.find((p) => p.slug === slug);
}

export async function getReviews(options?: { projectSlug?: string }): Promise<Review[]> {
  "use cache";
  return options?.projectSlug
    ? content.reviews.filter((r) => r.projectSlug === options.projectSlug)
    : content.reviews;
}
