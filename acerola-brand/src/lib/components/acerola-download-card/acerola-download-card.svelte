<script lang="ts">
	import Download from '@lucide/svelte/icons/download';
	import { m } from '#lib/paraglide/messages.js';
	import { formatBytes } from '#lib/utils/url.util.ts';

	type Props = {
		data: {
			title: string;
			text: string;
			href: string;
			file: string;
			bytes?: number;
			files?: number;
		};
		ui?: { primary?: boolean };
	};

	let { data, ui = {} }: Props = $props();
</script>

<a
	href={data.href}
	download={data.file}
	class="group flex flex-col gap-3 rounded-card p-5 shadow-lift transition-transform duration-300 ease-brand hover:-translate-y-0.5 {ui.primary
		? 'bg-primary text-primary-foreground'
		: 'bg-card'}"
>
	<span class="flex items-start justify-between gap-3">
		<span class="text-lg font-extrabold">{data.title}</span>
		<span
			class="grid size-10 shrink-0 place-items-center rounded-full {ui.primary
				? 'bg-foreground text-background'
				: 'bg-surface'}"
		>
			<Download size={18} />
		</span>
	</span>
	<span class="text-sm {ui.primary ? '' : 'text-muted-foreground'}">{data.text}</span>
	<span class="mt-auto text-xs font-bold tabular-nums opacity-80">
		{data.file}{#if data.bytes}&nbsp;· {formatBytes(data.bytes)} · {m['common.files']({
				count: data.files ?? 0
			})}{/if}
	</span>
</a>
