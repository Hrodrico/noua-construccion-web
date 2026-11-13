import type { CSSProperties } from "react";
import type { ThemeColors } from "@/types/site";

const roles = {
  primary: "primary",
  primaryForeground: "primary-foreground",
  accent: "accent",
  accentForeground: "accent-foreground",
  accentText: "accent-text",
  background: "background",
  foreground: "foreground",
  surface: "surface",
  muted: "muted",
  border: "border",
} as const satisfies Record<keyof ThemeColors, string>;

/**
 * Convierte los colores del negocio en variables CSS leídas por globals.css:
 * --brand-* para el modo claro y, si hay paleta oscura, --brand-dark-* para el oscuro.
 */
export function themeToCssVars(theme: ThemeColors, darkTheme?: ThemeColors): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, name] of Object.entries(roles) as [keyof ThemeColors, string][]) {
    vars[`--brand-${name}`] = theme[key];
    if (darkTheme) vars[`--brand-dark-${name}`] = darkTheme[key];
  }
  return vars as CSSProperties;
}

/** Clave de localStorage con la elección del usuario ("light" | "dark"). */
export const THEME_STORAGE_KEY = "theme";

/**
 * Script que corre antes de pintar: aplica la clase .dark según la elección guardada o,
 * si no hay, la preferencia del sistema. Evita el destello del tema claro al cargar.
 */
export const themeInitScript = `try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(_){}`;
