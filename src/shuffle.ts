import { SeededRNG } from './SeededRNG.js';

export function shuffle<T>(rng: SeededRNG, array: readonly T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rng.nextRange(0, i);
    const tmp = copy[i] as T;
    copy[i] = copy[j] as T;
    copy[j] = tmp;
  }
  return copy;
}
