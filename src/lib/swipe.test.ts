import { describe, expect, it } from "vitest";
import {
  criticalSpring,
  projectMomentum,
  releaseTarget,
  releaseVelocity,
  rubberband,
  wrapIndex,
  wrapOffset,
} from "./swipe";

describe("wrapIndex y wrapOffset", () => {
  it("normaliza índices negativos y mayores que el total", () => {
    expect(wrapIndex(-1, 3)).toBe(2);
    expect(wrapIndex(4, 3)).toBe(1);
  });

  it("elige el camino más corto en el ciclo", () => {
    expect(wrapOffset(2, 3)).toBe(-1);
    expect(wrapOffset(-2, 3)).toBe(1);
    expect(wrapOffset(1, 4)).toBe(1);
  });
});

describe("projectMomentum", () => {
  it("proyecta la inercia en la dirección del gesto", () => {
    expect(projectMomentum(1000)).toBeCloseTo(499, 0);
    expect(projectMomentum(-1000)).toBeCloseTo(-499, 0);
    expect(projectMomentum(0)).toBe(0);
  });
});

describe("rubberband", () => {
  it("resiste cada vez más y nunca supera la distancia arrastrada", () => {
    const small = rubberband(50, 400);
    const large = rubberband(400, 400);
    expect(small).toBeLessThan(50);
    expect(large).toBeLessThan(400);
    expect(large / 400).toBeLessThan(small / 50);
    expect(rubberband(-50, 400)).toBeCloseTo(-small);
  });
});

describe("criticalSpring", () => {
  it("llega al destino sin pasarse", () => {
    const from = { position: 0, velocity: 0 };
    const positions = [0.1, 0.2, 0.35, 1].map((t) => criticalSpring(from, 1, 0.35, t).position);
    expect(positions.every((value) => value <= 1)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(positions.at(-1)).toBeCloseTo(1, 3);
  });

  it("conserva la velocidad inicial del gesto", () => {
    expect(criticalSpring({ position: 0, velocity: 3 }, 1, 0.35, 0).velocity).toBeCloseTo(3);
  });
});

describe("releaseVelocity", () => {
  it("mide la velocidad reciente en unidades por segundo", () => {
    const samples = [
      { x: 0, time: 0 },
      { x: 10, time: 950 },
      { x: 60, time: 1000 },
    ];
    expect(releaseVelocity(samples, 1000)).toBe(1000);
  });

  it("es cero si el puntero se detuvo antes de soltar", () => {
    expect(releaseVelocity([{ x: 0, time: 0 }, { x: 50, time: 10 }], 500)).toBe(0);
  });
});

describe("releaseTarget", () => {
  it("vuelve a su lugar si el gesto es lento y corto", () => {
    expect(releaseTarget(0.3, 0, 0)).toBe(0);
  });

  it("avanza con un gesto corto pero rápido", () => {
    expect(releaseTarget(0.2, 1.5, 0)).toBe(1);
    expect(releaseTarget(-0.2, -1.5, 0)).toBe(-1);
  });

  it("avanza como mucho una imagen", () => {
    expect(releaseTarget(0.4, 20, 0)).toBe(1);
  });
});
