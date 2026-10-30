"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/content";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useSwipeTrack } from "@/lib/useSwipeTrack";

type Props = {
  images: ImageAsset[];
  /** Nombre accesible de la galería, ej: el título del trabajo. */
  label: string;
  className?: string;
};

const navButtonClass =
  "flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition hover:bg-background active:scale-95 aria-disabled:pointer-events-none aria-disabled:opacity-40";

/**
 * Galería con imagen principal, miniaturas y vista a pantalla completa (sin recorte)
 * para ver los detalles. Se navega con botones, teclas ← → y deslizando (dedo o mouse);
 * no da la vuelta: en los extremos el arrastre ofrece resistencia.
 */
export function ImageGallery({ images, label, className = "" }: Props) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const total = images.length;
  const image = images[current];
  const go = (index: number) => setCurrent(Math.min(total - 1, Math.max(0, index)));

  // <dialog> modal: atrapa el foco y cierra con Esc de forma nativa.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();

    document.documentElement.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [expanded]);

  return (
    <div role="region" aria-roledescription="galería" aria-label={label} className={className}>
      <SwipeViewer
        images={images}
        current={current}
        onChange={go}
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="aspect-[16/9] rounded-3xl bg-surface"
        imageClassName="object-cover"
        highPriorityFirst
      >
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={`Ver en pantalla completa: ${image.alt}`}
          className="group absolute inset-0 cursor-zoom-in"
        >
          <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition group-hover:bg-background group-active:scale-95">
            <ExpandIcon className="h-5 w-5" />
          </span>
        </button>
        {total > 1 && (
          <p
            aria-live="polite"
            className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-sm font-medium text-foreground shadow"
          >
            {current + 1} / {total}
          </p>
        )}
      </SwipeViewer>

      {total > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((thumb, index) => (
            <li key={thumb.src}>
              <button
                type="button"
                onClick={() => go(index)}
                aria-label={`Ver imagen ${index + 1}: ${thumb.alt}`}
                aria-current={index === current}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition active:scale-95 ${
                  index === current ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={thumb.src} alt="" fill sizes="160px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`${label}: imagen ${current + 1} de ${total}`}
        onClose={() => setExpanded(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(current + 1);
          if (event.key === "ArrowLeft") go(current - 1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-foreground p-0 text-background backdrop:bg-foreground"
      >
        {expanded && (
          <div className="flex h-full w-full flex-col">
            <SwipeViewer
              images={images}
              current={current}
              onChange={go}
              sizes="100vw"
              className="flex-1"
              imageClassName="object-contain"
              arrowsClassName="sm:mx-3"
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Cerrar"
                className={`${navButtonClass} absolute top-4 right-4`}
                autoFocus
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </SwipeViewer>
            <p className="px-4 py-4 text-center text-sm sm:text-base">
              {image.alt}
              {total > 1 && <span className="ml-2 opacity-75">({current + 1} / {total})</span>}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}

type ViewerProps = {
  images: ImageAsset[];
  current: number;
  onChange: (index: number) => void;
  sizes: string;
  className: string;
  imageClassName: string;
  arrowsClassName?: string;
  /** Prioridad alta para la primera imagen (solo en la vista principal de la página). */
  highPriorityFirst?: boolean;
  /** Controles superpuestos a las imágenes. */
  children: ReactNode;
};

/**
 * Visor deslizable: las imágenes siguen al dedo y, al soltar, terminan con un resorte que
 * hereda la velocidad del gesto. Es un componente aparte para que el de pantalla completa
 * arranque en la imagen activa al abrirse.
 */
function SwipeViewer({
  images,
  current,
  onChange,
  sizes,
  className,
  imageClassName,
  arrowsClassName = "",
  highPriorityFirst,
  children,
}: ViewerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { viewportRef, handlers, slideStyle, distance } = useSwipeTrack({
    count: images.length,
    index: current,
    onIndexChange: onChange,
    reducedMotion,
  });
  const total = images.length;

  return (
    <div
      ref={viewportRef}
      {...handlers}
      className={`relative touch-pan-y touch-pinch-zoom overflow-hidden select-none ${className}`}
    >
      {images.map((slide, index) => (
        <div
          key={slide.src}
          data-slide
          aria-hidden={index !== current}
          className="absolute inset-0 will-change-transform"
          style={slideStyle(index)}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            draggable={false}
            // Las vecinas se cargan antes de llegar a verse al deslizar.
            loading={distance(index) <= 1 ? "eager" : "lazy"}
            fetchPriority={highPriorityFirst && index === 0 ? "high" : undefined}
            className={imageClassName}
          />
        </div>
      ))}
      {children}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => onChange(current - 1)}
            aria-label="Imagen anterior"
            aria-disabled={current === 0}
            className={`${navButtonClass} absolute top-1/2 left-3 -translate-y-1/2 ${arrowsClassName}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onChange(current + 1)}
            aria-label="Imagen siguiente"
            aria-disabled={current === total - 1}
            className={`${navButtonClass} absolute top-1/2 right-3 -translate-y-1/2 ${arrowsClassName}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
