<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import AcerolaCode from '#lib/components/acerola-code/acerola-code.svelte';
	import AcerolaDownloadCard from '#lib/components/acerola-download-card/acerola-download-card.svelte';
	import AcerolaHero from '#lib/components/acerola-hero/acerola-hero.svelte';
	import AcerolaSection from '#lib/components/acerola-section/acerola-section.svelte';
	import AcerolaSwatch from '#lib/components/acerola-swatch/acerola-swatch.svelte';
	import { DOWNLOADS, FONTS, ICON_PACKS, PIECES, RADII, TOKEN_GROUPS } from '#lib/data/brand.ts';
	import manifest from '#lib/generated/downloads.json';
	import { useCopy } from '#lib/hooks/use-copy/use-copy.svelte.ts';
	import { useTheme } from '#lib/hooks/use-theme/use-theme.svelte.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { absoluteFileUrl, fileUrl } from '#lib/utils/url.util.ts';
	import tokens from '../../static/brand/tokens.json';

	const theme = useTheme();
	const clipboard = useCopy();

	const sizes: Record<string, { bytes: number; files: number }> = manifest;
	const palette = $derived<Record<string, string>>(tokens[theme.current]);

	const tape = $derived([
		[
			m['hero.tape.content.anime'](),
			m['hero.tape.content.manga'](),
			m['hero.tape.content.comics'](),
			m['hero.tape.content.games'](),
			m['hero.tape.content.episode'](),
			m['hero.tape.content.chapter'](),
			m['hero.tape.content.spoiler'](),
			m['hero.tape.content.marathon'](),
			m['hero.tape.content.list'](),
			m['hero.tape.content.volume']()
		],
		[
			m['hero.tape.app.serverless'](),
			m['hero.tape.app.p2p'](),
			m['hero.tape.app.rust'](),
			m['hero.tape.app.data'](),
			m['hero.tape.app.qr'](),
			m['hero.tape.app.offline'](),
			m['hero.tape.app.fast'](),
			m['hero.tape.app.open'](),
			m['hero.tape.app.ads'](),
			m['hero.tape.app.platforms']()
		]
	]);

	/** Absolute addresses for the snippets: browser-only (they depend on where the page opened). */
	let urls = $state({
		css: '/brand/css/acerola.css',
		tailwind: '/brand/css/tailwind.css',
		components: '/brand/css/components.css',
		tokens: '/brand/tokens.json',
		skills: '/downloads/acerola-skills.zip'
	});
	onMount(() => {
		urls = {
			css: absoluteFileUrl('/brand/css/acerola.css'),
			tailwind: absoluteFileUrl('/brand/css/tailwind.css'),
			components: absoluteFileUrl('/brand/css/components.css'),
			tokens: absoluteFileUrl('/brand/tokens.json'),
			skills: absoluteFileUrl('/downloads/acerola-skills.zip')
		};
	});
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
</svelte:head>

<AcerolaHero
	data={{
		word: 'Acerola',
		mascot: fileUrl('/brand/mascot/acerola-mascot.svg'),
		tape,
		next: 'brand',
		scroll: m['hero.scroll']()
	}}
	ui={{
		stickers: [
			{ text: m['hero.stickers.nerd'](), tone: 'warning' },
			{ text: m['hero.stickers.p2p'](), tone: 'info' },
			{ text: m['hero.stickers.open'](), tone: 'success' }
		]
	}}
>
	<div class="max-w-md">
		<p class="m-0 text-2xl font-black tracking-tight">{m['hero.title']()}</p>
		<p class="mt-2 mb-0 text-pretty text-muted-foreground">{m['hero.lead']()}</p>
	</div>
	<div class="ac-row">
		<a
			class="ac-btn ac-btn--primary ac-btn--lg"
			href={fileUrl('/downloads/acerola-brand.zip')}
			download>{m['hero.kit']()}</a
		>
		<a class="ac-btn ac-btn--lg" href={resolve('/examples')}>{m['hero.components']()}</a>
	</div>
</AcerolaHero>

<!-- Icon and mascot -->
<AcerolaSection
	data={{
		id: 'brand',
		eyebrow: m['home.brand.eyebrow'](),
		title: m['home.brand.title'](),
		lead: m['home.brand.lead']()
	}}
>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each PIECES as piece (piece.file)}
			<figure class="m-0 overflow-hidden rounded-card bg-card shadow-lift">
				<div class="grid aspect-square place-items-center bg-checker p-6">
					<img
						src={fileUrl(piece.file)}
						alt={piece.title()}
						class="max-h-full max-w-full"
					/>
				</div>
				<figcaption class="grid gap-1 p-4">
					<span class="font-black tracking-tight">{piece.title()}</span>
					<span class="text-sm text-muted-foreground">{piece.use()}</span>
					<a class="ac-link mt-1 text-xs" href={fileUrl(piece.file)} download
						>{piece.file.split('/').pop()}</a
					>
				</figcaption>
			</figure>
		{/each}
	</div>
</AcerolaSection>

<!-- Typography -->
<AcerolaSection
	data={{
		id: 'typography',
		eyebrow: m['home.type.eyebrow'](),
		title: m['home.type.title'](),
		lead: m['home.type.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-3">
		{#each FONTS as font (font.name)}
			<article class="ac-card grid content-start gap-4">
				<div class="flex items-center justify-between">
					<span class="ac-badge">{font.role()}</span>
					<code class="text-xs text-muted-foreground">{font.token}</code>
				</div>
				<p class="m-0 truncate text-5xl leading-none {font.sampleClass}">{font.sample()}</p>
				<p class="m-0 text-lg font-black tracking-tight">{font.name}</p>
				<ul class="m-0 grid list-none gap-1.5 p-0 text-sm text-muted-foreground">
					{#each font.rules as rule, i (i)}
						<li class="flex gap-2">
							<span class="ac-dot mt-1.5 text-primary"></span>{rule()}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	<div class="ac-card mt-6 grid gap-5">
		<p class="ac-label text-muted-foreground">{m['home.type.practice']()}</p>
		<div class="grid gap-1">
			<span class="ac-eyebrow">{m['home.type.greeting']()}</span>
			<span class="ac-title"
				>{m['home.type.anime']()}
				<span class="ac-title__dim">{m['home.type.manga']()}</span></span
			>
		</div>
		<p class="ac-section-title">{m['home.type.section']()}</p>
		<p class="m-0 max-w-2xl text-muted-foreground">{m['home.type.body']()}</p>
		<p class="ac-row m-0">
			<span class="ac-number text-4xl text-primary">12/24</span>
			<span class="text-xs text-muted-foreground">{m['home.type.number']()}</span>
		</p>
	</div>
</AcerolaSection>

<!-- Colors -->
<AcerolaSection
	data={{
		id: 'colors',
		eyebrow: m['home.colors.eyebrow'](),
		title: m['home.colors.title'](),
		lead: m['home.colors.lead']({
			theme: theme.current === 'dark' ? m['home.colors.dark']() : m['home.colors.light']()
		})
	}}
>
	<div class="grid gap-10">
		{#each TOKEN_GROUPS as group (group.id)}
			<div>
				<div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
					<h3 class="ac-section-title">{group.title()}</h3>
					<p class="m-0 text-sm text-muted-foreground">{group.note()}</p>
				</div>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
					{#each group.tokens as token (token.name)}
						<AcerolaSwatch
							data={{
								name: token.name,
								role: token.role(),
								value: palette[token.name]
							}}
							events={{ copy: clipboard.copy }}
							ui={{ copied: clipboard.copied === palette[token.name] }}
						/>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</AcerolaSection>

<!-- Shape -->
<AcerolaSection
	data={{
		id: 'shape',
		eyebrow: m['home.shape.eyebrow'](),
		title: m['home.shape.title'](),
		lead: m['home.shape.lead']()
	}}
>
	<div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
		{#each RADII as radius (radius.token)}
			<div class="grid gap-3">
				<div class="h-28 bg-surface" style:border-radius="var(--{radius.token})"></div>
				<div class="grid">
					<span class="text-sm font-black tracking-tight"
						>{typeof radius.value === 'string' ? radius.value : radius.value()}</span
					>
					<code class="text-xs text-muted-foreground">--{radius.token}</code>
					<span class="text-xs text-muted-foreground">{radius.use()}</span>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-8 grid gap-4 sm:grid-cols-2">
		<div class="grid h-32 place-items-center rounded-card bg-card shadow-lift">
			<span class="font-black tracking-tight">{m['home.shape.lift']()}</span>
		</div>
		<div class="grid h-32 place-items-center rounded-card bg-card shadow-float">
			<span class="font-black tracking-tight">{m['home.shape.float']()}</span>
		</div>
	</div>
</AcerolaSection>

<!-- Components -->
<AcerolaSection
	data={{
		id: 'components',
		eyebrow: m['home.components.eyebrow'](),
		title: m['home.components.title'](),
		lead: m['home.components.lead']()
	}}
>
	<div class="grid gap-4 lg:grid-cols-2">
		<div class="ac-card grid gap-5">
			<div class="ac-chip-tabs" role="tablist" aria-label={m['demo.status']()}>
				<button type="button" class="ac-chip" role="tab" aria-selected="true"
					>{m['demo.watching']()} <span class="ac-chip__count">5</span></button
				>
				<button type="button" class="ac-chip" role="tab" aria-selected="false"
					>{m['demo.completed']()} <span class="ac-chip__count">12</span></button
				>
				<button type="button" class="ac-chip" role="tab" aria-selected="false"
					>{m['demo.planned']()} <span class="ac-chip__count">3</span></button
				>
			</div>
			<div class="ac-row">
				<span class="ac-badge ac-badge--success"
					><span class="ac-dot"></span>{m['demo.synced']()}</span
				>
				<span class="ac-badge ac-badge--warning">{m['demo.pending']()}</span>
				<span class="ac-badge ac-badge--info">{m['demo.episode']()}</span>
				<span class="ac-badge ac-badge--danger">{m['demo.failed']()}</span>
			</div>
			<div class="ac-row">
				<button type="button" class="ac-btn ac-btn--primary">{m['demo.sync']()}</button>
				<button type="button" class="ac-btn">{m['demo.secondary']()}</button>
			</div>
		</div>
		<div class="ac-card grid content-between gap-5">
			<div class="ac-grid">
				<div class="ac-stat ac-stat--primary">
					<span class="ac-label">{m['demo.stats.watching']()}</span><span
						class="ac-stat__value">5</span
					>
				</div>
				<div class="ac-stat ac-stat--success">
					<span class="ac-label">{m['demo.stats.completed']()}</span><span
						class="ac-stat__value">12</span
					>
				</div>
				<div class="ac-stat">
					<span class="ac-label">{m['demo.stats.planned']()}</span><span
						class="ac-stat__value">3</span
					>
				</div>
			</div>
			<div class="ac-row">
				<a class="ac-btn ac-btn--contrast" href={resolve('/examples')}
					>{m['home.components.all']()}</a
				>
				<a class="ac-btn" href={resolve('/examples/app')}
					>{m['home.components.screens']()}</a
				>
				<a class="ac-btn" href={resolve('/examples/site')}>{m['home.components.site']()}</a>
			</div>
		</div>
	</div>
</AcerolaSection>

<!-- App icons -->
<AcerolaSection
	data={{
		id: 'icons',
		eyebrow: m['home.icons.eyebrow'](),
		title: m['home.icons.title'](),
		lead: m['home.icons.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-2">
		{#each ICON_PACKS as pack (pack.base)}
			<article class="ac-card flex items-center gap-5">
				<img src={fileUrl(pack.preview)} alt="" class="size-24 rounded-tile" />
				<div class="grid gap-2">
					<h3 class="ac-section-title m-0">{pack.title()}</h3>
					<div class="ac-row">
						{#each pack.platforms as platform (platform)}
							<span class="ac-badge">{platform}</span>
						{/each}
					</div>
					<code class="text-xs text-muted-foreground">{pack.base.slice(1)}/</code>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-4 text-sm text-muted-foreground">{m['home.icons.note']()}</p>
</AcerolaSection>

<!-- Use -->
<AcerolaSection
	data={{
		id: 'usage',
		eyebrow: m['home.usage.eyebrow'](),
		title: m['home.usage.title'](),
		lead: m['home.usage.lead']()
	}}
>
	<div class="grid gap-4 lg:grid-cols-2">
		<div class="grid gap-2">
			<h3 class="ac-section-title m-0">{m['home.usage.css']()}</h3>
			<AcerolaCode data={{ code: `<link rel="stylesheet" href="${urls.css}" />` }} />
		</div>
		<div class="grid gap-2">
			<h3 class="ac-section-title m-0">{m['home.usage.tailwind']()}</h3>
			<AcerolaCode
				data={{
					label: 'css',
					code: `@import 'tailwindcss';\n@import '${urls.tailwind}';\n@import '${urls.components}';`
				}}
			/>
		</div>
		<div class="grid gap-2">
			<h3 class="ac-section-title m-0">{m['home.usage.skill']()}</h3>
			<AcerolaCode
				data={{
					label: 'shell',
					code: `curl -L -o acerola-skills.zip ${urls.skills}\nunzip acerola-skills.zip -d ~/.claude/skills/`
				}}
			/>
		</div>
		<div class="grid gap-2">
			<h3 class="ac-section-title m-0">{m['home.usage.tokens']()}</h3>
			<AcerolaCode data={{ label: 'url', code: urls.tokens }} />
		</div>
	</div>
</AcerolaSection>

<!-- Downloads -->
<AcerolaSection
	data={{
		id: 'downloads',
		eyebrow: m['home.downloads.eyebrow'](),
		title: m['home.downloads.title'](),
		lead: m['home.downloads.lead']()
	}}
>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each DOWNLOADS as item, i (item.file)}
			<AcerolaDownloadCard
				data={{
					file: item.file,
					title: item.title(),
					text: item.text(),
					href: fileUrl(`/downloads/${item.file}`),
					bytes: sizes[item.file]?.bytes,
					files: sizes[item.file]?.files
				}}
				ui={{ primary: i === 0 }}
			/>
		{/each}
	</div>
</AcerolaSection>
