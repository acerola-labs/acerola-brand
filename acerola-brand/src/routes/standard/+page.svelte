<script lang="ts">
	import AcerolaCode from '#lib/components/acerola-code/acerola-code.svelte';
	import AcerolaSection from '#lib/components/acerola-section/acerola-section.svelte';
	import {
		ACTIONS,
		BRANCHES,
		COMMITS,
		ENGLISH,
		HOOKS,
		I18N_BAD,
		I18N_GOOD,
		LAYERS,
		SKILLS,
		STEPS,
		TREE,
		TYPES
	} from '#lib/data/standard.ts';
	import manifest from '#lib/generated/downloads.json';
	import { m } from '#lib/paraglide/messages.js';
	import { fileUrl, formatBytes } from '#lib/utils/url.util.ts';

	const kit: { bytes: number; files: number } | undefined = (
		manifest as Record<string, { bytes: number; files: number }>
	)['acerola-template.zip'];
</script>

<svelte:head>
	<title>{m['nav.standard']()} · Acerola</title>
</svelte:head>

<!-- Intro -->
<section class="mx-auto max-w-6xl px-4 pt-12 pb-6 sm:px-6">
	<p class="ac-eyebrow">{m['standard.eyebrow']()}</p>
	<h1 class="mt-1 font-display text-6xl leading-[0.9] uppercase sm:text-8xl">
		{m['standard.title']()} <span class="text-primary">{m['standard.highlight']()}</span>
	</h1>
	<p class="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">{m['standard.lead']()}</p>
	<div class="ac-row mt-8">
		<a
			class="ac-btn ac-btn--primary ac-btn--lg"
			href={fileUrl('/downloads/acerola-template.zip')}
			download>{m['standard.download']()}</a
		>
		{#if kit}<span class="text-sm text-muted-foreground tabular-nums"
				>{m['common.files']({ count: kit.files })} · {formatBytes(kit.bytes)}</span
			>{/if}
	</div>
</section>

<!-- Skills -->
<AcerolaSection
	data={{
		id: 'skills',
		eyebrow: m['standard.skills.eyebrow'](),
		title: m['standard.skills.title'](),
		lead: m['standard.skills.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-3">
		{#each SKILLS as skill (skill.name)}
			<article class="ac-card grid content-start gap-3">
				<code class="ac-badge ac-badge--primary justify-self-start">{skill.name}</code>
				<h3 class="ac-section-title m-0">{skill.title()}</h3>
				<p class="m-0 text-sm text-muted-foreground">{skill.text()}</p>
			</article>
		{/each}
	</div>
</AcerolaSection>

<!-- English for everything the user does not see -->
<AcerolaSection
	data={{
		id: 'english',
		eyebrow: m['standard.english.eyebrow'](),
		title: m['standard.english.title'](),
		lead: m['standard.english.lead']()
	}}
>
	<AcerolaCode data={{ label: 'ts', code: ENGLISH }} />
</AcerolaSection>

<!-- i18n -->
<AcerolaSection
	data={{
		id: 'i18n',
		eyebrow: m['standard.i18n.eyebrow'](),
		title: m['standard.i18n.title'](),
		lead: m['standard.i18n.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-2">
		<div class="grid content-start gap-2">
			<span class="ac-badge ac-badge--success justify-self-start"
				>{m['standard.i18n.good']()}</span
			>
			<AcerolaCode data={{ label: 'messages/pt-br.json', code: I18N_GOOD }} />
		</div>
		<div class="grid content-start gap-2">
			<span class="ac-badge ac-badge--danger justify-self-start"
				>{m['standard.i18n.bad']()}</span
			>
			<AcerolaCode data={{ label: 'messages/pt-br.json', code: I18N_BAD }} />
		</div>
	</div>
</AcerolaSection>

<!-- Structure -->
<AcerolaSection
	data={{
		id: 'structure',
		eyebrow: m['standard.structure.eyebrow'](),
		title: m['standard.structure.title'](),
		lead: m['standard.structure.lead']()
	}}
>
	<div class="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
		<AcerolaCode data={{ label: 'tree', code: TREE }} ui={{ maxHeight: 'none' }} />
		<div class="grid content-start gap-3">
			<h3 class="ac-section-title m-0">{m['standard.structure.layers']()}</h3>
			<p class="m-0 text-sm text-muted-foreground">{m['standard.structure.swap']()}</p>
			{#each LAYERS as item, i (i)}
				<div class="ac-tile grid gap-1">
					<span class="ac-label text-primary">{item.name()}</span>
					<span class="text-sm">{item.pattern()}</span>
				</div>
			{/each}
		</div>
	</div>
</AcerolaSection>

<!-- Git -->
<AcerolaSection
	data={{
		id: 'git',
		eyebrow: m['standard.git.eyebrow'](),
		title: m['standard.git.title'](),
		lead: m['standard.git.lead']()
	}}
>
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="grid content-start gap-4">
			<AcerolaCode data={{ label: 'commit', code: COMMITS }} />
			<div class="ac-row">
				{#each TYPES as type (type)}<span class="ac-badge">{type}</span>{/each}
			</div>
		</div>
		<div class="grid content-start gap-2">
			{#each BRANCHES as branch (branch.name)}
				<div
					class="flex items-center justify-between gap-4 rounded-tile bg-card px-4 py-3 shadow-lift"
				>
					<code class="font-black">{branch.name}</code>
					<span class="text-right text-sm text-muted-foreground">{branch.rule()}</span>
				</div>
			{/each}
		</div>
	</div>
</AcerolaSection>

<!-- Hooks -->
<AcerolaSection
	data={{
		id: 'hooks',
		eyebrow: m['standard.hooks.eyebrow'](),
		title: m['standard.hooks.title'](),
		lead: m['standard.hooks.lead']()
	}}
>
	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each HOOKS as item (item.hook)}
			<article class="ac-tile grid content-start gap-2">
				<span class="ac-label text-primary">{item.hook}</span>
				<code class="text-sm font-black">{item.run}</code>
				<span class="text-sm text-muted-foreground">{item.does()}</span>
			</article>
		{/each}
	</div>
</AcerolaSection>

<!-- GitHub -->
<AcerolaSection
	data={{
		id: 'github',
		eyebrow: m['standard.github.eyebrow'](),
		title: m['standard.github.title'](),
		lead: m['standard.github.lead']()
	}}
>
	<ul class="m-0 grid list-none gap-2 p-0">
		{#each ACTIONS as rule, i (i)}
			<li class="flex gap-3 rounded-tile bg-card px-4 py-3 shadow-lift">
				<span class="ac-dot mt-2 text-primary"></span><span>{rule()}</span>
			</li>
		{/each}
	</ul>
</AcerolaSection>

<!-- License -->
<AcerolaSection
	data={{
		id: 'license',
		eyebrow: m['standard.license.eyebrow'](),
		title: m['standard.license.title'](),
		lead: m['standard.license.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-3">
		<AcerolaCode data={{ label: 'package.json', code: '"license": "MPL-2.0"' }} />
		<AcerolaCode data={{ label: 'Cargo.toml', code: 'license = "MPL-2.0"' }} />
		<AcerolaCode
			data={{
				label: m['standard.license.header'](),
				code: '// SPDX-License-Identifier: MPL-2.0'
			}}
		/>
	</div>
</AcerolaSection>

<!-- New project -->
<AcerolaSection
	data={{
		id: 'start',
		eyebrow: m['standard.start.eyebrow'](),
		title: m['standard.start.title'](),
		lead: m['standard.start.lead']()
	}}
>
	<ol class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
		{#each STEPS as step, i (i)}
			<li class="ac-card grid content-start gap-2">
				<span class="font-display text-5xl text-primary">{i + 1}</span>
				<span class="font-black tracking-tight">{step.title()}</span>
				<span class="text-sm text-muted-foreground">{step.text()}</span>
			</li>
		{/each}
	</ol>
</AcerolaSection>
