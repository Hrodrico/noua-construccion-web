import Image from "next/image";
import type { ImageAsset } from "@/types/content";

type Props = {
  image?: ImageAsset;
  /** Texto del marcador cuando aún no hay foto. */
  fallbackLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Imagen con relación de aspecto fija. Si el contenido aún no tiene foto,
 * muestra un marcador con los colores del tema para no romper el diseño.
 */
export function Media({ image, fallbackLabel, sizes, priority, className = "aspect-[4/3]" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent p-6 text-center text-lg font-semibold text-primary-foreground/90"
        >
          {fallbackLabel}
        </div>
      )}
    </div>
  );
}
