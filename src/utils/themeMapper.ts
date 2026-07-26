import type { VibeTemplate, ThemeClasses, SelectableVibeTemplate } from '../types'

const MINIMALIST: ThemeClasses = {
  pageBg: 'bg-zinc-50',
  cardBg: 'bg-white',
  cardBorder: 'border border-zinc-200',
  heading: 'font-display text-4xl md:text-5xl font-light tracking-tight text-zinc-900',
  subheading: 'text-sm font-light uppercase tracking-[0.3em] text-zinc-500',
  body: 'text-zinc-600 leading-relaxed font-light',
  tag: 'bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full',
  accent: 'text-zinc-900',
  galleryGap: 'gap-8',
  heroSpacing: 'py-20 px-8',
}

const CYBERPUNK: ThemeClasses = {
  pageBg: 'bg-[#0a0a12]',
  cardBg: 'bg-[#12121f]/80 backdrop-blur-sm',
  cardBorder: 'border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  heading: 'font-mono text-4xl md:text-5xl font-bold tracking-wider text-cyan-400',
  subheading: 'text-xs font-mono uppercase tracking-[0.4em] text-fuchsia-400',
  body: 'text-gray-300 leading-relaxed',
  tag: 'bg-cyan-950/60 text-cyan-300 text-xs px-3 py-1 rounded border border-cyan-500/30 font-mono',
  accent: 'text-fuchsia-400',
  galleryGap: 'gap-4',
  heroSpacing: 'py-16 px-6',
}

const CINEMATIC: ThemeClasses = {
  pageBg: 'bg-[#0d0d0d]',
  cardBg: 'bg-[#161616]',
  cardBorder: 'border border-amber-900/30',
  heading: 'font-display text-5xl md:text-6xl font-light italic text-amber-50 tracking-wide',
  subheading: 'text-xs uppercase tracking-[0.4em] text-amber-700/80',
  body: 'text-neutral-400 leading-loose',
  tag: 'bg-amber-950/40 text-amber-200/80 text-xs px-3 py-1 border border-amber-800/30',
  accent: 'text-amber-400',
  galleryGap: 'gap-3',
  heroSpacing: 'py-20 px-8',
}

const DRAMATIC: ThemeClasses = {
  pageBg: 'bg-black',
  cardBg: 'bg-neutral-950',
  cardBorder: 'border border-neutral-800',
  heading: 'font-display text-5xl md:text-6xl font-bold text-white tracking-tight',
  subheading: 'text-xs uppercase tracking-[0.35em] text-neutral-500',
  body: 'text-neutral-400 leading-loose',
  tag: 'bg-neutral-900 text-neutral-300 text-xs px-3 py-1 border border-neutral-700',
  accent: 'text-white',
  galleryGap: 'gap-2',
  heroSpacing: 'py-24 px-8',
}

const EDITORIAL: ThemeClasses = {
  pageBg: 'bg-neutral-50',
  cardBg: 'bg-white',
  cardBorder: 'border border-neutral-200',
  heading: 'font-display text-4xl md:text-5xl font-extralight tracking-wide text-neutral-900',
  subheading: 'text-xs font-light uppercase tracking-[0.35em] text-neutral-500',
  body: 'text-neutral-600 leading-relaxed font-light',
  tag: 'bg-neutral-100 text-neutral-600 text-xs px-3 py-1 rounded-full',
  accent: 'text-neutral-900',
  galleryGap: 'gap-6',
  heroSpacing: 'py-16 px-8',
}

const STREET: ThemeClasses = {
  pageBg: 'bg-neutral-100',
  cardBg: 'bg-white',
  cardBorder: 'border border-neutral-300',
  heading: 'font-sans text-4xl md:text-5xl font-bold uppercase tracking-tight text-neutral-900',
  subheading: 'text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600',
  body: 'text-neutral-700 leading-snug font-medium',
  tag: 'bg-neutral-900 text-white text-xs px-3 py-1 uppercase tracking-wide',
  accent: 'text-neutral-900',
  galleryGap: 'gap-4',
  heroSpacing: 'py-14 px-6',
}

const DEFAULT: ThemeClasses = {
  pageBg: 'bg-zinc-100',
  cardBg: 'bg-white',
  cardBorder: 'border border-zinc-200 shadow-sm',
  heading: 'font-display text-4xl md:text-5xl font-semibold text-zinc-900',
  subheading: 'text-sm uppercase tracking-widest text-zinc-500',
  body: 'text-zinc-600 leading-relaxed',
  tag: 'bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full',
  accent: 'text-indigo-600',
  galleryGap: 'gap-6',
  heroSpacing: 'py-16 px-8',
}

const detectTemplateFromPrompt = (prompt: string): VibeTemplate => {
  const lower = prompt.toLowerCase()

  if (lower.includes('minimalist') || lower.includes('minimal')) return 'minimalist'
  if (lower.includes('cyberpunk') || lower.includes('neon')) return 'cyberpunk'
  if (lower.includes('cinematic') || lower.includes('film')) return 'cinematic'
  if (lower.includes('dramatic') || lower.includes('dark')) return 'dramatic'
  if (lower.includes('editorial') || lower.includes('magazine')) return 'editorial'
  if (lower.includes('street') || lower.includes('urban')) return 'street'

  return 'custom'
}

export const getThemeClasses = (vibePrompt: string, selectedTemplate: VibeTemplate): ThemeClasses => {
  const template = selectedTemplate === 'custom'
    ? detectTemplateFromPrompt(vibePrompt)
    : selectedTemplate

  switch (template) {
    case 'minimalist':
      return MINIMALIST
    case 'cyberpunk':
      return CYBERPUNK
    case 'cinematic':
      return CINEMATIC
    case 'dramatic':
      return DRAMATIC
    case 'editorial':
      return EDITORIAL
    case 'street':
      return STREET
    default:
      return DEFAULT
  }
}

export const VIBE_PRESETS = [
  {
    id: 'minimalist' as const,
    label: 'Minimalist',
    prompt: 'minimalist and refined with wide whitespace, thin elegant typography and quiet sophistication',
    subtitle: 'Clean lines & negative space',
  },
  {
    id: 'cyberpunk' as const,
    label: 'Cyberpunk',
    prompt: 'cyberpunk and neon with dark backgrounds, glowing accents and futuristic edge',
    subtitle: 'Neon contrasts & futuristic dusk',
  },
  {
    id: 'cinematic' as const,
    label: 'Cinematic',
    prompt: 'cinematic and widescreen with film-grain mood, golden tones and narrative depth',
    subtitle: 'Anamorphic crop & film tones',
  },
  {
    id: 'dramatic' as const,
    label: 'Dramatic',
    prompt: 'dramatic and bold with high contrast, deep shadows and powerful visual impact',
    subtitle: 'High contrast & deep shadows',
  },
  {
    id: 'editorial' as const,
    label: 'Editorial',
    prompt: 'editorial and magazine-like with refined modern typography, clean grids and fashion-forward layout',
    subtitle: 'High-fashion & magazine layout',
  },
  {
    id: 'street' as const,
    label: 'Street',
    prompt: 'street photography with raw urban energy, sharp contrast, candid moments and documentary grit',
    subtitle: 'Raw moments & candid geometry',
  },
]

export const buildCombinedVibePrompt = (templates: SelectableVibeTemplate[]): string => {
  if (templates.length === 0) {
    return 'dramatic and minimalist with wide whitespace'
  }

  return VIBE_PRESETS
    .filter((preset) => templates.includes(preset.id))
    .map((preset) => preset.prompt)
    .join('; ')
}
