/**
 * Deterministic Pseudo-Random Number Generator (Mulberry32).
 */
export declare class SeededRNG {
    private state;
    constructor(seed: string);
    next(): number;
    nextRange(min: number, max: number): number;
}
//# sourceMappingURL=SeededRNG.d.ts.map