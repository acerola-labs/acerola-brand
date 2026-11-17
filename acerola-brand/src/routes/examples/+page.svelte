<script lang="ts">
	import { onMount } from 'svelte';
	import AcerolaCode from '#lib/components/acerola-code/acerola-code.svelte';
	import AcerolaSection from '#lib/components/acerola-section/acerola-section.svelte';
	import { BRAND_DIR, EXAMPLES } from '#lib/data/examples.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { absoluteFileUrl, fileUrl } from '#lib/utils/url.util.ts';

	/** The rendered example uses the relative path; the code shows this server's full address. */
	const renderBase = fileUrl('/brand');
	let codeBase = $state('/brand');
	onMount(() => (codeBase = absoluteFileUrl('/brand')));
</script>

<svelte:head>
	<title>{m['nav.components']()} · Acerola</title>
</svelte:head>

<AcerolaSection
	data={{
		id: 'components',
		eyebrow: m['examples.eyebrow'](),
		title: m['examples.title'](),
		lead: m['examples.lead']()
	}}
>
	<div class="grid gap-6">
		{#each EXAMPLES as example (example.id)}
			<article
				id={example.id}
				class="grid gap-4 rounded-sheet bg-card p-5 shadow-lift lg:grid-cols-2"
			>
				<div class="grid content-start gap-4">
					<header>
						<h3 class="m-0 text-xl font-extrabold">{example.title()}</h3>
						<p class="mt-1 mb-0 text-sm text-muted-foreground">{example.note()}</p>
					</header>
					<div class="rounded-card bg-background p-5">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own HTML (data/examples.ts), no user input. -->
						{@html example.html.replaceAll(BRAND_DIR, renderBase)}
					</div>
				</div>
				<AcerolaCode data={{ code: example.html.replaceAll(BRAND_DIR, codeBase) }} />
			</article>
		{/each}
	</div>
</AcerolaSection>
