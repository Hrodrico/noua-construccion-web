import type { SiteConfig } from "@/types/site";

// Sitio de demostración para validar que la base sirve a otro rubro sin tocar componentes.
export const config: SiteConfig = {
  name: "Barbería Ejemplo",
  tagline: "Cortes clásicos y modernos",
  description: "Barbería de barrio con cortes, perfilado de barba y afeitado tradicional.",
  url: "https://www.example.com",
  locale: "es-CL",
  contact: {
    phone: "+56 9 0000 0000",
    email: "hola@example.com",
    whatsapp: {
      number: "+56 9 0000 0000",
      message: "Hola, quiero reservar una hora.",
    },
    address: "Av. Ejemplo 123",
    city: "Valparaíso, Chile",
    hours: [
      { label: "Martes a sábado", value: "10:00 – 20:00" },
      { label: "Domingo y lunes", value: "Cerrado" },
    ],
  },
  social: [
    { network: "instagram", url: "https://instagram.com/" },
    { network: "tiktok", url: "https://tiktok.com/" },
  ],
  branding: {},
  theme: {
    primary: "#C9A227",
    primaryForeground: "#111111",
    accent: "#B23A2E",
    accentForeground: "#FFFFFF",
    background: "#111111",
    foreground: "#F3EFE7",
    surface: "#1C1B19",
    muted: "#A39E93",
    border: "#2E2C29",
  },
  seo: {
    title: "Barbería Ejemplo | Cortes y barba en Valparaíso",
    description: "Cortes, perfilado de barba y afeitado tradicional. Reserva por WhatsApp.",
  },
  sections: {
    about: true,
    services: true,
    projects: true,
    reviews: true,
    contact: true,
  },
  labels: {
    about: "La barbería",
    services: "Servicios y precios",
    projects: "Nuestros cortes",
    reviews: "Reseñas",
    contact: "Reserva tu hora",
  },
};
