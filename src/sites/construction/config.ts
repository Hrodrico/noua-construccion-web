import type { SiteConfig } from "@/types/site";

export const config: SiteConfig = {
  name: "Noua Construcción",
  tagline: "Construcción · Remodelación · Mantención",
  description:
    "Construcción, ampliaciones, terrazas, piscinas, remodelaciones y mantenciones en la Región Metropolitana.",
  url: "https://www.noua-construccion.cl",
  locale: "es-CL",
  contact: {
    phone: "+56 9 7399 4163",
    email: "noua.contacto@gmail.com",
    whatsapp: {
      number: "+56 9 7399 4163",
      message: "Hola, quisiera solicitar una cotización.",
    },
    city: "Región Metropolitana",
    hours: [
      { label: "Lunes a viernes", value: "08:30 – 17:30" },
      { label: "Sábado", value: "10:00 – 14:00" },
    ],
  },
  social: [
    { network: "instagram", url: "https://www.instagram.com/noua.contacto/" },
  ],
  branding: {
    logo: "/logos/logo-noua.png",
  },
  theme: {
    primary: "#0A1F3C",
    primaryForeground: "#FFFFFF",
    accent: "#F78F36",
    accentForeground: "#0A1F3C",
    background: "#FFFFFF",
    foreground: "#20252B",
    surface: "#F4F2EF",
    muted: "#5B6470",
    border: "#E2DED8",
  },
  seo: {
    title: "Noua Construcción | Construcción, remodelación y mantención",
    description:
      "Construcción y ampliaciones, terrazas, piscinas, muebles a medida, remodelaciones y mantenciones en Santiago. Cotiza tu proyecto.",
    ogImage: "/logos/logo_noua.jpg",
    keywords: ["construcción", "ampliaciones", "terrazas", "quinchos", "piscinas", "remodelación", "mantención", "muebles a medida"],
  },
  sections: {
    about: true,
    services: true,
    projects: true,
    reviews: false,
    contact: true,
  },
  labels: {
    about: "Sobre nosotros",
    services: "Servicios",
    projects: "Obras realizadas",
    reviews: "Lo que dicen nuestros clientes",
    contact: "Contacto",
  },
};
