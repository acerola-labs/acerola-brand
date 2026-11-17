# Como contribuir

Este projeto segue o padrão Acerola, o mesmo de todos os repositórios Acerola. As regras completas
estão nas skills em `.claude/skills/` (`acerola-design`, `acerola-project`, `acerola-git`).

## Preparar a máquina

1. Node 22 ou mais novo (os scripts do padrão são `.mjs`) e
   [lefthook](https://github.com/evilmartians/lefthook) (`scoop install lefthook`,
   `winget install evilmartians.lefthook` ou `npm i -g lefthook`).
2. Na raiz: `node scripts/git/setup-git.mjs`. Grava o Git-Flow, o template de commit e instala os hooks.
3. <!-- Como preparar cada app. -->

## Fluxo

- Branch `feature/<nome>` ou `bugfix/<nome>` a partir da `develop`. A `main` e a `develop` são travadas.
- Commit `[tipo](local): Mensagem`, um local por commit. Locais em `acerola.config.json`.
- PR para a `develop`, com o template preenchido e prints no claro e no escuro quando mexer em tela.

## Antes do PR

```bash
node scripts/design/check-design.mjs
# lint, tipos e testes de cada app
```

## Licença

Ao contribuir, você concorda que sua contribuição sai sob a [MPL-2.0](LICENSE).
