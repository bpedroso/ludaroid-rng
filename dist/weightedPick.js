export function weightedPick(items, weights, rng) {
    if (items.length === 0) {
        throw new Error('weightedPick: items must not be empty');
    }
    if (items.length !== weights.length) {
        throw new Error('weightedPick: items and weights length mismatch');
    }
    const total = weights.reduce((sum, weight) => sum + Math.max(0, weight), 0);
    if (total <= 0) {
        throw new Error('weightedPick: total weight must be positive');
    }
    let roll = rng.next() * total;
    for (let i = 0; i < items.length; i++) {
        roll -= Math.max(0, weights[i] ?? 0);
        if (roll < 0) {
            return items[i];
        }
    }
    return items[items.length - 1];
}
