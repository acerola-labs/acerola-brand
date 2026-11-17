# Como contribuir

Este projeto segue o padrão Acerola, o mesmo de todos os repositórios Acerola. As regras completas
estão nas skills em `.claude/skills/` e no brand book (página **Padrão**).

## Preparar a máquina

1. Node 22 ou mais novo e [lefthook](https://github.com/evilmartians/lefthook)
   (`scoop install lefthook`, `winget install evilmartians.lefthook` ou `npm i -g lefthook`).
2. Na raiz: `node scripts/git/setup-git.mjs`. Grava o Git-Flow, o template de commit e instala os hooks.
3. No site: `cd acerola-brand && npm install && npm run dev`.

## Fluxo

- Branch `feature/<nome>` ou `bugfix/<nome>` a partir da `develop`. A `main` e a `develop` são travadas.
- Commit `[tipo](local): Mensagem`, um local por commit. Locais: `site`, `kit`, `ci`, `docs`, `claude`, `deps`.
- PR para a `develop`, com o template preenchido e prints no claro e no escuro quando mexer em tela.

## Antes do PR

```bash
node scripts/design/check-design.mjs      # design
cd acerola-brand && npm run lint && npm run check && npm run build
```

## Licença

Ao contribuir, você concorda que sua contribuição sai sob a [MPL-2.0](LICENSE).
