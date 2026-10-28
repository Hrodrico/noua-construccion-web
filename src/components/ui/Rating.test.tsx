import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("anuncia la calificación a lectores de pantalla", () => {
    render(<Rating value={4} />);
    expect(screen.getByRole("img", { name: "4 de 5 estrellas" })).toBeInTheDocument();
  });

  it("dibuja tantas estrellas como el máximo", () => {
    render(<Rating value={2} max={3} />);
    expect(screen.getByRole("img").querySelectorAll("svg")).toHaveLength(3);
  });
});
