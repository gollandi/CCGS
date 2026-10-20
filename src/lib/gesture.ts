/** Only deliberate pulls reveal content; cancelled gestures never do. */
export function shouldReveal(deltaX: number, deltaY: number, cancelled = false): boolean {
  return !cancelled && Math.hypot(deltaX, deltaY) >= 48;
}

/** Bound deformation even when a captured pointer moves outside the artwork. */
export function getPull(deltaX: number, deltaY: number) {
  return {
    x: Math.max(-1.4, Math.min(1.4, deltaX / 160)),
    y: Math.max(-1.2, Math.min(1.2, -deltaY / 160)),
  };
}
