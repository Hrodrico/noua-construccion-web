import type { SiteConfig } from "@/types/site";

export type NavItem = { label: string; href: string };

/** Anclas del home. Se usan como id de cada sección. Son URL públicas, por eso van en español. */
export const sectionIds = {
  about: "nosotros",
  services: "servicios",
  projects: "trabajos",
  reviews: "resenas",
  contact: "contacto",
} as const;

/** Navegación principal derivada de las secciones activas. */
export function buildNavigation(config: SiteConfig): NavItem[] {
  const items: NavItem[] = [];
  const { sections, labels } = config;

  if (sections.about) items.push({ label: labels.about, href: `/#${sectionIds.about}` });
  if (sections.services) items.push({ label: labels.services, href: `/#${sectionIds.services}` });
  if (sections.projects) items.push({ label: labels.projects, href: "/trabajos" });
  if (sections.reviews) items.push({ label: labels.reviews, href: `/#${sectionIds.reviews}` });
  if (sections.contact) items.push({ label: labels.contact, href: `/#${sectionIds.contact}` });

  return items;
}
