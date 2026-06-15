export interface CSPRNG {
  nextU32(): number;
  nextFloat(): number;
}

function readU32(buffer: Uint32Array): number {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('CSPRNG unavailable: crypto.getRandomValues not found');
  }
  globalThis.crypto.getRandomValues(buffer);
  return buffer[0] ?? 0;
}

export function createCSPRNG(): CSPRNG {
  const buffer = new Uint32Array(1);

  return {
    nextU32(): number {
      return readU32(buffer);
    },
    nextFloat(): number {
      return readU32(buffer) / 4294967296;
    },
  };
}

export function randomSessionSeed(): string {
  const csprng = createCSPRNG();
  return csprng.nextU32().toString(16).padStart(8, '0');
}
