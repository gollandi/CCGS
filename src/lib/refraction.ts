/** One finite score: anticipation, inversion, then an unmoving optical trace. */
export function openingScore(seconds: number) {
  if (seconds <= .5) return 0;
  if (seconds < 1.5) {
    const t = seconds - .5;
    return 1 - Math.pow(1 - t, 4);
  }
  if (seconds < 3) {
    const t = (seconds - 1.5) / 1.5;
    return 1 - .65 * (1 - Math.pow(1 - t, 3));
  }
  return .35;
}

export function lensIntent(distance: number) {
  const t = Math.max(0, Math.min(1, (distance - 6) / 64));
  return t * t * (3 - 2 * t);
}
