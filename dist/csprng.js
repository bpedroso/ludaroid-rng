function readU32(buffer) {
    if (!globalThis.crypto?.getRandomValues) {
        throw new Error('CSPRNG unavailable: crypto.getRandomValues not found');
    }
    globalThis.crypto.getRandomValues(buffer);
    return buffer[0] ?? 0;
}
export function createCSPRNG() {
    const buffer = new Uint32Array(1);
    return {
        nextU32() {
            return readU32(buffer);
        },
        nextFloat() {
            return readU32(buffer) / 4294967296;
        },
    };
}
export function randomSessionSeed() {
    const csprng = createCSPRNG();
    return csprng.nextU32().toString(16).padStart(8, '0');
}
