import { fireEvent, render, screen } from "@testing-library/react";
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
// jsdom no ejecuta animaciones CSS: se simula el fin de la barra de progreso. Sin AnimationEvent
// en jsdom, React escucha el nombre con prefijo (en el navegador usa "animationend").
const finishProgress = (container: HTMLElement) =>
  fireEvent(
    container.querySelector("[data-carousel-progress]")!,
    new Event("webkitAnimationEnd", { bubbles: true }),
  );
const progressState = (container: HTMLElement) =>
  container.querySelector<HTMLElement>("[data-carousel-progress]")!.style.animationPlayState;

describe("ImageCarousel", () => {
  beforeEach(() => mockReducedMotion(false));

  afterEach(() => vi.unstubAllGlobals());

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

  it("avanza al completarse la barra de progreso y la congela con el botón de pausa", () => {
    const { container } = render(
      <ImageCarousel images={images} label="Obras" sizes="100vw" interval={1000} />,
    );

    expect(container.querySelector<HTMLElement>("[data-carousel-progress]")!.style.animation).toContain("1000ms");
    expect(progressState(container)).toBe("running");
    finishProgress(container);
    expect(visibleImage()).toHaveAccessibleName("Segunda foto");

    fireEvent.click(screen.getByRole("button", { name: "Pausar carrusel" }));
    expect(progressState(container)).toBe("paused");
    expect(screen.getByRole("button", { name: "Reanudar carrusel" })).toBeInTheDocument();
  });

  it("no anima la barra si el sistema pide reducir el movimiento", () => {
    mockReducedMotion(true);
    const { container } = render(<ImageCarousel images={images} label="Obras" sizes="100vw" />);

    expect(container.querySelector<HTMLElement>("[data-carousel-progress]")!.style.animation).toBe("");
    expect(visibleImage()).toHaveAccessibleName("Primera foto");
  });
});
