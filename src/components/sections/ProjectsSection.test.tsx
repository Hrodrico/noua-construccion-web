import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/types/content";
import { ProjectsSection } from "./ProjectsSection";

const projects: Project[] = ["a", "b", "c", "d", "e"].map((slug) => ({
  slug,
  title: `Trabajo ${slug}`,
  summary: "Resumen.",
  description: [],
  gallery: [],
}));

function renderSection(items: Project[], visibleCount?: number) {
  render(<ProjectsSection id="trabajos" label="Trabajos" projects={items} visibleCount={visibleCount} showAllLink={false} />);
  return screen.getAllByRole("listitem");
}

describe("ProjectsSection", () => {
  it("muestra todos los trabajos sin visibleCount", () => {
    expect(renderSection(projects)).toHaveLength(5);
  });

  it("con un conteo impar agrega uno visible solo en 2 columnas", () => {
    const items = renderSection(projects, 3);
    expect(items).toHaveLength(4);
    expect(items[3]).toHaveClass("hidden", "sm:block", "lg:hidden");
    expect(items[2]).not.toHaveClass("hidden");
  });

  it("con un conteo par no agrega extras", () => {
    expect(renderSection(projects, 2)).toHaveLength(2);
  });

  it("no agrega extras si no hay más trabajos", () => {
    const items = renderSection(projects.slice(0, 3), 3);
    expect(items).toHaveLength(3);
    expect(items[2]).not.toHaveClass("hidden");
  });

  it("no renderiza nada sin trabajos", () => {
    const { container } = render(<ProjectsSection id="trabajos" label="Trabajos" projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
