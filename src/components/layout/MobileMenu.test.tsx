import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/#contacto" },
];

describe("MobileMenu", () => {
  it("abre y cierra el menú con el botón", async () => {
    const user = userEvent.setup();
    render(<MobileMenu navigation={navigation} />);
    const button = screen.getByRole("button", { name: "Abrir menú" });

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Cerrar menú");
    expect(screen.getAllByRole("link")).toHaveLength(2);

    await user.click(button);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("se cierra al elegir un enlace", async () => {
    const user = userEvent.setup();
    render(<MobileMenu navigation={navigation} />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getByRole("link", { name: "Servicios" }));

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
