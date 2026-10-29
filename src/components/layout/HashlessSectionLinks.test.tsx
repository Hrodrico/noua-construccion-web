import Link from "next/link";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HashlessSectionLinks } from "./HashlessSectionLinks";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

afterEach(() => vi.restoreAllMocks());

function renderPage() {
  return render(
    <>
      <HashlessSectionLinks />
      <Link href="/#servicios">Servicios</Link>
      <a href="#contenido">Saltar</a>
      <section id="servicios" />
      <main id="contenido" />
    </>,
  );
}

describe("HashlessSectionLinks", () => {
  it("hace scroll a la sección de la misma página sin cambiar la URL", () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    renderPage();

    const notPrevented = fireEvent.click(screen.getByText("Servicios"));

    expect(notPrevented).toBe(false);
    expect(scrollIntoView).toHaveBeenCalledOnce();
    expect(location.hash).toBe("");
  });

  it("no intercepta el enlace para saltar al contenido", () => {
    renderPage();
    expect(fireEvent.click(screen.getByText("Saltar"))).toBe(true);
  });

  it("no intercepta clics con modificador (abrir en otra pestaña)", () => {
    renderPage();
    expect(fireEvent.click(screen.getByText("Servicios"), { metaKey: true })).toBe(true);
  });
});
