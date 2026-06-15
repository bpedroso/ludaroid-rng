/**
 * Deterministic string-to-uint32 hash (djb2).
 */
export function hashStringToU32(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
        h = ((h * 33) ^ str.charCodeAt(i)) >>> 0;
    }
    return h >>> 0;
}
