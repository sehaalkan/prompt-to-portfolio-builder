import type { SelectableVibeTemplate } from '../types'

export const vibeGlows: Record<SelectableVibeTemplate, string> = {
  minimalist: 'rgba(245, 245, 240, 0.55)',
  cyberpunk: 'rgba(168, 85, 247, 0.45)',
  cinematic: 'rgba(245, 158, 11, 0.4)',
  dramatic: 'rgba(75, 85, 99, 0.45)',
  editorial: 'rgba(236, 72, 153, 0.35)',
  street: 'rgba(14, 165, 233, 0.4)',
}

export const DEFAULT_GLOW_COLOR = 'rgba(219, 234, 254, 0.45)'

export const getGlowBackgroundColor = (selectedStyles: SelectableVibeTemplate[]): string => {
  if (selectedStyles.length === 0) {
    return DEFAULT_GLOW_COLOR
  }

  const lastSelected = selectedStyles[selectedStyles.length - 1]
  return vibeGlows[lastSelected] ?? DEFAULT_GLOW_COLOR
}
