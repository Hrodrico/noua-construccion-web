import { describe, expect, it } from "vitest";
import generated from "@/generated/image-placeholders.json";
import { activeSite } from "@/sites";
import { withPlaceholder, withPlaceholders } from "./images";

const [localSrc, localBlur] = Object.entries(generated)[0];

describe("withPlaceholder", () => {
  it("agrega la vista previa generada a una imagen local", () => {
    expect(withPlaceholder({ src: localSrc, alt: "Foto" }).blurDataURL).toBe(localBlur);
  });

  it("respeta una vista previa propia", () => {
    const image = { src: localSrc, alt: "Foto", blurDataURL: "data:image/webp;base64,AAAA" };
    expect(withPlaceholder(image)).toEqual(image);
  });

  it("deja igual una imagen sin vista previa generada", () => {
    const image = { src: "https://example.com/foto.webp", alt: "Foto" };
    expect(withPlaceholder(image)).toEqual(image);
  });
});

describe("withPlaceholders", () => {
  it("no modifica el contenido original", () => {
    const before = JSON.stringify(activeSite.content);
    withPlaceholders(activeSite.content);
    expect(JSON.stringify(activeSite.content)).toBe(before);
  });
});
