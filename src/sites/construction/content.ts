import type { SiteContent } from "@/types/content";

// Noua es un negocio nuevo: sin cifras de trayectoria ni reseñas hasta tener datos reales.
// Servicios, textos y obras salen del afiche y las publicaciones de Instagram (@noua.contacto).
// TODO: activar `sections.reviews` en config.ts cuando haya reseñas reales.
export const content: SiteContent = {
  hero: {
    eyebrow: "Construcción · Remodelación · Mantención",
    title: "Hacemos realidad tus proyectos",
    description:
      "Somos una constructora nueva que trabaja con calidad, compromiso y confianza. Cuéntanos tu idea y te enviamos una cotización sin compromiso.",
    // Carrusel con las mejores fotos de las obras: se referencian desde su carpeta, sin duplicarlas.
    images: [
      {
        src: "/images/projects/2026/quincho-cocina-barra/cocina-barra.webp",
        alt: "Quincho techado con vigas de madera, cocina negra con luz cálida y barra con piso alto",
      },
      {
        src: "/images/projects/2026/cierre-patio-revestimiento/despues.webp",
        alt: "Patio interior con muros revestidos en tono madera y piso de pasto sintético",
      },
      {
        src: "/images/projects/2026/renovacion-fachada/despues.webp",
        alt: "Fachada de casa de un piso recién pintada de blanco, con aleros renovados",
      },
    ],
    primaryCta: { label: "Cotiza tu proyecto", href: "/#contacto" },
    secondaryCta: { label: "Ver obras realizadas", href: "/trabajos" },
  },
  about: {
    title: "Una constructora nueva, con trato directo",
    paragraphs: [
      "Noua nace para construir, ampliar, remodelar y mantener los espacios de tu casa con un trato cercano: hablas directamente con quienes ejecutan tu obra.",
      "Trabajamos con personal calificado, cumplimos los plazos que acordamos y garantizamos nuestros trabajos. Te acompañamos desde la idea hasta la entrega con atención personalizada.",
    ],
  },
  services: [
    {
      id: "construccion-ampliaciones",
      title: "Construcción y ampliaciones",
      description: "Nuevos espacios para tu casa, desde la obra gruesa hasta las terminaciones.",
    },
    {
      id: "logias-terrazas-piscinas",
      title: "Logias, terrazas y piscinas",
      description: "Espacios exteriores para disfrutar tu casa todo el año.",
    },
    {
      id: "estacionamientos",
      title: "Estacionamientos",
      description: "Construcción y techado de estacionamientos.",
    },
    {
      id: "muebles-a-medida",
      title: "Fabricación de muebles a medida",
      description: "Muebles de cocina, quinchos y espacios hechos a la medida de tu proyecto.",
    },
    {
      id: "remodelaciones",
      title: "Remodelaciones",
      description: "Renovación de cocinas, baños, fachadas y espacios completos.",
    },
    {
      id: "mantenciones",
      title: "Mantenciones en general",
      description: "Reparaciones, filtraciones, pintura y mantención de tu casa.",
    },
  ],
  projects: [
    {
      slug: "quincho-cocina-barra",
      title: "Quincho con cocina y barra",
      summary: "Quincho techado con cocina, muebles a medida y barra con piso alto.",
      description: [
        "Construimos un quincho techado con vigas de madera a la vista, revestimiento de listones en los muros e iluminación cálida.",
        "Incluye cocina con cubierta negra, muebles superiores a medida y una barra central con piso alto para compartir alrededor de la parrilla.",
      ],
      category: "Quinchos",
      cover: {
        src: "/images/projects/2026/quincho-cocina-barra/cocina-barra.webp",
        alt: "Quincho techado con vigas de madera, cocina negra iluminada y barra con piso alto",
      },
      gallery: [],
      featured: true,
    },
    {
      slug: "reparacion-filtracion-bajo-radier",
      title: "Reparación de filtración bajo radier",
      summary: "Detectamos la fuga, reparamos la cañería y reinstalamos el porcelanato sin romper toda la cocina.",
      description: [
        "No es solo cambiar el piso. Es encontrar la fuga, reparar la cañería, rehacer el radier, nivelar, instalar el porcelanato y dejar todo limpio.",
        "Este cliente pensó que tenía que romper toda la cocina. Lo solucionamos al saber detectar, reparar y encontrar los materiales adecuados.",
      ],
      category: "Mantención",
      date: "2026-10-27",
      cover: {
        src: "/images/projects/2026/reparacion-filtracion-bajo-radier/porcelanato-terminado.webp",
        alt: "Piso de porcelanato reinstalado y nivelado tras reparar la filtración",
      },
      gallery: [
        {
          src: "/images/projects/2026/reparacion-filtracion-bajo-radier/radier-abierto.webp",
          alt: "Radier abierto con la cañería expuesta para reparar la filtración",
        },
        {
          src: "/images/projects/2026/reparacion-filtracion-bajo-radier/porcelanato-terminado.webp",
          alt: "Mismo sector terminado con porcelanato nuevo",
        },
      ],
      featured: true,
    },
    {
      slug: "cierre-patio-revestimiento",
      title: "Cierre de patio con revestimiento",
      summary: "Transformamos un patio interior con nuevos cierres de revestimiento y pasto sintético.",
      description: [
        "Reemplazamos los cierres provisorios del patio por muros revestidos en tono madera, ordenamos las instalaciones y terminamos el piso con pasto sintético.",
      ],
      category: "Remodelación",
      cover: {
        src: "/images/projects/2026/cierre-patio-revestimiento/despues.webp",
        alt: "Patio interior con muros revestidos en tono madera y piso de pasto sintético",
      },
      gallery: [
        {
          src: "/images/projects/2026/cierre-patio-revestimiento/antes.webp",
          alt: "Patio antes de la obra, con cierres provisorios de pasto sintético y un biombo",
        },
        {
          src: "/images/projects/2026/cierre-patio-revestimiento/despues.webp",
          alt: "Patio después de la obra, con muros revestidos en tono madera",
        },
      ],
      featured: true,
    },
    {
      slug: "renovacion-fachada",
      title: "Renovación de fachada",
      summary: "Pintura de muros, aleros y rejas para renovar el exterior de la casa.",
      description: [
        "Renovamos el exterior de la casa: reparamos y pintamos muros y aleros, y repintamos las rejas de las ventanas.",
      ],
      category: "Mantención",
      cover: {
        src: "/images/projects/2026/renovacion-fachada/despues.webp",
        alt: "Fachada de casa de un piso pintada de blanco, con aleros renovados y rejas oscuras",
      },
      gallery: [
        {
          src: "/images/projects/2026/renovacion-fachada/antes.webp",
          alt: "Fachada antes de la renovación, con alero de madera desgastado",
        },
        {
          src: "/images/projects/2026/renovacion-fachada/despues.webp",
          alt: "Fachada después de la renovación, pintada de blanco",
        },
      ],
      featured: true,
    },
  ],
  reviews: [],
};
