"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Enlaces a secciones ("/#servicios"): hacen scroll sin dejar el ancla en la URL.
 * Los href conservan el ancla, así funcionan sin JavaScript y al abrirlos en otra pestaña.
 */
export function HashlessSectionLinks() {
  const pathname = usePathname();

  // Misma página: se intercepta el clic antes que next/link (fase de captura) y solo se hace scroll.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      // "#contenido" (saltar al contenido) debe mover el foco: se deja el comportamiento nativo.
      if (link.getAttribute("href")?.startsWith("#")) return;
      const url = new URL(link.href);
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Llegada desde otra página (/trabajos → /#contacto): el scroll ya ocurrió; se limpia la URL.
  useEffect(() => {
    if (!location.hash) return;
    const frame = requestAnimationFrame(() =>
      history.replaceState(history.state, "", location.pathname + location.search),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
