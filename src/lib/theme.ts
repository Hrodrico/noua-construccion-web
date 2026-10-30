import type { CSSProperties } from "react";
import type { ThemeColors } from "@/types/site";

/** Convierte los colores del negocio en variables CSS (--brand-*), leídas por globals.css. */
export function themeToCssVars(theme: ThemeColors): CSSProperties {
  return {
    "--brand-primary": theme.primary,
    "--brand-primary-foreground": theme.primaryForeground,
    "--brand-accent": theme.accent,
    "--brand-accent-foreground": theme.accentForeground,
    "--brand-accent-text": theme.accentText,
    "--brand-background": theme.background,
    "--brand-foreground": theme.foreground,
    "--brand-surface": theme.surface,
    "--brand-muted": theme.muted,
    "--brand-border": theme.border,
  } as CSSProperties;
}
