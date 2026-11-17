<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { fileUrl } from '#lib/utils/url.util.ts';

	const mascot = fileUrl('/brand/mascot/acerola-mascot.svg');

	const numbers = $derived([
		{ id: 'apps', value: '4', label: m['landing.numbers.apps'](), tone: 'ac-stat--primary' },
		{
			id: 'chapters',
			value: '12k',
			label: m['landing.numbers.chapters'](),
			tone: 'ac-stat--success'
		},
		{ id: 'servers', value: '0', label: m['landing.numbers.servers'](), tone: 'ac-stat--info' },
		{ id: 'data', value: '100%', label: m['landing.numbers.data'](), tone: '' }
	]);

	const apps = $derived([
		{ name: 'Reader', text: m['landing.workspace.reader'](), tone: 'var(--chart-1)' },
		{ name: 'Sync', text: m['landing.workspace.sync'](), tone: 'var(--primary)' },
		{ name: 'Ticket', text: m['landing.workspace.ticket'](), tone: 'var(--chart-4)' }
	]);

	const steps = $derived([
		{
			n: '1',
			title: m['landing.steps.install.title'](),
			text: m['landing.steps.install.text']()
		},
		{
			n: '2',
			title: m['landing.steps.connect.title'](),
			text: m['landing.steps.connect.text']()
		},
		{ n: '3', title: m['landing.steps.read.title'](), text: m['landing.steps.read.text']() },
		{ n: '4', title: m['landing.steps.track.title'](), text: m['landing.steps.track.text']() }
	]);
</script>

<svelte:head>
	<title>{m['nav.site']()} · Acerola</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 sm:px-6">
	<p class="ac-eyebrow pt-8">{m['landing.tag']()}</p>

	<section class="grid items-center gap-10 py-12 lg:grid-cols-[1.3fr_1fr]">
		<div>
			<span class="ac-badge ac-badge--primary">{m['landing.badge']()}</span>
			<h1 class="mt-5 text-6xl leading-none font-black tracking-tighter sm:text-7xl">
				{m['landing.title']()} <span class="text-primary">{m['landing.highlight']()}</span>
			</h1>
			<p class="mt-6 max-w-lg text-lg text-muted-foreground">{m['landing.lead']()}</p>
			<div class="ac-row mt-8">
				<a class="ac-btn ac-btn--primary ac-btn--lg" href="#apps">{m['landing.apps']()}</a>
				<a class="ac-btn ac-btn--lg" href="#how">{m['landing.how']()}</a>
			</div>
		</div>
		<div class="grid aspect-square place-items-center rounded-sheet bg-card p-10 shadow-float">
			<img src={mascot} alt={m['pieces.alt']()} class="max-h-full" />
		</div>
	</section>

	<section
		class="grid grid-cols-2 gap-3 py-6 md:grid-cols-4"
		aria-label={m['landing.numbers.label']()}
	>
		{#each numbers as item (item.id)}
			<div class="ac-stat {item.tone}">
				<span class="ac-label">{item.label}</span><span class="ac-stat__value"
					>{item.value}</span
				>
			</div>
		{/each}
	</section>

	<section id="apps" class="py-12">
		<p class="ac-eyebrow">{m['landing.workspace.eyebrow']()}</p>
		<h2 class="ac-title mt-1">{m['landing.workspace.title']()}</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-3">
			{#each apps as app (app.name)}
				<article class="overflow-hidden rounded-card bg-card shadow-lift">
					<div class="h-36" style:background={app.tone}></div>
					<div class="grid gap-2 p-5">
						<div class="flex items-center justify-between gap-2">
							<h3 class="ac-section-title">Acerola {app.name}</h3>
							<span class="ac-badge ac-badge--success"
								><span class="ac-dot"></span>{m['landing.workspace.live']()}</span
							>
						</div>
						<p class="m-0 text-sm text-muted-foreground">{app.text}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section id="how" class="py-12">
		<p class="ac-eyebrow">{m['landing.steps.eyebrow']()}</p>
		<h2 class="ac-title mt-1">{m['landing.steps.title']()}</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each steps as step (step.n)}
				<div class="ac-card">
					<p class="ac-number m-0 text-5xl text-primary">{step.n}</p>
					<p class="mt-3 mb-0 font-black tracking-tight">{step.title}</p>
					<p class="m-0 text-sm text-muted-foreground">{step.text}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Call to action: brand-colored background, contrast button -->
	<section
		class="my-12 grid items-center gap-6 overflow-hidden rounded-sheet bg-primary p-8 text-primary-foreground sm:p-12 md:grid-cols-[1fr_auto]"
	>
		<div>
			<h2 class="ac-title">{m['landing.cta.title']()}</h2>
			<p class="mt-3 max-w-md font-medium">{m['landing.cta.text']()}</p>
			<a class="ac-btn ac-btn--contrast ac-btn--lg mt-6" href="#apps"
				>{m['landing.cta.action']()}</a
			>
		</div>
		<img src={mascot} alt="" class="hidden w-56 md:block" />
	</section>
</div>
