"use client";

import { useEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

const SYSTEM_DARK = "(prefers-color-scheme: dark)";

// El tema vive en la clase .dark de <html> (la pone el script inicial): se lee de ahí.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const isDarkNow = () => document.documentElement.classList.contains("dark");
const isDarkOnServer = () => false;

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

function readStored() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Botón sol/luna que alterna entre modo claro y oscuro y recuerda la elección. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDarkNow, isDarkOnServer);

  // Sin elección guardada, el sitio sigue al sistema también si cambia con la página abierta.
  useEffect(() => {
    const media = matchMedia(SYSTEM_DARK);
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!readStored()) applyTheme(event.matches);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = !dark;
    applyTheme(next);
    try {
      // Si la elección coincide con el sistema se borra: así el sitio vuelve a seguirlo
      // (ej. el modo automático que cambia de claro a oscuro según la hora).
      if (next === matchMedia(SYSTEM_DARK).matches) localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Sin almacenamiento (modo privado): el cambio vale solo para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Modo oscuro"
      aria-pressed={dark}
      title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition hover:bg-accent/15 hover:text-accent-text"
    >
      {/* Los íconos se alternan por CSS (variante dark): así coinciden desde el primer pintado. */}
      <MoonIcon className="h-5 w-5 dark:hidden" />
      <SunIcon className="hidden h-5 w-5 dark:block" />
    </button>
  );
}
