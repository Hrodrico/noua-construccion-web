"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/types/content";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useSwipeTrack } from "@/lib/useSwipeTrack";

type Props = {
  images: ImageAsset[];
  /** Nombre accesible del carrusel. */
  label: string;
  sizes: string;
  /** Carga prioritaria de la primera imagen (solo si es la principal de la página). */
  priority?: boolean;
  /** Milisegundos entre imágenes. */
  interval?: number;
  className?: string;
};

const controlClass =
  "flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition hover:bg-background active:scale-95";

/**
 * Carrusel de imágenes con relación de aspecto fija. Avanza solo (el indicador activo
 * se llena mientras tanto), pero se detiene
 * con el puntero encima, con foco de teclado, al arrastrar, con el botón de pausa o si
 * el sistema pide reducir el movimiento (WCAG 2.2.2). Se desliza con el dedo o el mouse.
 */
export function ImageCarousel({
  images,
  label,
  sizes,
  priority,
  interval = 5000,
  className = "aspect-[4/3]",
}: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const { viewportRef, handlers, slideStyle, distance, step, dragging } = useSwipeTrack({
    count: images.length,
    index: current,
    onIndexChange: setCurrent,
    loop: true,
    reducedMotion,
  });

  const autoplay = !paused && !interacting && !reducedMotion && !dragging;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={label}
      className={`relative overflow-hidden bg-surface ${className}`}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div
        ref={viewportRef}
        {...handlers}
        className="absolute inset-0 cursor-grab touch-pan-y touch-pinch-zoom select-none active:cursor-grabbing"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            data-slide
            role="group"
            aria-roledescription="imagen"
            aria-label={`${index + 1} de ${images.length}`}
            aria-hidden={index !== current}
            className="absolute inset-0 will-change-transform"
            style={slideStyle(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              draggable={false}
              priority={priority && index === 0}
              // Las vecinas se cargan antes de llegar a verse al deslizar.
              loading={priority && index === 0 ? undefined : distance(index) <= 1 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
          className={controlClass}
        >
          {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
        </button>

        <div className="flex">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={index === current}
              className="group flex h-11 min-w-7 items-center justify-center px-1"
            >
              <span
                className={`relative h-2.5 overflow-hidden rounded-full bg-background/85 shadow transition-all group-hover:bg-background group-active:scale-90 ${
                  index === current ? "w-10" : "w-2.5"
                }`}
              >
                {index === current && (
                  // El fin de la animación avanza a la siguiente imagen: barra y cambio nunca se desfasan,
                  // y al pausar (animation-play-state) se retoma desde donde quedó.
                  <span
                    key={current}
                    data-carousel-progress
                    onAnimationEnd={() => step(1)}
                    className="absolute inset-0 origin-left rounded-full bg-accent"
                    style={
                      reducedMotion
                        ? undefined
                        : {
                            animation: `carousel-progress ${interval}ms linear forwards`,
                            animationPlayState: autoplay ? "running" : "paused",
                          }
                    }
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Imagen anterior"
            className={controlClass}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Imagen siguiente"
            className={controlClass}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
