"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageAsset } from "@/types/content";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";

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
  "flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition hover:bg-background";

/**
 * Carrusel de imágenes con relación de aspecto fija. Avanza solo, pero se detiene
 * con el puntero encima, con foco de teclado, con el botón de pausa o si el sistema
 * pide reducir el movimiento (WCAG 2.2.2).
 */
export function ImageCarousel({
  images,
  label,
  sizes,
  priority,
  interval = 6000,
  className = "aspect-[4/3]",
}: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const autoplay = !paused && !interacting && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [autoplay, images.length, interval]);

  const go = (index: number) => setCurrent((index + images.length) % images.length);

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
      {images.map((image, index) => (
        <div
          key={image.src}
          role="group"
          aria-roledescription="imagen"
          aria-label={`${index + 1} de ${images.length}`}
          aria-hidden={index !== current}
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority && index === 0}
            className="object-cover"
          />
        </div>
      ))}

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
              onClick={() => go(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={index === current}
              className="group flex h-6 min-w-6 items-center justify-center px-1"
            >
              <span
                className={`h-2.5 rounded-full shadow transition-all ${
                  index === current ? "w-6 bg-accent" : "w-2.5 bg-background/85 group-hover:bg-background"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(current - 1)}
            aria-label="Imagen anterior"
            className={controlClass}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(current + 1)}
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
