import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImageCarousel } from "./ImageCarousel";

const images = [
  { src: "/uno.jpg", alt: "Primera foto" },
  { src: "/dos.jpg", alt: "Segunda foto" },
  { src: "/tres.jpg", alt: "Tercera foto" },
];

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
}

const visibleImage = () => screen.getByRole("img");

describe("ImageCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockReducedMotion(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("muestra solo la imagen activa a lectores de pantalla", () => {
    render(<ImageCarousel images={images} label="Obras" sizes="100vw" />);
    expect(visibleImage()).toHaveAccessibleName("Primera foto");
  });

  it("navega con los botones y vuelve al inicio después de la última", () => {
    render(<ImageCarousel images={images} label="Obras" sizes="100vw" />);

    fireEvent.click(screen.getByRole("button", { name: "Imagen anterior" }));
    expect(visibleImage()).toHaveAccessibleName("Tercera foto");

    fireEvent.click(screen.getByRole("button", { name: "Imagen siguiente" }));
    expect(visibleImage()).toHaveAccessibleName("Primera foto");

    fireEvent.click(screen.getByRole("button", { name: "Ver imagen 2" }));
    expect(visibleImage()).toHaveAccessibleName("Segunda foto");
  });

  it("avanza solo y se detiene con el botón de pausa", () => {
    render(<ImageCarousel images={images} label="Obras" sizes="100vw" interval={1000} />);

    act(() => vi.advanceTimersByTime(1000));
    expect(visibleImage()).toHaveAccessibleName("Segunda foto");

    fireEvent.click(screen.getByRole("button", { name: "Pausar carrusel" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(visibleImage()).toHaveAccessibleName("Segunda foto");
    expect(screen.getByRole("button", { name: "Reanudar carrusel" })).toBeInTheDocument();
  });

  it("no avanza solo si el sistema pide reducir el movimiento", () => {
    mockReducedMotion(true);
    render(<ImageCarousel images={images} label="Obras" sizes="100vw" interval={1000} />);

    act(() => vi.advanceTimersByTime(3000));
    expect(visibleImage()).toHaveAccessibleName("Primera foto");
  });
});
