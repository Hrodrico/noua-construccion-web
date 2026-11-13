import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  const items = [
    { label: "Inicio", href: "/" },
    { label: "Listado", href: "/listado" },
    { label: "Detalle" },
  ];

  it("enlaza los niveles anteriores y marca la página actual sin enlace", () => {
    render(<Breadcrumbs items={items} />);

    expect(screen.getByRole("navigation", { name: "Ruta de navegación" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Listado" })).toHaveAttribute("href", "/listado");
    expect(screen.queryByRole("link", { name: "Detalle" })).not.toBeInTheDocument();
    expect(screen.getByText("Detalle")).toHaveAttribute("aria-current", "page");
  });

  it("puede terminar en un enlace, sin página actual ni separador final", () => {
    render(<Breadcrumbs items={items.slice(0, 2)} />);

    expect(screen.getByRole("link", { name: "Listado" })).toHaveAttribute("href", "/listado");
    expect(screen.getByRole("navigation").querySelector("[aria-current]")).toBeNull();
    expect(screen.getAllByRole("listitem")[1].querySelector("svg")).toBeNull();
  });

  it("pone el separador al final de cada nivel anterior, no al inicio del siguiente", () => {
    render(<Breadcrumbs items={items} />);
    const levels = screen.getAllByRole("listitem");

    expect(levels.map((li) => li.querySelector("svg") !== null)).toEqual([true, true, false]);
    expect(levels[0].lastElementChild?.tagName.toLowerCase()).toBe("svg");
  });
});
