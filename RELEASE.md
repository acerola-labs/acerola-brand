# Versões

## 0.5.0 · 27 nov 2026

- **Idioma e tema valem para todos os sites:** cada página existe em `/pt-br/…` e `/en/…`. Abrir
  uma delas ou trocar o idioma grava o cookie `acerola-locale`, e o tema fica no `acerola-theme`.
  Os dois valem para todo site em `acerola.app`: trocou aqui, troca no hub e nas docs. Endereço sem
  prefixo vai para o idioma salvo.
- **Sitemap e `llms.txt` por idioma**, com índice na raiz.
- **Card clicável e ícone em bloco:** `.ac-card--link` mostra a ação parada (verbo e seta no tom da
  marca), com a variante `.ac-card--primary` para a ação principal. `.ac-icon-tile` dá o tom pelo
  significado. Os dois estão nos exemplos.
- **Padrão:**
  - idioma e cookies (`acerola-project` 2.1 e `acerola-design` 11.1);
  - card clicável e nada de SVG escrito no código;
  - tag com a mensagem da versão;
  - actions só da GitHub e fixadas por SHA;
  - deploy e release só pela tag;
  - o kit leva o modelo de idioma (`reference/locale/`) e os scripts de release
    (`scripts/release/`).
- **Publicação pela tag:** testes em todo PR (`site-tests.yml`), release do GitHub e arquivos no R2
  (`site-release.yml`) e deploy pelo Komodo (`site-deploy.yml`).
## 0.4.0 · 25 nov 2026

- **Marca v1.0.0:** ícone e mascote redesenhados. O ícone (`acerola-logo-foreground.svg`, `-sync`,
  `-monochrome`, `favicon.svg` e os PNGs) sai do desenho novo, quadrado e com 72% de preenchimento;
  a placa do `acerola-logo.svg` e o `acerola-logo-background.svg` passam a usar a cor de fundo dos
  ícones de app (`#11111a`, o token `background`) no lugar do `#383B49`.
- **Ícones de app para todas as plataformas:** `brand/icons/logo` e `brand/icons/mascot` ganham
  macOS, tvOS, watchOS, Android TV e a arte da Play Store, além de Android, iOS e web.
- **Docs:** capa do README e prints dos dois temas refeitos com a marca nova.

## 0.3.0 · 23 nov 2026

- **Brand book no hetzner:** o site sai do GitHub Pages e roda no servidor hetzner, publicado pelo
  Komodo a cada push na `main` (`.komodo/`), com a imagem em `acerola-brand/.config/docker/`. Os
  arquivos da marca continuam no R2 (`cdn.acerola.app`), enviados pelo `acerola-brand-release.yml`
  na tag.

## 0.2.4 · 17 nov 2026

- **README no padrão do reader e do sync:** capa 1920 × 1080 (logo, telas e a frase) no lugar do
  GIF, galeria com legenda e as imagens em `docs/github/ptbr/`. A capa sai de
  `docs/github/source/hero.html` com `render-hero.mjs`.

## 0.2.3 · 17 nov 2026

- **Documentação:** `docs/` com uma página por área (marca, componentes, telas, padrão) e prints de
  cada tela nos dois temas; o README abre com um GIF Hairline do leque de tokens e uma galeria.

## 0.2.2 · 17 nov 2026

- **Padrão:** só três branches vivas, `main`, `develop` e a de trabalho; juntou, apaga (skill
  `acerola-git` e o `CLAUDE.md` do kit).

## 0.2.1 · 17 nov 2026

- **Publicação da 0.2.0:** a 0.2.0 não chegou ao ar (o lint do deploy recusou um arquivo fora do
  formato). A 0.2.1 traz a mesma transição entre páginas, agora publicada.

## 0.2.0 · 17 nov 2026

- **Transição entre páginas:** ao trocar de página, a atual sai subindo e some, e a nova entra
  subindo (GSAP). Link para seção da mesma página não anima, e com movimento reduzido a página só
  troca.

## 0.1.1 · 17 nov 2026

- **Tela de erro sozinha:** sem barra de navegação e rodapé, só o erro e as duas ações, centralizado
  na janela.

## 0.1.0 · 17 nov 2026

Primeira versão publicada do brand book, em https://brand.acerola.app.

- **No ar:** o brand book em `brand.acerola.app` (GitHub Pages) e os arquivos da marca em
  `cdn.acerola.app` (R2): css, fontes, logo, mascote, ícones e os zips do kit.
- **Tela de erro:** uma tela só para qualquer erro (404, 401, 403, 500, 503, sem conexão), com o
  palco da marca e uma versão para telas pequenas. Fica em App → Tela de erro e vai junto da skill
  `acerola-design` nos zips, para todo app copiar.
- **Busca:** `sitemap.xml` e `robots.txt`.
- **Padrão:** tags de versão `vX.Y.Z` (skill `acerola-git`); o site só é publicado por tag.
