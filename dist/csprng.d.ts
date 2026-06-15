export interface CSPRNG {
    nextU32(): number;
    nextFloat(): number;
}
export declare function createCSPRNG(): CSPRNG;
export declare function randomSessionSeed(): string;
//# sourceMappingURL=csprng.d.ts.map