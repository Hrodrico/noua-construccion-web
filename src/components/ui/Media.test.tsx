import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Media } from "./Media";

describe("Media", () => {
  it("muestra la imagen con su alt", () => {
    render(
      <Media image={{ src: "/foto.jpg", alt: "Cocina terminada" }} fallbackLabel="Cocina" sizes="100vw" />,
    );
    expect(screen.getByRole("img", { name: "Cocina terminada" })).toBeInTheDocument();
  });

  it("sin imagen muestra un marcador decorativo, oculto a lectores de pantalla", () => {
    render(<Media fallbackLabel="Cocina" sizes="100vw" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Cocina")).toHaveAttribute("aria-hidden", "true");
  });
});
