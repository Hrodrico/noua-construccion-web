import type { SiteContent } from "@/types/content";

// TODO: contenido de ejemplo. Reemplazar textos y agregar fotos reales en /public/images.
export const content: SiteContent = {
  hero: {
    eyebrow: "Construimos tus ideas",
    title: "Soluciones de construcción a tu medida",
    description:
      "Acompañamos tu proyecto desde la idea hasta la entrega, con plazos claros y terminaciones de calidad.",
    primaryCta: { label: "Solicitar cotización", href: "/#contacto" },
    secondaryCta: { label: "Ver obras realizadas", href: "/trabajos" },
  },
  about: {
    title: "Un equipo que cumple lo que promete",
    paragraphs: [
      "Somos una empresa dedicada a la construcción y remodelación de espacios residenciales y comerciales.",
      "Trabajamos con presupuestos transparentes, comunicación constante y un equipo propio de maestros especializados.",
    ],
    highlights: [
      { value: "10+", label: "años de experiencia" },
      { value: "120+", label: "obras entregadas" },
      { value: "100%", label: "compromiso con los plazos" },
    ],
  },
  services: [
    {
      id: "construccion",
      title: "Construcción",
      description: "Obras nuevas, ampliaciones y segundos pisos.",
    },
    {
      id: "remodelacion",
      title: "Remodelación",
      description: "Cocinas, baños y renovación completa de espacios.",
    },
    {
      id: "terminaciones",
      title: "Terminaciones",
      description: "Pintura, pisos, cerámica y detalles finales.",
    },
    {
      id: "mantencion",
      title: "Mantención",
      description: "Reparaciones y mantención preventiva de inmuebles.",
    },
  ],
  projects: [
    {
      slug: "remodelacion-cocina-nunoa",
      title: "Remodelación de cocina",
      summary: "Cocina integrada con isla central y muebles a medida.",
      description: [
        "Rediseñamos la cocina para integrarla al living, con isla central, muebles a medida y nueva iluminación.",
        "El proyecto se entregó en cinco semanas, dentro del presupuesto acordado.",
      ],
      category: "Remodelación",
      location: "Ñuñoa",
      date: "2026-03-15",
      gallery: [],
      featured: true,
    },
    {
      slug: "ampliacion-segundo-piso-maipu",
      title: "Ampliación segundo piso",
      summary: "Dos dormitorios y un baño adicionales en estructura liviana.",
      description: [
        "Construcción de segundo piso con dos dormitorios y un baño, respetando la estructura existente.",
      ],
      category: "Construcción",
      location: "Maipú",
      date: "2025-11-02",
      gallery: [],
      featured: true,
    },
    {
      slug: "bano-completo-providencia",
      title: "Baño completo",
      summary: "Renovación total con cerámica de gran formato.",
      description: [
        "Renovación completa de baño: instalaciones, cerámica de gran formato y mueble vanitorio.",
      ],
      category: "Remodelación",
      location: "Providencia",
      date: "2025-08-20",
      gallery: [],
      featured: true,
    },
  ],
  reviews: [
    {
      id: "r1",
      author: "Carolina M.",
      role: "Cliente residencial",
      rating: 5,
      text: "Cumplieron los plazos y el resultado superó lo que esperábamos. Muy ordenados durante toda la obra.",
      projectSlug: "remodelacion-cocina-nunoa",
    },
    {
      id: "r2",
      author: "Jorge P.",
      role: "Cliente residencial",
      rating: 5,
      text: "Excelente comunicación y presupuesto claro desde el inicio. Los recomiendo.",
      projectSlug: "ampliacion-segundo-piso-maipu",
    },
    {
      id: "r3",
      author: "Andrea S.",
      rating: 4,
      text: "Buen trabajo en el baño, las terminaciones quedaron impecables.",
      projectSlug: "bano-completo-providencia",
    },
  ],
};
