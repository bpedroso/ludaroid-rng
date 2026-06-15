export function shuffle(rng, array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = rng.nextRange(0, i);
        const tmp = copy[i];
        copy[i] = copy[j];
        copy[j] = tmp;
    }
    return copy;
}
