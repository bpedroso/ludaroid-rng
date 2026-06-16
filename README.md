# @ludaroid/rng

PRNG determinístico (Mulberry32) e utilitários de probabilidade para o ecossistema Ludaroid.

**Zero dependências de runtime** — funciona em Node.js e browser (ESM).

## API exportada

```ts
import {
  SeededRNG,
  hashStringToU32,
  weightedPick,
  roll,
  shuffle,
  createCSPRNG,
  randomSessionSeed,
} from '@ludaroid/rng';

const rng = new SeededRNG('minha-seed');
rng.next();              // 0..1
rng.nextRange(1, 6);     // inteiro inclusivo

const item = weightedPick(['a', 'b', 'c'], [1, 2, 7], rng);
const win = roll(rng, 0.25);
const deck = shuffle(rng, ['A', 'K', 'Q']);
const sessionSeed = randomSessionSeed();
```

---

## Como consumir em outros projetos

Escolha **uma** das formas abaixo conforme o ambiente.

### Opção A — Desenvolvimento local (monorepo / workspace)

Quando `ludaroid-rng` está na mesma máquina que o consumidor (ex.: pasta irmã no workspace):

```json
// package.json do consumidor (ex.: ludaroid-api)
{
  "dependencies": {
    "@ludaroid/rng": "file:../ludaroid-rng"
  }
}
```

```bash
cd ludaroid-api && pnpm install
```

> O pacote precisa estar buildado: `cd ludaroid-rng && pnpm run build`

---

### Opção B — GitHub Release (recomendado hoje)

Cada push em `main` dispara o **CI**; se passar, o workflow **Publish** roda em seguida e cria uma [Release](https://github.com/bpedroso/ludaroid-rng/releases) identificada pelo commit (`commit-abc1234`) com o `.tgz`.

A versão do pacote vem do campo `version` do `package.json` (ex.: `1.0.0`). O commit fica só na tag/path da Release — não é misturado na versão semver.

**`package.json`:**

```json
{
  "dependencies": {
    "@ludaroid/rng": "https://github.com/bpedroso/ludaroid-rng/releases/download/commit-abc1234/ludaroid-rng-1.0.0.tgz"
  }
}
```

**CLI:**

```bash
pnpm add https://github.com/bpedroso/ludaroid-rng/releases/download/commit-abc1234/ludaroid-rng-1.0.0.tgz
```

```bash
npm install https://github.com/bpedroso/ludaroid-rng/releases/download/commit-abc1234/ludaroid-rng-1.0.0.tgz
```

Troque `abc1234` pelo SHA curto do commit desejado (veja na Release ou em `git rev-parse --short HEAD`). O sufixo do `.tgz` (`1.0.0`) segue o `version` do `ludaroid-rng` naquele commit.

---

### Opção C — GitHub Packages (registry npm do GitHub)

Equivalente ao **Package Registry** do GitLab. O scope `@ludaroid` exige que o owner do repositório no GitHub seja a organização **`ludaroid`**.

**1. `.npmrc` na raiz do projeto consumidor** (copie de [`.npmrc.example`](./.npmrc.example)):

```ini
@ludaroid:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**2. Autenticação local**

Crie um [Personal Access Token](https://github.com/settings/tokens) com scope `read:packages` e exporte:

```bash
export GITHUB_TOKEN=ghp_...
```

Ou substitua `${GITHUB_TOKEN}` no `.npmrc` pelo token (não commite o token).

**3. Instalar**

```bash
pnpm add @ludaroid/rng
```

**4. CI (GitHub Actions) no projeto consumidor**

```yaml
permissions:
  packages: read

steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: pnpm
      registry-url: https://npm.pkg.github.com
      scope: '@ludaroid'
  - run: pnpm install --frozen-lockfile
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

### Opção D — npmjs.com (registry público)

Quando o pacote estiver publicado no npm (workflow com secret `NPM_TOKEN`):

```bash
pnpm add @ludaroid/rng
```

Sem `.npmrc` extra — o registry padrão já resolve `@ludaroid/rng`.

---

## Comparativo rápido

| Opção | Quando usar | Instalação |
|-------|-------------|------------|
| **A — `file:../`** | Dev local, mesmo workspace | `"file:../ludaroid-rng"` |
| **B — Release** | CI/prod sem org `ludaroid` no GitHub | URL do `.tgz` na Release |
| **C — GitHub Packages** | Ecossistema privado no GitHub | `pnpm add @ludaroid/rng` + `.npmrc` |
| **D — npmjs** | Open source global | `pnpm add @ludaroid/rng` |

| Fonte | Parecido com GitLab |
|-------|---------------------|
| GitHub Release (`.tgz`) | Artifacts permanentes na release |
| GitHub Packages | Package Registry |
| Actions artifacts | Artifacts de pipeline (expiram — **não** usar para libs) |

---

## Exemplo: `ludaroid-api` (NestJS)

```ts
// ludaroid-api/src/rng/index.ts
export {
  SeededRNG,
  hashStringToU32,
  weightedPick,
  roll,
  shuffle,
  randomSessionSeed,
} from '@ludaroid/rng';
```

```ts
// uso em um service
import { SeededRNG, randomSessionSeed } from '@ludaroid/rng';

const seed = randomSessionSeed();
const rng = new SeededRNG(seed);
```

---

## Exemplo: jogos Pixi / 3D (browser)

Substitua implementações locais de `SeededRNG` por import do pacote:

```ts
import { SeededRNG } from '@ludaroid/rng';

const rng = new SeededRNG(sessionId);
```

O build Vite/Node resolve ESM via campo `exports` do pacote.

---

## Publicar nova versão

Não é necessário tag semver nem bump manual em `package.json`.

1. Commit e push em `main`:

```bash
git push origin main
```

O workflow **CI** valida o commit; se passar, o workflow **Publish** roda em seguida, cria a Release `commit-<sha>` com o `.tgz` e tenta publicar no GitHub Packages (somente com org `ludaroid`).

Para npmjs.com, dispare manualmente **Actions → Publish → Run workflow** com `publish_npmjs: true` (requer secret `NPM_TOKEN`).

---

## Desenvolvimento deste repositório

```bash
pnpm install
pnpm test
pnpm run build
pnpm run typecheck
```

## Licença

MIT
