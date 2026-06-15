import { describe, expect, it } from 'vitest';

import { SeededRNG } from './SeededRNG.js';
import { hashStringToU32 } from './seedHash.js';

describe('hashStringToU32', () => {
  it('is deterministic', () => {
    expect(hashStringToU32('ludaroid')).toBe(hashStringToU32('ludaroid'));
    expect(hashStringToU32('')).toBe(5381);
  });
});

describe('SeededRNG golden vectors', () => {
  it('matches legacy ludaroid-api sequence for test-seed', () => {
    const rng = new SeededRNG('test-seed');
    const values = [rng.next(), rng.next(), rng.next(), rng.next(), rng.next()];
    expect(values).toEqual([
      0.24131970526650548,
      0.7185699138790369,
      0.38702796935103834,
      0.06833476573228836,
      0.6643865404184908,
    ]);
  });

  it('matches legacy sequence for ludaroid-golden', () => {
    const rng = new SeededRNG('ludaroid-golden');
    const values = [rng.next(), rng.next(), rng.next(), rng.next(), rng.next()];
    expect(values).toEqual([
      0.04519915906712413,
      0.12748744641430676,
      0.3877823872026056,
      0.8451974433846772,
      0.9846418879460543,
    ]);
  });

  it('nextRange stays within bounds', () => {
    const rng = new SeededRNG('range-test');
    for (let i = 0; i < 1000; i++) {
      const value = rng.nextRange(3, 7);
      expect(value).toBeGreaterThanOrEqual(3);
      expect(value).toBeLessThanOrEqual(7);
    }
  });
});
