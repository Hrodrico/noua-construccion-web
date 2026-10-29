"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageAsset } from "@/types/content";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "@/components/ui/icons";

type Props = {
  images: ImageAsset[];
  /** Nombre accesible de la galería, ej: el título del trabajo. */
  label: string;
  className?: string;
};

const SWIPE_THRESHOLD = 50;

const navButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition hover:bg-background";

/**
 * Galería con imagen principal, miniaturas y vista a pantalla completa (sin recorte)
 * para ver los detalles. Se navega con botones, teclas ← → y deslizando en móvil.
 */
export function ImageGallery({ images, label, className = "" }: Props) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const image = images[current];
  const go = (index: number) => setCurrent((index + total) % total);

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

  const swipeHandlers = {
    onTouchStart: (event: React.TouchEvent) => {
      touchStartX.current = event.touches[0].clientX;
    },
    onTouchEnd: (event: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > SWIPE_THRESHOLD) go(current + (delta < 0 ? 1 : -1));
      touchStartX.current = null;
    },
  };

  const arrows = (variant: "stage" | "dialog") =>
    total > 1 && (
      <>
        <button
          type="button"
          onClick={() => go(current - 1)}
          aria-label="Imagen anterior"
          className={`${navButtonClass} absolute top-1/2 left-3 -translate-y-1/2 ${variant === "dialog" ? "sm:left-6" : ""}`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(current + 1)}
          aria-label="Imagen siguiente"
          className={`${navButtonClass} absolute top-1/2 right-3 -translate-y-1/2 ${variant === "dialog" ? "sm:right-6" : ""}`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </>
    );

  return (
    <div role="region" aria-roledescription="galería" aria-label={label} className={className}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface" {...swipeHandlers}>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={`Ver en pantalla completa: ${image.alt}`}
          className="group absolute inset-0 cursor-zoom-in"
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            loading={current === 0 ? "eager" : undefined}
            fetchPriority={current === 0 ? "high" : undefined}
            className="object-cover"
          />
          <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition group-hover:bg-background">
            <ExpandIcon className="h-5 w-5" />
          </span>
        </button>
        {arrows("stage")}
        {total > 1 && (
          <p
            aria-live="polite"
            className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-sm font-medium text-foreground shadow"
          >
            {current + 1} / {total}
          </p>
        )}
      </div>

      {total > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((thumb, index) => (
            <li key={thumb.src}>
              <button
                type="button"
                onClick={() => go(index)}
                aria-label={`Ver imagen ${index + 1}: ${thumb.alt}`}
                aria-current={index === current}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition ${
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
            <div className="relative flex-1" {...swipeHandlers}>
              <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
              {arrows("dialog")}
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Cerrar"
                className={`${navButtonClass} absolute top-4 right-4`}
                autoFocus
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
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
