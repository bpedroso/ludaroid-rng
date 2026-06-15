import { SeededRNG } from './SeededRNG.js';

/** Returns true when rng.next() < threshold (threshold in [0, 1]). */
export function roll(rng: SeededRNG, threshold: number): boolean {
  if (threshold <= 0) return false;
  if (threshold >= 1) return true;
  return rng.next() < threshold;
}
