import type { HeroContent } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Media } from "@/components/ui/Media";

type Props = {
  id?: string;
  content: HeroContent;
  fallbackLabel: string;
};

export function HeroSection({ id, content, fallbackLabel }: Props) {
  const { eyebrow, title, description, images, primaryCta, secondaryCta } = content;

  return (
    // En escritorio el hero ocupa la pantalla bajo el header (h-16): la siguiente sección no asoma al entrar.
    <section id={id} className="flex items-center py-16 sm:py-24 lg:min-h-[calc(100svh-4rem)]">
      {/* En escritorio la foto toma más ancho (5:6) y alto (5:4) que el texto: es lo que vende la obra. */}
      <Container className="grid items-center gap-12 lg:grid-cols-[5fr_6fr]">
        <div>
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold tracking-wider text-muted uppercase">{eyebrow}</p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            {secondaryCta && (
              <ButtonLink href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>

        {images && images.length > 1 ? (
          <ImageCarousel
            images={images}
            label={`Fotos de ${fallbackLabel}`}
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            className="aspect-[4/3] rounded-3xl lg:aspect-[5/4]"
          />
        ) : (
          <Media
            image={images?.[0]}
            fallbackLabel={fallbackLabel}
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            className="aspect-[4/3] rounded-3xl lg:aspect-[5/4]"
          />
        )}
      </Container>
    </section>
  );
}
