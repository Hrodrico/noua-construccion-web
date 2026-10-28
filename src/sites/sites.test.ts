import { describe, expect, it } from "vitest";
import { sites } from "./index";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contraste WCAG 2.x entre dos colores hex. */
function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i);

describe.each(Object.entries(sites))("sitio %s", (_, { config, content }) => {
  describe("config", () => {
    it("tiene una URL absoluta sin / final", () => {
      expect(config.url).toMatch(/^https?:\/\/[^/]+(\/.*[^/])?$/);
    });

    it("define todos los colores del tema en hex de 6 dígitos", () => {
      for (const color of Object.values(config.theme)) {
        expect(color).toMatch(HEX_COLOR);
      }
    });

    it.each([
      ["foreground", "background"],
      ["muted", "background"],
      ["primaryForeground", "primary"],
      ["accentForeground", "accent"],
    ] as const)("contraste %s sobre %s >= 4.5 (WCAG AA)", (text, bg) => {
      expect(contrast(config.theme[text], config.theme[bg])).toBeGreaterThanOrEqual(4.5);
    });

    it("no repite redes sociales", () => {
      expect(duplicates(config.social.map((link) => link.network))).toEqual([]);
    });
  });

  describe("content", () => {
    it("no repite slugs de trabajos ni ids de servicios y reseñas", () => {
      expect(duplicates(content.projects.map((p) => p.slug))).toEqual([]);
      expect(duplicates(content.services.map((s) => s.id))).toEqual([]);
      expect(duplicates(content.reviews.map((r) => r.id))).toEqual([]);
    });

    it("usa slugs aptos para URL", () => {
      for (const project of content.projects) {
        expect(project.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      }
    });

    it("usa fechas ISO (YYYY-MM-DD)", () => {
      const dates = [...content.projects, ...content.reviews].flatMap((item) => item.date ?? []);
      for (const date of dates) {
        expect(date).toMatch(ISO_DATE);
        expect(Number.isNaN(Date.parse(date))).toBe(false);
      }
    });

    it("califica las reseñas con enteros de 1 a 5", () => {
      for (const review of content.reviews) {
        expect(Number.isInteger(review.rating)).toBe(true);
        expect(review.rating).toBeGreaterThanOrEqual(1);
        expect(review.rating).toBeLessThanOrEqual(5);
      }
    });

    it("enlaza reseñas solo a trabajos existentes", () => {
      const slugs = new Set(content.projects.map((p) => p.slug));
      for (const review of content.reviews) {
        if (review.projectSlug) expect(slugs).toContain(review.projectSlug);
      }
    });

    it("describe todas las imágenes con alt", () => {
      const images = [
        content.hero.image,
        content.about.image,
        ...content.services.map((s) => s.image),
        ...content.projects.flatMap((p) => [p.cover, ...p.gallery]),
      ].filter((image) => image !== undefined);

      for (const image of images) {
        expect(image.alt.trim()).not.toBe("");
      }
    });
  });
});
