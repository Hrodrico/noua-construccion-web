// Física de los carruseles deslizables (ver useSwipeTrack). Las posiciones van en
// "imágenes" (1 = el ancho del visor) para no depender del tamaño en pantalla.

export type SpringState = { position: number; velocity: number };

export type PointerSample = { x: number; time: number };

/** Índice dentro de [0, count), también para valores negativos o fraccionarios. */
export function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

/** Distancia con signo por el camino más corto en un ciclo de `count` imágenes: [-count/2, count/2). */
export function wrapOffset(offset: number, count: number) {
  return wrapIndex(offset + count / 2, count) - count / 2;
}

/**
 * Distancia extra que recorre un gesto soltado a `velocity` (unidades/s) hasta detenerse,
 * con la desaceleración exponencial de iOS (0.998 = scroll normal).
 */
export function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Resistencia progresiva al arrastrar más allá de un borde: cuanto más lejos, menos sigue al dedo. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/**
 * Resorte críticamente amortiguado (sin rebote), evaluado de forma exacta tras `elapsed` s.
 * `response` es el parámetro de Apple: segundos aproximados para llegar al destino.
 * Parte de la posición y velocidad actuales, así que se puede redirigir en cualquier momento.
 */
export function criticalSpring(from: SpringState, target: number, response: number, elapsed: number): SpringState {
  const omega = (2 * Math.PI) / response;
  const offset = from.position - target;
  const slope = from.velocity + omega * offset;
  const decay = Math.exp(-omega * elapsed);
  return {
    position: target + (offset + slope * elapsed) * decay,
    velocity: (slope - omega * (offset + slope * elapsed)) * decay,
  };
}

/** Velocidad (unidades/s) del puntero en los últimos `window` ms antes de soltar; 0 si se detuvo. */
export function releaseVelocity(samples: PointerSample[], now: number, window = 100) {
  const recent = samples.filter((sample) => now - sample.time <= window);
  if (recent.length < 2) return 0;
  const first = recent[0];
  const last = recent[recent.length - 1];
  const elapsed = last.time - first.time;
  return elapsed > 0 ? ((last.x - first.x) / elapsed) * 1000 : 0;
}

/**
 * Imagen donde termina un gesto: se proyecta la inercia desde la posición al soltar y se
 * elige la imagen más cercana a ese punto, avanzando como mucho una desde `origin`.
 */
export function releaseTarget(position: number, velocity: number, origin: number) {
  const projected = Math.round(position + projectMomentum(velocity));
  return Math.min(origin + 1, Math.max(origin - 1, projected));
}
