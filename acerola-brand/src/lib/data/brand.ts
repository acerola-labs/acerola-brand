/**
 * Brand book content: what each token does, which pieces exist and what can be downloaded.
 * Text is never stored here: each entry points at a Paraglide message, called in the template so
 * it follows the current locale. Color values come from tokens.json (built from tokens.css).
 */
import { m } from '#lib/paraglide/messages.js';

type Message = () => string;

export type TokenGroup = {
	id: string;
	title: Message;
	note: Message;
	tokens: { name: string; role: Message }[];
};

export const TOKEN_GROUPS: TokenGroup[] = [
	{
		id: 'accent',
		title: m['tokens.groups.accent.title'],
		note: m['tokens.groups.accent.note'],
		tokens: [
			{ name: 'primary', role: m['tokens.roles.primary'] },
			{ name: 'primary-foreground', role: m['tokens.roles.primaryForeground'] },
			{ name: 'primary-soft', role: m['tokens.roles.primarySoft'] },
			{ name: 'accent-hero', role: m['tokens.roles.accentHero'] },
			{ name: 'ring', role: m['tokens.roles.ring'] }
		]
	},
	{
		id: 'surface',
		title: m['tokens.groups.surface.title'],
		note: m['tokens.groups.surface.note'],
		tokens: [
			{ name: 'crust', role: m['tokens.roles.crust'] },
			{ name: 'mantle', role: m['tokens.roles.mantle'] },
			{ name: 'background', role: m['tokens.roles.background'] },
			{ name: 'card', role: m['tokens.roles.card'] },
			{ name: 'surface', role: m['tokens.roles.surface'] },
			{ name: 'muted', role: m['tokens.roles.muted'] },
			{ name: 'border', role: m['tokens.roles.border'] },
			{ name: 'foreground', role: m['tokens.roles.foreground'] },
			{ name: 'muted-foreground', role: m['tokens.roles.mutedForeground'] },
			{ name: 'subtext', role: m['tokens.roles.subtext'] }
		]
	},
	{
		id: 'state',
		title: m['tokens.groups.state.title'],
		note: m['tokens.groups.state.note'],
		tokens: [
			{ name: 'success', role: m['tokens.roles.success'] },
			{ name: 'success-soft', role: m['tokens.roles.successSoft'] },
			{ name: 'warning', role: m['tokens.roles.warning'] },
			{ name: 'warning-soft', role: m['tokens.roles.warningSoft'] },
			{ name: 'info', role: m['tokens.roles.info'] },
			{ name: 'info-soft', role: m['tokens.roles.infoSoft'] },
			{ name: 'destructive', role: m['tokens.roles.destructive'] },
			{ name: 'destructive-soft', role: m['tokens.roles.destructiveSoft'] }
		]
	},
	{
		id: 'chart',
		title: m['tokens.groups.chart.title'],
		note: m['tokens.groups.chart.note'],
		tokens: [1, 2, 3, 4, 5].map((n) => ({
			name: `chart-${n}`,
			role: () => m['tokens.roles.chart']({ n })
		}))
	}
];

export const RADII: { token: string; value: string | Message; use: Message }[] = [
	{ token: 'radius-sheet', value: '32px', use: m['radii.sheet'] },
	{ token: 'radius-card', value: '28px', use: m['radii.card'] },
	{ token: 'radius-tile', value: '24px', use: m['radii.tile'] },
	{ token: 'radius-inner', value: '16px', use: m['radii.inner'] },
	{ token: 'radius-full', value: m['radii.pill'], use: m['radii.full'] }
];

export type Font = {
	name: string;
	token: string;
	role: Message;
	sample: Message;
	sampleClass: string;
	rules: Message[];
};

export const FONTS: Font[] = [
	{
		name: 'DM Sans',
		token: '--font-sans',
		role: m['fonts.sans.role'],
		sample: m['fonts.sans.sample'],
		sampleClass: 'font-sans font-black tracking-tighter',
		rules: [
			m['fonts.sans.rules.use'],
			m['fonts.sans.rules.weight'],
			m['fonts.sans.rules.numbers']
		]
	},
	{
		name: 'Noto Serif',
		token: '--font-heading',
		role: m['fonts.heading.role'],
		sample: m['fonts.heading.sample'],
		sampleClass: 'font-heading font-bold',
		rules: [m['fonts.heading.rules.use'], m['fonts.heading.rules.rare']]
	},
	{
		name: 'Titan One',
		token: '--font-display',
		role: m['fonts.display.role'],
		sample: m['fonts.display.sample'],
		sampleClass: 'font-display uppercase',
		rules: [
			m['fonts.display.rules.use'],
			m['fonts.display.rules.size'],
			m['fonts.display.rules.never']
		]
	}
];

export type Piece = { title: Message; file: `/${string}`; use: Message };

export const PIECES: Piece[] = [
	{
		title: m['pieces.icon.title'],
		file: '/brand/logo/acerola-logo-foreground.svg',
		use: m['pieces.icon.use']
	},
	{
		title: m['pieces.mascot.title'],
		file: '/brand/mascot/acerola-mascot.svg',
		use: m['pieces.mascot.use']
	},
	{
		title: m['pieces.plate.title'],
		file: '/brand/logo/acerola-logo.svg',
		use: m['pieces.plate.use']
	},
	{
		title: m['pieces.mono.title'],
		file: '/brand/logo/acerola-logo-monochrome.svg',
		use: m['pieces.mono.use']
	}
];

/** Folders inside each icon pack, one per platform, in the order the page lists them. */
const ICON_PLATFORMS = [
	'android',
	'androidtv',
	'ios',
	'macos',
	'tvos',
	'watchos',
	'web',
	'play-store'
] as const;

export const ICON_PACKS = [
	{
		title: m['packs.icon'],
		base: '/brand/icons/logo',
		preview: '/brand/icons/logo/web/icon-512.png',
		platforms: ICON_PLATFORMS
	},
	{
		title: m['packs.mascot'],
		base: '/brand/icons/mascot',
		preview: '/brand/icons/mascot/web/icon-512.png',
		platforms: ICON_PLATFORMS
	}
] as const;

export type Download = { file: string; title: Message; text: Message };

export const DOWNLOADS: Download[] = [
	{
		file: 'acerola-brand.zip',
		title: m['downloads.brand.title'],
		text: m['downloads.brand.text']
	},
	{
		file: 'acerola-template.zip',
		title: m['downloads.template.title'],
		text: m['downloads.template.text']
	},
	{
		file: 'acerola-skills.zip',
		title: m['downloads.skills.title'],
		text: m['downloads.skills.text']
	},
	{
		file: 'acerola-logos.zip',
		title: m['downloads.logos.title'],
		text: m['downloads.logos.text']
	},
	{
		file: 'acerola-icons.zip',
		title: m['downloads.icons.title'],
		text: m['downloads.icons.text']
	},
	{
		file: 'acerola-css.zip',
		title: m['downloads.css.title'],
		text: m['downloads.css.text']
	},
	{
		file: 'acerola-fonts.zip',
		title: m['downloads.fonts.title'],
		text: m['downloads.fonts.text']
	}
];
