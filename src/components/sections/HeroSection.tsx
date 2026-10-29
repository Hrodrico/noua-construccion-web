import type { HeroContent } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Media } from "@/components/ui/Media";

type Props = {
  content: HeroContent;
  fallbackLabel: string;
};

export function HeroSection({ content, fallbackLabel }: Props) {
  const { eyebrow, title, description, images, primaryCta, secondaryCta } = content;

  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold tracking-wider text-accent uppercase">{eyebrow}</p>
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
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="aspect-[4/3] rounded-3xl"
          />
        ) : (
          <Media
            image={images?.[0]}
            fallbackLabel={fallbackLabel}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="aspect-[4/3] rounded-3xl"
          />
        )}
      </Container>
    </section>
  );
}
