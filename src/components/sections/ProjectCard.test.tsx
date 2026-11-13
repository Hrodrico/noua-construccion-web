import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/types/content";
import { ProjectCard } from "./ProjectCard";

const project: Project = {
  slug: "remodelacion-cocina",
  title: "Remodelación de cocina",
  summary: "Cocina abierta con isla.",
  description: [],
  gallery: [],
};

describe("ProjectCard", () => {
  it("enlaza al detalle del trabajo", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/trabajos/remodelacion-cocina");
    expect(screen.getByRole("heading", { name: "Remodelación de cocina" })).toBeInTheDocument();
  });

  it("une categoría y ubicación cuando existen", () => {
    render(<ProjectCard project={{ ...project, category: "Cocinas", location: "Ñuñoa" }} />);
    expect(screen.getByText("Cocinas · Ñuñoa")).toBeInTheDocument();
  });

  it("muestra el enlace al pie con la etiqueta recibida o la por defecto", () => {
    const { rerender } = render(<ProjectCard project={project} />);
    expect(screen.getByText("Ver más")).toBeInTheDocument();
    rerender(<ProjectCard project={project} viewLabel="Ver obra" />);
    expect(screen.getByText("Ver obra")).toBeInTheDocument();
  });
});
