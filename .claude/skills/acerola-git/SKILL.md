---
name: acerola-git
description: Padrão de git e GitHub de todo projeto Acerola — commit [tipo](local): Mensagem, Git-Flow (main, develop, feature/, bugfix/, release/, hotfix/), travas de branch, lefthook, PR, issues, Actions (nomes, gatilhos, deploy), Dependabot e release com tag. Use ao commitar, criar branch, juntar branch, abrir PR ou issue, criar ou mudar workflow, e ao preparar release.
---

# Git e GitHub Acerola

Igual em todo projeto, independente da linguagem. Os hooks (lefthook) travam o que dá para travar.

## 1. Commit

```
[tipo](local): Mensagem
```

- **tipo**: `feat` · `fix` · `refactor` · `test` · `docs` · `style` · `perf` · `build` · `ci` ·
  `chore` · `merge`.
- **local**: os de `acerola.config.json` (`commit.scopes`), em inglês. Um local por commit: tocou dois, são
  dois commits. Nunca `[feat](site,kit)`.
- **Mensagem**: português, primeira letra maiúscula, sem ponto final, até 100 caracteres. Diz o
  que a mudança **faz**, não onde mexeu.
- Corpo opcional com o porquê; rodapé `Refs: #123` e `BREAKING CHANGE: …`.
- Merge sempre com `-m` no formato: `[merge](site): Hero em pôster com Titan One`.
- Commit assinado (SSH) quando a máquina tem chave; nunca desligar a assinatura para passar.
- Conferido por `scripts/git/commit-msg.mjs` no hook `commit-msg`.

## 2. Branches (Git-Flow)

| Branch | Para | Regra |
|---|---|---|
| `main` | produção | só quem administra faz merge e push |
| `develop` | integração | só recebe merge; nada de commit direto |
| `feature/<nome>` | funcionalidade | sai da `develop`, volta para a `develop` |
| `bugfix/<nome>` | correção não urgente | sai da `develop`, volta para a `develop` |
| `release/<versão>` | preparar versão | sai da `develop`, vai para `main` e `develop` |
| `hotfix/<versão>` | correção em produção | sai da `main`, vai para `main` e `develop` |

- Nome em kebab-case e **em inglês** (ninguém de fora vê branch): `feature/hero-titan`,
  `bugfix/favicon-foreground`, nunca `feature/tela-de-lista`. Prefixo `feature/`, nunca `feat/`.
- Tag de versão `vX.Y.Z` (semver) na `main`.
- `scripts/git/branch-guard.sh` trava commit na `main`/`develop` e push na `main`. Quem
  administra libera a própria máquina: `git config project.admin true`.

## 3. Hooks (lefthook)

`lefthook.yml` é o mesmo em todo projeto:

| Hook | Faz |
|---|---|
| `commit-msg` | `commit-msg.mjs`: formato, tipo e local |
| `pre-commit` | `branch-guard.sh commit` + `check-design.mjs` nos arquivos de interface + `check-i18n.mjs` nas mensagens |
| `pre-merge-commit` | `branch-guard.sh merge` |
| `pre-push` | `branch-guard.sh push` |

Instalação: `node scripts/git/setup-git.mjs` (grava o Git-Flow, o template e roda `lefthook install`).

## 4. GitHub

- `.github/CODEOWNERS` com dono por pasta de app.
- `ISSUE_TEMPLATE/`: `bug_report.md` e `feature_request.md`, título `[bug](local): …`,
  `blank_issues_enabled: false`.
- `PULL_REQUEST_TEMPLATE.md`: o que muda, como testar, prints claro/escuro, checklist.
- PR para a `develop`, um local por PR (salvo mudança de fato compartilhada), título no formato do
  commit. Merge com squash proibido: o histórico das features fica.
- Labels por local e por tipo (`dependencies`, `bug`, `feature`).

## 5. Actions

- Um workflow por local e por função: `<local>-tests.yml`, `<local>-release.yml`,
  `<local>-deploy.yml`. Nome visível `Tests/<Local>`, `Release/<Local>`, `Deploy/<Local>`.
- Gatilho de teste: `push` e `pull_request` em `develop` e `main`, com `paths` do local e do próprio
  workflow; `workflow_dispatch` sempre.
- Deploy: `push` na `main` (ou tag `v*`), com `concurrency` para não sobrepor.
- Ordem dos passos: checkout → setup da linguagem com cache → instalar → lint → check/tipos →
  design → i18n → testes → build → publicar. Se algo falha, nada é publicado.
- Nome de job, step e arquivo de workflow em inglês (`name: Upload files to R2`).
- Segredo só em `secrets`; endereço e nome em `vars`. Passo opcional (ex.: R2) usa
  `if: ${{ vars.X != '' }}` para o workflow rodar sem ele.
- Versão de action fixada na major (`actions/checkout@v4`); o Dependabot atualiza.

## 6. Dependabot

Semanal, na `develop`, agrupado, com o prefixo do padrão para passar no hook:
`commit-message.prefix: "[chore](deps)"` (ou `[chore](ci)` para actions).

## 7. Release

1. `release/X.Y.Z` a partir da `develop`; versão nos manifestos (`package.json`, `Cargo.toml`, Gradle).
2. `RELEASE.md` com o que mudou, para quem usa.
3. Merge na `main` e na `develop` (`[merge](local): Versão X.Y.Z`), tag `vX.Y.Z`.
4. O workflow `<local>-release.yml` gera e publica os artefatos a partir da tag.
