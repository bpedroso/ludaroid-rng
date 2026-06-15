import { hashStringToU32 } from './seedHash.js';
/**
 * Deterministic Pseudo-Random Number Generator (Mulberry32).
 */
export class SeededRNG {
    state;
    constructor(seed) {
        this.state = hashStringToU32(seed);
        if (this.state === 0) {
            this.state = 1;
        }
    }
    next() {
        this.state = (this.state + 0x6d2b79f5) >>> 0;
        let t = this.state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    nextRange(min, max) {
        const range = max - min + 1;
        return min + Math.floor(this.next() * range);
    }
}
