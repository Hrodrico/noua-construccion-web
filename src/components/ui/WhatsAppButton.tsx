"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "./icons";

type Props = {
  href: string;
  /** Id de una sección que ya muestra WhatsApp: mientras esté en pantalla, el botón se oculta. */
  hideWhenVisible?: string;
};

/** Botón flotante de WhatsApp. */
export function WhatsAppButton({ href, hideWhenVisible }: Props) {
  const pathname = usePathname();
  // Se guarda la ruta donde se midió: al navegar, el valor de la página anterior deja de aplicar.
  const [overlap, setOverlap] = useState({ pathname, visible: false });
  const hidden = overlap.pathname === pathname && overlap.visible;

  // El layout no se vuelve a montar al navegar: se busca la sección en cada ruta.
  useEffect(() => {
    const target = hideWhenVisible ? document.getElementById(hideWhenVisible) : null;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverlap({ pathname, visible: entry.isIntersecting }),
      { threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideWhenVisible, pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition duration-300 hover:scale-105 motion-reduce:transition-none sm:right-6 sm:bottom-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
