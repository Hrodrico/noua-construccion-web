import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { ImageGallery } from "./ImageGallery";

const images = [
  { src: "/uno.jpg", alt: "Primera foto" },
  { src: "/dos.jpg", alt: "Segunda foto" },
  { src: "/tres.jpg", alt: "Tercera foto" },
];

// jsdom no implementa el modo modal de <dialog>.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

const stage = () => screen.getByRole("button", { name: /^Ver en pantalla completa/ });

describe("ImageGallery", () => {
  it("muestra la primera imagen y una miniatura por foto", () => {
    render(<ImageGallery images={images} label="Fotos de la obra" />);

    expect(stage()).toHaveAccessibleName("Ver en pantalla completa: Primera foto");
    expect(screen.getAllByRole("button", { name: /^Ver imagen/ })).toHaveLength(3);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("cambia de imagen con las flechas y las miniaturas", () => {
    render(<ImageGallery images={images} label="Fotos de la obra" />);

    fireEvent.click(screen.getByRole("button", { name: "Imagen anterior" }));
    expect(stage()).toHaveAccessibleName("Ver en pantalla completa: Tercera foto");

    fireEvent.click(screen.getByRole("button", { name: "Ver imagen 2: Segunda foto" }));
    expect(stage()).toHaveAccessibleName("Ver en pantalla completa: Segunda foto");
    expect(screen.getByRole("button", { name: "Ver imagen 2: Segunda foto" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("abre la pantalla completa, navega con el teclado y se cierra", () => {
    render(<ImageGallery images={images} label="Fotos de la obra" />);

    fireEvent.click(stage());
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("img")).toHaveAccessibleName("Primera foto");

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByRole("img")).toHaveAccessibleName("Segunda foto");

    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar" }));
    expect(dialog).not.toHaveAttribute("open");
  });
});
