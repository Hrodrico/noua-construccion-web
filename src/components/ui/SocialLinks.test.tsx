import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialLinks } from "./SocialLinks";

describe("SocialLinks", () => {
  it("no renderiza nada sin enlaces", () => {
    const { container } = render(<SocialLinks links={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("abre cada red en otra pestaña de forma segura", () => {
    render(<SocialLinks links={[{ network: "instagram", url: "https://instagram.com/negocio" }]} />);
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "https://instagram.com/negocio");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleName();
  });
});
