import generated from "@/generated/image-placeholders.json";
import type { ImageAsset, SiteContent } from "@/types/content";

// Lo genera scripts/generate-image-placeholders.mjs (npm run images:placeholders).
const placeholders: Record<string, string> = generated;

/** Agrega la vista previa generada a una imagen local, si existe y no trae una propia. */
export function withPlaceholder(image: ImageAsset): ImageAsset {
  const blurDataURL = image.blurDataURL ?? placeholders[image.src];
  return blurDataURL ? { ...image, blurDataURL } : image;
}

function optional(image: ImageAsset | undefined): ImageAsset | undefined {
  return image && withPlaceholder(image);
}

/** Aplica withPlaceholder a todas las imágenes del contenido. */
export function withPlaceholders(content: SiteContent): SiteContent {
  return {
    ...content,
    hero: { ...content.hero, images: content.hero.images?.map(withPlaceholder) },
    about: { ...content.about, image: optional(content.about.image) },
    services: content.services.map((service) => ({ ...service, image: optional(service.image) })),
    projects: content.projects.map((project) => ({
      ...project,
      cover: optional(project.cover),
      gallery: project.gallery.map(withPlaceholder),
    })),
  };
}
