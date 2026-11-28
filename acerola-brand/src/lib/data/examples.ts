/**
 * Component examples as plain HTML using the components.css classes (a mirror of the acerola-sync
 * components). The same text is rendered on the page and shown as code. `%BRAND%` becomes the
 * address of the /brand folder.
 *
 * Title and note are Paraglide messages. The HTML snippets are sample code: their visible text is
 * demo content, kept as written so the copied code stays readable.
 */
import { m } from '#lib/paraglide/messages.js';

type Message = () => string;

export type Example = { id: string; title: Message; note: Message; html: string };

export const BRAND_DIR = '%BRAND%';

/**
 * Lucide in plain HTML: <i data-lucide="name"> becomes the icon when lucide's createIcons() runs
 * (the examples page does it). The color comes from the parent's `color`, the size from the
 * attributes. In Svelte, use the component (@lucide/svelte) with its props instead.
 */
const icon = (name: string) =>
	`<i data-lucide="${name}" width="20" height="20" aria-hidden="true"></i>`;
const ICON = {
	arrow: icon('arrow-right'),
	book: icon('book-open'),
	download: icon('download'),
	check: icon('check'),
	code: icon('code')
};

export const EXAMPLES: Example[] = [
	{
		id: 'heading',
		title: m['examples.items.heading.title'],
		note: m['examples.items.heading.note'],
		html: `<header class="ac-stack">
  <p class="ac-eyebrow">Boa tarde, usuário</p>
  <h2 class="ac-title">Anime <span class="ac-title__dim">Mangá</span></h2>
</header>`
	},
	{
		id: 'buttons',
		title: m['examples.items.buttons.title'],
		note: m['examples.items.buttons.note'],
		html: `<div class="ac-row">
  <button type="button" class="ac-btn ac-btn--primary">Sincronizar agora</button>
  <button type="button" class="ac-btn">Secundário</button>
  <button type="button" class="ac-btn ac-btn--contrast">Confirmar</button>
  <button type="button" class="ac-btn ac-btn--hero">Destaque</button>
  <button type="button" class="ac-btn ac-btn--icon" aria-label="Marcar episódio">+1</button>
</div>`
	},
	{
		id: 'tabs',
		title: m['examples.items.tabs.title'],
		note: m['examples.items.tabs.note'],
		html: `<div class="ac-chip-tabs" role="tablist" aria-label="Status">
  <button type="button" class="ac-chip" role="tab" aria-selected="true">Assistindo <span class="ac-chip__count">5</span></button>
  <button type="button" class="ac-chip" role="tab" aria-selected="false">Completo <span class="ac-chip__count">12</span></button>
  <button type="button" class="ac-chip" role="tab" aria-selected="false">Planejado <span class="ac-chip__count">3</span></button>
  <button type="button" class="ac-chip" role="tab" aria-selected="false">Pausado <span class="ac-chip__count">1</span></button>
</div>`
	},
	{
		id: 'nav',
		title: m['examples.items.nav.title'],
		note: m['examples.items.nav.note'],
		html: `<nav class="ac-pill-nav" aria-label="Principal">
  <a class="ac-pill-nav__item" href="#list" aria-current="page">Lista</a>
  <a class="ac-pill-nav__item" href="#activity">Atividade</a>
  <a class="ac-pill-nav__item" href="#settings">Ajustes</a>
</nav>`
	},
	{
		id: 'stats',
		title: m['examples.items.stats.title'],
		note: m['examples.items.stats.note'],
		html: `<div class="ac-grid">
  <div class="ac-stat ac-stat--primary"><span class="ac-label">assistindo</span><span class="ac-stat__value">5</span></div>
  <div class="ac-stat ac-stat--success"><span class="ac-label">completos</span><span class="ac-stat__value">12</span></div>
  <div class="ac-stat ac-stat--warning"><span class="ac-label">pausados</span><span class="ac-stat__value">1</span></div>
  <div class="ac-stat"><span class="ac-label">planejados</span><span class="ac-stat__value">3</span><span class="ac-stat__hint">na fila</span></div>
</div>`
	},
	{
		id: 'linkCard',
		title: m['examples.items.linkCard.title'],
		note: m['examples.items.linkCard.note'],
		html: `<div class="ac-grid">
  <a class="ac-card ac-card--link ac-card--primary" href="#link-card">
    <span class="ac-icon-tile">${ICON.download}</span>
    <span class="ac-section-title">Android (APK)</span>
    <span class="ac-card__action">Baixar o APK <span class="ac-card__go">${ICON.arrow}</span></span>
  </a>
  <a class="ac-card ac-card--link" href="#link-card">
    <span class="ac-icon-tile ac-icon-tile--info">${ICON.book}</span>
    <span class="ac-section-title">Documentação</span>
    <span class="ac-card__action">Ler as docs <span class="ac-card__go">${ICON.arrow}</span></span>
  </a>
</div>`
	},
	{
		id: 'iconTiles',
		title: m['examples.items.iconTiles.title'],
		note: m['examples.items.iconTiles.note'],
		html: `<div class="ac-row">
  <span class="ac-icon-tile ac-icon-tile--primary" title="Baixar">${ICON.download}</span>
  <span class="ac-icon-tile ac-icon-tile--info" title="Documentação">${ICON.book}</span>
  <span class="ac-icon-tile ac-icon-tile--success" title="Sincronizado">${ICON.check}</span>
  <span class="ac-icon-tile" title="Código">${ICON.code}</span>
</div>`
	},
	{
		id: 'covers',
		title: m['examples.items.covers.title'],
		note: m['examples.items.covers.note'],
		html: `<div class="ac-grid">
  <article>
    <div class="ac-cover" style="background: var(--chart-2)">
      <span class="ac-cover__chip">Anime</span>
      <div class="ac-cover__shade"></div>
      <div class="ac-cover__progress"><div style="width: 42%"></div></div>
    </div>
    <h3 class="ac-cover__title">Título de exemplo</h3>
    <p class="ac-cover__subtitle">Ep 5 de 12</p>
  </article>
  <article>
    <div class="ac-cover" style="background: var(--chart-5)">
      <span class="ac-cover__chip">Mangá</span>
      <div class="ac-cover__shade"></div>
      <div class="ac-cover__progress"><div style="width: 70%"></div></div>
    </div>
    <h3 class="ac-cover__title">Outro título</h3>
    <p class="ac-cover__subtitle">Cap 88 de 120</p>
  </article>
</div>`
	},
	{
		id: 'badges',
		title: m['examples.items.badges.title'],
		note: m['examples.items.badges.note'],
		html: `<div class="ac-row">
  <span class="ac-badge ac-badge--success"><span class="ac-dot"></span>Sincronizado</span>
  <span class="ac-badge ac-badge--warning">Pendente</span>
  <span class="ac-badge ac-badge--info">Novo episódio</span>
  <span class="ac-badge ac-badge--danger">Falhou</span>
  <span class="ac-badge ac-badge--primary">Favorito</span>
</div>`
	},
	{
		id: 'field',
		title: m['examples.items.field.title'],
		note: m['examples.items.field.note'],
		html: `<label class="ac-field">
  <span class="ac-eyebrow">Buscar título</span>
  <input class="ac-input" type="search" placeholder="Filtrar por título" />
</label>`
	},
	{
		id: 'toasts',
		title: m['examples.items.toasts.title'],
		note: m['examples.items.toasts.note'],
		html: `<div class="ac-stack">
  <div class="ac-toast ac-toast--success" role="status">
    <img class="ac-avatar" src="${BRAND_DIR}/mascot/acerola-mascot.svg" alt="" />
    <div><div class="ac-toast__title">+1 episódio marcado</div><div class="ac-toast__text">Título de exemplo · Ep 6 de 12</div></div>
  </div>
  <div class="ac-toast ac-toast--danger" role="alert">
    <div><div class="ac-toast__title">Não deu para sincronizar</div><div class="ac-toast__text">Sem conexão com o AniList. Tento de novo em 1 min.</div></div>
  </div>
</div>`
	},
	{
		id: 'empty',
		title: m['examples.items.empty.title'],
		note: m['examples.items.empty.note'],
		html: `<div class="ac-empty">
  <img class="ac-empty__art" src="${BRAND_DIR}/mascot/acerola-mascot.svg" alt="" />
  <p class="ac-empty__title">Nada planejado ainda</p>
  <p class="ac-empty__text">Busque um título e guarde para depois.</p>
  <button type="button" class="ac-btn ac-btn--primary ac-empty__action">Buscar títulos</button>
</div>`
	}
];
