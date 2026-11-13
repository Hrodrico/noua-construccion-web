import type { SiteContent } from "@/types/content";

// Noua es un negocio nuevo: sin cifras de trayectoria ni reseñas hasta tener datos reales.
// Servicios, textos y obras salen del afiche y las publicaciones de Instagram (@noua.contacto).
// TODO: activar `sections.reviews` en config.ts cuando haya reseñas reales.
export const content: SiteContent = {
  hero: {
    eyebrow: "Constructora en la Región Metropolitana",
    title: "Hacemos realidad tus proyectos",
    description:
      "Somos una constructora nueva que trabaja con calidad, compromiso y confianza. Cuéntanos tu idea y te enviamos una cotización sin compromiso.",
    // Carrusel con las mejores fotos de las obras: se referencian desde su carpeta, sin duplicarlas.
    images: [
      {
        src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/quincho.webp",
        alt: "Quincho de noche con vigas de madera, luces colgantes, cocina con barra y sillas altas",
      },
      {
        src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/piscina.webp",
        alt: "Piscina con borde de piedra, pasto sintético y cierre perimetral de wall panel tono madera",
      },
      {
        src: "/images/projects/2026/terraza-vitacura/terminada.webp",
        alt: "Terraza con piso de porcelanato tipo madera bajo un toldo y jardineras al fondo",
      },
      {
        src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/estacionamiento.webp",
        alt: "Estacionamiento techado para dos autos con pilares de madera frente a una casa",
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
    image: {
      src: "/images/about/afiche-noua.webp",
      alt: "Afiche de Noua con sus servicios: construcción y ampliaciones, logias, terrazas y piscinas, estacionamientos, muebles a medida, remodelaciones y mantenciones",
    },
    imageOrientation: "portrait",
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
      slug: "quincho-piscina-estacionamiento-lampa",
      title: "Quincho, piscina y estacionamiento",
      summary: "Quincho con cocina y barra, piscina con cierre de wall panel y estacionamiento techado.",
      description: [
        "Transformamos el patio completo de esta casa: un quincho techado con vigas de madera, cocina, barra con piso alto e iluminación cálida para compartir de noche.",
        "Construimos una piscina con borde de piedra rodeada de pasto sintético y cerramos el perímetro con wall panel tono madera.",
        "En el frente techamos el estacionamiento para dos autos con pilares de madera y renovamos el acceso.",
      ],
      category: "Quinchos y piscinas",
      location: "Lampa",
      cover: {
        src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/quincho.webp",
        alt: "Quincho de noche con vigas de madera, luces colgantes, cocina con barra y sillas altas",
      },
      gallery: [
        {
          src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/quincho.webp",
          alt: "Quincho con living exterior, cocina negra y barra con sillas altas",
        },
        {
          src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/piscina.webp",
          alt: "Piscina con borde de piedra, pasto sintético y cierre perimetral de wall panel",
        },
        {
          src: "/images/projects/2026/quincho-piscina-estacionamiento-lampa/estacionamiento.webp",
          alt: "Estacionamiento techado para dos autos con pilares de madera",
        },
      ],
      featured: true,
    },
    {
      slug: "terraza-vitacura",
      title: "Terraza con porcelanato y jardineras",
      summary: "De un patio de tierra a una terraza con piso de porcelanato tipo madera y jardineras.",
      description: [
        "El espacio era un patio de tierra con baldosas sueltas. Nivelamos el terreno, instalamos porcelanato tipo madera y lo rematamos con bordes del mismo material.",
        "Construimos jardineras revestidas a lo largo del cierre y las plantamos para darle vida a la terraza.",
      ],
      category: "Terrazas",
      location: "Vitacura",
      date: "2026-10-05",
      cover: {
        src: "/images/projects/2026/terraza-vitacura/terminada.webp",
        alt: "Terraza terminada con piso de porcelanato tipo madera bajo un toldo y jardineras al fondo",
      },
      gallery: [
        {
          src: "/images/projects/2026/terraza-vitacura/antes.webp",
          alt: "Patio antes de la obra, con tierra y baldosas sueltas bajo un toldo",
        },
        {
          src: "/images/projects/2026/terraza-vitacura/en-obra.webp",
          alt: "Terreno nivelado y jardinera en construcción durante la obra",
        },
        {
          src: "/images/projects/2026/terraza-vitacura/terminada.webp",
          alt: "Terraza terminada con porcelanato tipo madera y jardineras",
        },
        {
          src: "/images/projects/2026/terraza-vitacura/terminada-arbol.webp",
          alt: "Vista de la terraza terminada desde el jardín",
        },
        {
          src: "/images/projects/2026/terraza-vitacura/jardinera.webp",
          alt: "Detalle de la jardinera con flores y lavandas junto al borde de porcelanato",
        },
      ],
      featured: true,
    },
    {
      slug: "remodelacion-bano-nunoa",
      title: "Remodelación de baño",
      summary: "Cambiamos la tina por una ducha con mampara y renovamos revestimientos, mueble y espejo.",
      description: [
        "Reemplazamos la tina por una ducha con mampara de vidrio y nicho iluminado, renovamos cerámicas y piso, e instalamos un mueble de vanitorio en tono madera con repisas y espejo iluminado.",
      ],
      category: "Remodelación",
      location: "Ñuñoa",
      date: "2026-10-27",
      cover: {
        src: "/images/projects/2026/remodelacion-bano-nunoa/despues.webp",
        alt: "Baño remodelado con ducha de vidrio, mueble de madera clara y espejo redondo iluminado",
      },
      gallery: [
        {
          src: "/images/projects/2026/remodelacion-bano-nunoa/antes.webp",
          alt: "Baño antes de la remodelación, con tina, cortina y mueble antiguo",
        },
        {
          src: "/images/projects/2026/remodelacion-bano-nunoa/despues.webp",
          alt: "Baño después de la remodelación, con ducha de vidrio y mueble de madera clara",
        },
      ],
      featured: false,
    },
    {
      slug: "reparacion-cielos-lastarria",
      title: "Reparación de cielos por humedad",
      summary: "Reparamos y pintamos cielos dañados por humedad en el pasillo y el baño de un departamento.",
      description: [
        "La humedad había soltado la pintura del cielo del pasillo y manchado el del baño. Retiramos lo dañado, reparamos la superficie y volvimos a pintar con terminación pareja.",
      ],
      category: "Mantención",
      location: "Santiago",
      cover: {
        src: "/images/projects/2026/reparacion-cielos-lastarria/pasillo-despues.webp",
        alt: "Cielo del pasillo reparado y pintado de blanco",
      },
      gallery: [
        {
          src: "/images/projects/2026/reparacion-cielos-lastarria/pasillo-antes.webp",
          alt: "Cielo del pasillo con la pintura soltada por la humedad",
        },
        {
          src: "/images/projects/2026/reparacion-cielos-lastarria/pasillo-despues.webp",
          alt: "Cielo del pasillo reparado y pintado",
        },
        {
          src: "/images/projects/2026/reparacion-cielos-lastarria/bano-antes.webp",
          alt: "Cielo del baño con manchas de humedad",
        },
        {
          src: "/images/projects/2026/reparacion-cielos-lastarria/bano-despues.webp",
          alt: "Cielo del baño reparado y pintado",
        },
      ],
      featured: true,
    },
    {
      slug: "inspeccion-tecnica-la-florida",
      title: "Inspección técnica de departamento",
      summary: "Revisamos un departamento nuevo antes de la entrega y marcamos cada detalle a corregir.",
      description: [
        "Antes de recibir su departamento nuevo, el cliente nos pidió revisarlo. Inspeccionamos pisos, cerámicas, puertas, griferías, terraza y ventanas, y marcamos con cinta cada observación para que la inmobiliaria la corrigiera.",
      ],
      category: "Inspección técnica",
      location: "La Florida",
      date: "2026-11-02",
      cover: {
        src: "/images/projects/2026/inspeccion-tecnica-la-florida/piso-bano.webp",
        alt: "Piso de baño con cintas azules que marcan las observaciones de la inspección",
      },
      gallery: [
        {
          src: "/images/projects/2026/inspeccion-tecnica-la-florida/piso-bano.webp",
          alt: "Piso de baño con observaciones marcadas con cinta azul",
        },
        {
          src: "/images/projects/2026/inspeccion-tecnica-la-florida/ducha.webp",
          alt: "Grifería de ducha con observaciones marcadas en la cerámica",
        },
        {
          src: "/images/projects/2026/inspeccion-tecnica-la-florida/puerta.webp",
          alt: "Revisión de la chapa y la manilla de una puerta",
        },
        {
          src: "/images/projects/2026/inspeccion-tecnica-la-florida/piso-dormitorio.webp",
          alt: "Piso flotante de dormitorio con una observación marcada",
        },
        {
          src: "/images/projects/2026/inspeccion-tecnica-la-florida/terraza.webp",
          alt: "Piso de la terraza con observaciones marcadas",
        },
        {
          src: "/images/projects/2026/inspeccion-tecnica-la-florida/fachada-ventana.webp",
          alt: "Revisión de la terminación del muro sobre la ventana de la terraza",
        },
      ],
      featured: false,
    },
    {
      slug: "cubierta-cocina-las-condes",
      title: "Cubierta de cocina",
      summary: "Instalación de cubierta de granito con lavaplatos de acero inoxidable.",
      description: [
        "Instalamos una cubierta de granito gris con lavaplatos de acero inoxidable y grifería nueva, con terminación pareja contra el muro.",
      ],
      category: "Remodelación",
      location: "Las Condes",
      cover: {
        src: "/images/projects/2026/cubierta-cocina-las-condes/cubierta.webp",
        alt: "Cubierta de cocina de granito gris con lavaplatos de acero inoxidable",
      },
      gallery: [],
      featured: false,
    },
  ],
  reviews: [],
};
