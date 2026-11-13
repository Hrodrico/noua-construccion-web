import { describe, expect, it } from "vitest";
import type { ThemeColors } from "@/types/site";
import { themeToCssVars } from "./theme";

const theme: ThemeColors = {
  primary: "#000001",
  primaryForeground: "#000002",
  accent: "#000003",
  accentForeground: "#000004",
  accentText: "#00000a",
  background: "#000005",
  foreground: "#000006",
  surface: "#000007",
  muted: "#000008",
  border: "#000009",
};

describe("themeToCssVars", () => {
  it("expone cada color como variable --brand-* en kebab-case", () => {
    expect(themeToCssVars(theme)).toEqual({
      "--brand-primary": "#000001",
      "--brand-primary-foreground": "#000002",
      "--brand-accent": "#000003",
      "--brand-accent-foreground": "#000004",
      "--brand-accent-text": "#00000a",
      "--brand-background": "#000005",
      "--brand-foreground": "#000006",
      "--brand-surface": "#000007",
      "--brand-muted": "#000008",
      "--brand-border": "#000009",
    });
  });

  it("agrega las variables --brand-dark-* solo si hay paleta oscura", () => {
    const dark: ThemeColors = { ...theme, primary: "#ffffff", border: "#fffffe" };
    const vars = themeToCssVars(theme, dark) as Record<string, string>;

    expect(vars["--brand-primary"]).toBe("#000001");
    expect(vars["--brand-dark-primary"]).toBe("#ffffff");
    expect(vars["--brand-dark-border"]).toBe("#fffffe");
    expect(Object.keys(vars)).toHaveLength(20);
    expect(Object.keys(themeToCssVars(theme)).some((key) => key.startsWith("--brand-dark-"))).toBe(false);
  });
});
