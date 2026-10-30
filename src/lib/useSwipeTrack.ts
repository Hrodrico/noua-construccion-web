import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import {
  criticalSpring,
  releaseTarget,
  releaseVelocity,
  rubberband,
  wrapIndex,
  wrapOffset,
  type PointerSample,
} from "@/lib/swipe";

type Options = {
  count: number;
  /** Imagen activa (controlada por el componente). */
  index: number;
  onIndexChange: (index: number) => void;
  /** Tras la última vuelve a la primera; sin loop, los bordes ofrecen resistencia. */
  loop?: boolean;
  reducedMotion?: boolean;
};

type Gesture = {
  pointerId: number;
  startX: number;
  startY: number;
  startPosition: number;
  origin: number;
  width: number;
  locked: boolean;
  samples: PointerSample[];
};

/** Segundos del resorte para llegar al destino (Apple: 0.3–0.4 en desplazamientos). */
const RESPONSE = 0.35;
/** Píxeles antes de decidir si el gesto es horizontal (carrusel) o vertical (scroll). */
const LOCK_DISTANCE = 10;

/**
 * Carrusel que sigue al dedo 1:1, proyecta la inercia al soltar y termina con un resorte
 * sin rebote que hereda la velocidad del gesto. Se puede agarrar en pleno movimiento.
 * Las posiciones se aplican directo al DOM (sin re-render por cuadro) sobre los
 * elementos con `data-slide` dentro de `viewportRef`.
 */
export function useSwipeTrack({ count, index, onIndexChange, loop = false, reducedMotion = false }: Options) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const motion = useRef({ position: index, velocity: 0, target: index });
  const frame = useRef<number | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  // La posición inicial va en el HTML del servidor; después solo la mueve el DOM.
  const [initialIndex] = useState(index);

  const offsetOf = (slide: number, position: number) =>
    loop ? wrapOffset(slide - position, count) : slide - position;

  const paint = (position: number) => {
    viewportRef.current?.querySelectorAll<HTMLElement>("[data-slide]").forEach((slide, i) => {
      slide.style.transform = `translate3d(${offsetOf(i, position) * 100}%, 0, 0)`;
    });
  };

  const stop = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  const animateTo = (target: number, velocity = motion.current.velocity) => {
    stop();
    const state = motion.current;
    state.target = target;

    if (reducedMotion) {
      Object.assign(state, { position: target, velocity: 0 });
      paint(target);
      return;
    }

    const from = { position: state.position, velocity };
    const start = performance.now();
    const tick = (now: number) => {
      const next = criticalSpring(from, target, RESPONSE, Math.max(0, now - start) / 1000);
      const settled = Math.abs(next.position - target) < 0.0005 && Math.abs(next.velocity) < 0.01;
      if (settled) {
        // En loop la posición crece sin límite; se normaliza al llegar (no cambia lo visible).
        const shift = loop ? target - wrapIndex(target, count) : 0;
        Object.assign(state, { position: target - shift, velocity: 0, target: target - shift });
      } else {
        Object.assign(state, next);
      }
      paint(state.position);
      frame.current = settled ? null : requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  const clampTarget = (target: number) => (loop ? target : Math.min(count - 1, Math.max(0, target)));

  const commit = (target: number, velocity?: number) => {
    animateTo(target, velocity);
    onIndexChange(wrapIndex(target, count));
  };

  /** Avanza o retrocede una imagen en esa dirección (en loop, incluso con solo dos). */
  const step = (direction: 1 | -1) => commit(clampTarget(motion.current.target + direction));

  // Cambios externos (puntos, miniaturas, teclado): ir por el camino más corto.
  const followIndex = useEffectEvent((next: number) => {
    const { target } = motion.current;
    if (wrapIndex(target, count) === next) return;
    animateTo(loop ? target + wrapOffset(next - target, count) : next);
  });

  useEffect(() => followIndex(index), [index]);

  useEffect(() => stop, []);

  const finishGesture = (event: PointerEvent, cancelled: boolean) => {
    const current = gesture.current;
    if (!current || event.pointerId !== current.pointerId) return;
    gesture.current = null;

    // Un toque sin arrastre: retoma el movimiento que se había detenido al tocar.
    if (!current.locked) {
      animateTo(motion.current.target);
      return;
    }

    setDragging(false);
    suppressClick.current = true;
    const pixelsPerSecond = cancelled ? 0 : releaseVelocity(current.samples, event.timeStamp);
    const velocity = -pixelsPerSecond / current.width;
    commit(clampTarget(releaseTarget(motion.current.position, velocity, current.origin)), velocity);
  };

  const handlers = {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      suppressClick.current = false;
      const width = viewportRef.current?.clientWidth;
      if (count < 2 || !event.isPrimary || event.button !== 0 || !width) return;

      // Se agarra la imagen donde está ahora, aunque esté en movimiento.
      stop();
      gesture.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startPosition: motion.current.position,
        origin: motion.current.target,
        width,
        locked: false,
        samples: [{ x: event.clientX, time: event.timeStamp }],
      };
    },
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      const current = gesture.current;
      if (!current || event.pointerId !== current.pointerId) return;
      const dx = event.clientX - current.startX;
      const dy = event.clientY - current.startY;

      if (!current.locked) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < LOCK_DISTANCE) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          finishGesture(event, true);
          return;
        }
        current.locked = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
      }

      current.samples = [...current.samples.slice(-10), { x: event.clientX, time: event.timeStamp }];
      let position = current.startPosition - dx / current.width;
      if (!loop) {
        const edge = Math.min(count - 1, Math.max(0, position));
        position = edge + rubberband((position - edge) * current.width, current.width) / current.width;
      }
      motion.current.position = position;
      paint(position);
    },
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => finishGesture(event, false),
    onPointerCancel: (event: PointerEvent<HTMLDivElement>) => finishGesture(event, true),
    // Soltar tras arrastrar no debe contar como clic (ej: abrir la pantalla completa).
    onClickCapture: (event: MouseEvent<HTMLDivElement>) => {
      if (!suppressClick.current) return;
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };

  /** Estilo inicial de cada imagen; después la posición la actualiza el hook. */
  const slideStyle = (slide: number): CSSProperties => ({
    transform: `translate3d(${offsetOf(slide, initialIndex) * 100}%, 0, 0)`,
  });

  /** Distancia de una imagen a la activa (para cargar antes las vecinas). */
  const distance = (slide: number) => Math.abs(offsetOf(slide, index));

  return { viewportRef, handlers, slideStyle, distance, step, dragging };
}
