/**
 * Contenido comercial del sitio. Hoy se define en archivos TypeScript;
 * mañana puede venir de una base de datos o CMS sin cambiar estos tipos.
 */

export type ImageAsset = {
  /** Ruta en /public o URL absoluta (configurar remotePatterns si es remota). */
  src: string;
  alt: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Una imagen se muestra fija; varias, como carrusel (la primera es la que carga primero). */
  images?: ImageAsset[];
  primaryCta: CallToAction;
  secondaryCta?: CallToAction;
};

export type AboutContent = {
  title: string;
  paragraphs: string[];
  highlights?: { value: string; label: string }[];
  image?: ImageAsset;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image?: ImageAsset;
};

export type Review = {
  id: string;
  author: string;
  /** Ej: "Cliente residencial", "Cliente frecuente". */
  role?: string;
  /** 1 a 5. */
  rating: number;
  text: string;
  /** ISO 8601, ej: "2026-03-15". */
  date?: string;
  /** Si la reseña corresponde a un trabajo, su slug. */
  projectSlug?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  category?: string;
  location?: string;
  /** ISO 8601, ej: "2026-03-15". */
  date?: string;
  cover?: ImageAsset;
  gallery: ImageAsset[];
  /** Destacado en el home. */
  featured?: boolean;
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  projects: Project[];
  reviews: Review[];
};
