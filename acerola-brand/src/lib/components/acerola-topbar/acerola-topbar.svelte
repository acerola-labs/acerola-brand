<script lang="ts">
	import Languages from '@lucide/svelte/icons/languages';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { useLocale } from '#lib/hooks/use-locale/use-locale.svelte.ts';
	import { useTheme } from '#lib/hooks/use-theme/use-theme.svelte.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { fileUrl } from '#lib/utils/url.util.ts';

	const theme = useTheme();
	const locale = useLocale();

	const links = [
		{
			id: 'brand',
			href: resolve('/'),
			label: m['nav.brand'],
			match: (path: string) => path === resolve('/')
		},
		{
			id: 'components',
			href: resolve('/examples'),
			label: m['nav.components'],
			match: (path: string) => path.replace(/\/$/, '') === resolve('/examples')
		},
		{
			id: 'app',
			href: resolve('/examples/app'),
			label: m['nav.app'],
			match: (path: string) => path.startsWith(resolve('/examples/app'))
		},
		{
			id: 'site',
			href: resolve('/examples/site'),
			label: m['nav.site'],
			match: (path: string) => path.startsWith(resolve('/examples/site'))
		},
		{
			id: 'standard',
			href: resolve('/standard'),
			label: m['nav.standard'],
			match: (path: string) => path.startsWith(resolve('/standard'))
		}
	];
</script>

<header class="sticky top-0 z-20 bg-background/85 backdrop-blur-md">
	<div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
		<a href={resolve('/')} class="flex items-center gap-2.5" aria-label={m['nav.home']()}>
			<img src={fileUrl('/brand/logo/acerola-logo-foreground.svg')} alt="" class="size-9" />
			<span class="text-xl font-black tracking-tight">Acerola</span>
		</a>

		<nav
			class="ml-auto hidden items-center gap-1 rounded-full bg-surface p-1 md:flex"
			aria-label={m['nav.sections']()}
		>
			{#each links as link (link.id)}
				<a
					href={link.href}
					aria-current={link.match(page.url.pathname) ? 'page' : undefined}
					class="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-colors aria-[current=page]:bg-foreground aria-[current=page]:text-background"
				>
					{link.label()}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="ac-btn ml-auto gap-1.5 px-3 md:ml-0"
			onclick={locale.toggle}
			aria-label={m['nav.language']()}
			title={m['nav.language']()}
		>
			<Languages size={16} />
			<span class="uppercase">{locale.current === 'en' ? 'pt' : 'en'}</span>
		</button>

		<button
			type="button"
			class="ac-btn ac-btn--icon"
			onclick={theme.toggle}
			aria-label={theme.current === 'dark' ? m['nav.theme.light']() : m['nav.theme.dark']()}
		>
			{#if theme.current === 'dark'}<Sun size={18} />{:else}<Moon size={18} />{/if}
		</button>
	</div>

	<nav class="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden" aria-label={m['nav.sections']()}>
		{#each links as link (link.id)}
			<a
				href={link.href}
				aria-current={link.match(page.url.pathname) ? 'page' : undefined}
				class="shrink-0 rounded-full bg-surface px-4 py-2 text-sm font-bold text-muted-foreground aria-[current=page]:bg-foreground aria-[current=page]:text-background"
			>
				{link.label()}
			</a>
		{/each}
	</nav>
</header>
