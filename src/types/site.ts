/**
 * Contrato de configuración de un negocio.
 * Todo lo que cambia de un cliente a otro (identidad, contacto, colores,
 * secciones, SEO y etiquetas visibles) vive aquí, nunca en los componentes.
 */

export type SocialNetwork =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "x";

export type SocialLink = {
  network: SocialNetwork;
  url: string;
};

export type ContactInfo = {
  /** Formato internacional, ej: "+56 9 1234 5678". */
  phone?: string;
  email?: string;
  whatsapp?: {
    /** Con código de país, ej: "+56 9 1234 5678". */
    number: string;
    /** Mensaje precargado al abrir el chat. */
    message?: string;
  };
  address?: string;
  city?: string;
  /** Enlace a Google Maps u otro servicio de mapas. */
  mapUrl?: string;
  hours?: { label: string; value: string }[];
};

/** Colores en hexadecimal. Se exponen como variables CSS y clases de Tailwind. */
export type ThemeColors = {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  /** Fondo de tarjetas y secciones alternas. */
  surface: string;
  /** Texto secundario. */
  muted: string;
  border: string;
};

export type SectionKey = "about" | "services" | "projects" | "reviews" | "contact";

export type SiteConfig = {
  name: string;
  legalName?: string;
  tagline: string;
  description: string;
  /** URL pública canónica, sin "/" final. */
  url: string;
  /** BCP 47, ej: "es-CL". */
  locale: string;
  contact: ContactInfo;
  social: SocialLink[];
  branding: {
    /** Ruta en /public. Si se omite, se muestra el nombre como texto. */
    logo?: string;
  };
  theme: ThemeColors;
  seo: {
    title: string;
    description: string;
    /** Ruta en /public o URL absoluta. */
    ogImage?: string;
    keywords?: string[];
  };
  /** Secciones visibles en el home (el hero siempre se muestra). */
  sections: Record<SectionKey, boolean>;
  /** Títulos visibles de cada sección, adaptados al rubro. */
  labels: Record<SectionKey, string>;
};
