import { type KeyboardEvent, type ElementType } from 'react'
import {
  BookOpen,
  Cpu,
  Eye,
  Film,
  Moon,
} from 'lucide-react'
import { VIBE_PRESETS } from '../../utils/themeMapper'
import type { SelectableVibeTemplate } from '../../types'
import { useLanguage } from '../../context/LanguageContext'

type VibeBentoGridProps = {
  selectedTemplates: SelectableVibeTemplate[]
  onToggle: (id: SelectableVibeTemplate) => void
}

const VIBE_ICONS: Partial<Record<SelectableVibeTemplate, ElementType>> = {
  cyberpunk: Cpu,
  cinematic: Film,
  dramatic: Moon,
  editorial: BookOpen,
  street: Eye,
}

const idleTone = 'text-neutral-500 dark:text-neutral-400'
const selectedTone = 'text-black dark:text-neutral-100'

export const VibeBentoGrid = ({ selectedTemplates, onToggle }: VibeBentoGridProps) => {
  const { t } = useLanguage()
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, id: SelectableVibeTemplate) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle(id)
    }
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
      role="group"
      aria-label="Portfolio vibe selection"
    >
      {VIBE_PRESETS.map((preset) => {
        const isSelected = selectedTemplates.includes(preset.id)
        const Icon = VIBE_ICONS[preset.id]
        const tone = isSelected ? selectedTone : idleTone
        const metaTone = isSelected
          ? 'text-black dark:text-neutral-100 opacity-100'
          : 'text-neutral-400 dark:text-neutral-400'

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onToggle(preset.id)}
            onKeyDown={(e) => handleKeyDown(e, preset.id)}
            aria-label={`${isSelected ? 'Deselect' : 'Select'} ${preset.label} vibe`}
            aria-pressed={isSelected}
            className={`
              group relative box-border flex w-full items-center rounded-lg px-4 py-3.5 text-left
              border border-solid backdrop-blur-sm transition-all duration-300 ease-out
              hover:-translate-y-1
              focus:outline-none focus:ring-2 focus:ring-neutral-400/25 dark:focus:ring-neutral-500/25
              ${isSelected
                ? `border-neutral-900 bg-white/60 dark:border-neutral-100 dark:bg-neutral-900/60 ${selectedTone}`
                : `border-neutral-200/40 bg-white/30 dark:border-neutral-800/40 dark:bg-neutral-900/30 ${idleTone}`
              }
            `}
          >
            <div className="relative z-10 grid min-w-0 flex-1 grid-cols-[auto_1fr] items-center gap-3">
              <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center self-center">
                {Icon && (
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={`shrink-0 opacity-100 transition-colors duration-300 ${tone}`}
                    aria-hidden="true"
                  />
                )}
              </span>

              <div className="min-w-0 leading-snug">
                <span
                  className={`block font-sans text-sm font-medium uppercase tracking-wider opacity-100 transition-colors duration-300 ${tone}`}
                >
                  {t.vibes[preset.id].label}
                </span>
                <span
                  className={`mt-1 block font-sans text-[11px] font-normal leading-snug transition-colors duration-300 ${metaTone}`}
                >
                  {t.vibes[preset.id].subtitle}
                </span>
              </div>
            </div>

            {isSelected && (
              <span
                className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#c92a2a] shadow-[0_0_8px_rgba(201,42,42,0.45)]"
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
