import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  const items = [
    { label: "Inicio", href: "/" },
    { label: "Listado", href: "/listado" },
    { label: "Detalle", href: "/listado/detalle" },
  ];

  it("enlaza los niveles anteriores y marca la página actual sin enlace", () => {
    render(<Breadcrumbs items={items} />);

    expect(screen.getByRole("navigation", { name: "Ruta de navegación" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Listado" })).toHaveAttribute("href", "/listado");
    expect(screen.queryByRole("link", { name: "Detalle" })).not.toBeInTheDocument();
    expect(screen.getByText("Detalle")).toHaveAttribute("aria-current", "page");
  });
});
