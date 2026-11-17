<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { m } from '#lib/paraglide/messages.js';

	type Props = {
		data: { name: string; role: string; value: string };
		events: { copy: (text: string) => void };
		ui?: { copied?: boolean };
	};

	let { data, events, ui = {} }: Props = $props();
</script>

<button
	type="button"
	class="group flex w-full flex-col overflow-hidden rounded-tile bg-card text-left shadow-lift transition-transform duration-300 ease-brand hover:-translate-y-0.5"
	onclick={() => events.copy(data.value)}
	aria-label={m['swatch.copy']({ name: data.name, value: data.value })}
>
	<span class="flex h-20 w-full items-end justify-end p-3" style:background="var(--{data.name})">
		<span
			class="rounded-full bg-scrim/60 px-2.5 py-1 font-mono text-xs font-bold text-on-scrim"
		>
			{#if ui.copied}<Check size={12} class="inline" />
				{m['common.copied']()}{:else}{data.value}{/if}
		</span>
	</span>
	<span class="grid gap-0.5 p-3">
		<span class="text-sm font-bold">{data.name}</span>
		<span class="font-mono text-xs text-muted-foreground">--{data.name}</span>
		<span class="text-xs text-muted-foreground">{data.role}</span>
	</span>
</button>
