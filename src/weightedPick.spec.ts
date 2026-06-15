import { describe, expect, it } from 'vitest';

import { SeededRNG } from './SeededRNG.js';
import { weightedPick } from './weightedPick.js';

describe('weightedPick', () => {
  it('respects zero-weight items', () => {
    const rng = new SeededRNG('weighted-zero');
    const pick = weightedPick(['a', 'b', 'c'], [0, 1, 0], rng);
    expect(pick).toBe('b');
  });

  it('distribution stays within statistical margin at N=100k', () => {
    const rng = new SeededRNG('weighted-dist');
    const counts = { a: 0, b: 0, c: 0 };
    const weights = [1, 2, 7];
    const total = weights.reduce((s, w) => s + w, 0);

    for (let i = 0; i < 100_000; i++) {
      const pick = weightedPick(['a', 'b', 'c'], weights, rng);
      counts[pick]++;
    }

    const expectedA = (weights[0] / total) * 100_000;
    const expectedB = (weights[1] / total) * 100_000;
    const expectedC = (weights[2] / total) * 100_000;
    const margin = 0.02 * 100_000;

    expect(counts.a).toBeGreaterThan(expectedA - margin);
    expect(counts.a).toBeLessThan(expectedA + margin);
    expect(counts.b).toBeGreaterThan(expectedB - margin);
    expect(counts.b).toBeLessThan(expectedB + margin);
    expect(counts.c).toBeGreaterThan(expectedC - margin);
    expect(counts.c).toBeLessThan(expectedC + margin);
  });
});
