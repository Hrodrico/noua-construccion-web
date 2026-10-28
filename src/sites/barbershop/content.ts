import type { SiteContent } from "@/types/content";

export const content: SiteContent = {
  hero: {
    eyebrow: "Desde 2015",
    title: "Tu corte, como te gusta",
    description: "Cortes clásicos y modernos, perfilado de barba y afeitado con toalla caliente.",
    primaryCta: { label: "Reservar por WhatsApp", href: "/#contacto" },
    secondaryCta: { label: "Ver cortes", href: "/trabajos" },
  },
  about: {
    title: "Más que un corte",
    paragraphs: [
      "Una barbería de barrio donde cada cliente tiene su tiempo y su conversación.",
    ],
    highlights: [
      { value: "4", label: "barberos" },
      { value: "4.9", label: "valoración promedio" },
    ],
  },
  services: [
    { id: "corte", title: "Corte de pelo", description: "Tijera o máquina. Desde $10.000." },
    { id: "barba", title: "Perfilado de barba", description: "Con navaja y toalla caliente. $7.000." },
    { id: "combo", title: "Corte + barba", description: "El servicio completo. $15.000." },
  ],
  projects: [
    {
      slug: "fade-clasico",
      title: "Fade clásico",
      summary: "Degradado bajo con textura arriba.",
      description: ["Degradado bajo con terminación a navaja y textura en la parte superior."],
      category: "Corte",
      gallery: [],
      featured: true,
    },
    {
      slug: "barba-completa",
      title: "Barba completa",
      summary: "Perfilado y diseño de barba larga.",
      description: ["Perfilado con navaja, rebaje de volumen y aceite de acabado."],
      category: "Barba",
      gallery: [],
      featured: true,
    },
  ],
  reviews: [
    {
      id: "r1",
      author: "Matías R.",
      rating: 5,
      text: "El mejor fade que me han hecho. Buena música y buena conversa.",
      projectSlug: "fade-clasico",
    },
    {
      id: "r2",
      author: "Felipe A.",
      role: "Cliente frecuente",
      rating: 5,
      text: "Puntuales con la hora y muy prolijos con la barba.",
    },
  ],
};
