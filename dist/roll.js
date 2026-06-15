/** Returns true when rng.next() < threshold (threshold in [0, 1]). */
export function roll(rng, threshold) {
    if (threshold <= 0)
        return false;
    if (threshold >= 1)
        return true;
    return rng.next() < threshold;
}
