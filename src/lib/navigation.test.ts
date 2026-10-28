import { describe, expect, it } from "vitest";
import type { SiteConfig } from "@/types/site";
import { buildNavigation, sectionIds } from "./navigation";

const labels: SiteConfig["labels"] = {
  about: "Nosotros",
  services: "Servicios",
  projects: "Trabajos",
  reviews: "Reseñas",
  contact: "Contacto",
};

function configWith(sections: SiteConfig["sections"]) {
  return { sections, labels } as SiteConfig;
}

describe("buildNavigation", () => {
  it("incluye todas las secciones activas en orden", () => {
    const navigation = buildNavigation(
      configWith({ about: true, services: true, projects: true, reviews: true, contact: true }),
    );

    expect(navigation).toEqual([
      { label: "Nosotros", href: `/#${sectionIds.about}` },
      { label: "Servicios", href: `/#${sectionIds.services}` },
      { label: "Trabajos", href: "/trabajos" },
      { label: "Reseñas", href: `/#${sectionIds.reviews}` },
      { label: "Contacto", href: `/#${sectionIds.contact}` },
    ]);
  });

  it("omite las secciones desactivadas", () => {
    const navigation = buildNavigation(
      configWith({ about: false, services: true, projects: false, reviews: false, contact: true }),
    );

    expect(navigation.map((item) => item.label)).toEqual(["Servicios", "Contacto"]);
  });
});
