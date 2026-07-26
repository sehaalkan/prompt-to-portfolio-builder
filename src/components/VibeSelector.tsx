import { usePortfolio } from '../context/PortfolioContext'
import { VIBE_PRESETS } from '../utils/themeMapper'
import { Textarea } from './ui/Textarea'
import type { SelectableVibeTemplate } from '../types'

export const VibeSelector = () => {
  const { vibePrompt, selectedTemplates, setVibePrompt, toggleSelectedTemplate } = usePortfolio()

  const handlePresetClick = (id: SelectableVibeTemplate) => {
    toggleSelectedTemplate(id)
  }

  return (
    <section aria-labelledby="vibe-heading" className="space-y-4">
      <h2 id="vibe-heading" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
        Portfolio Vibe
      </h2>

      <div className="flex flex-wrap gap-2">
        {VIBE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePresetClick(preset.id)}
            aria-label={`Toggle ${preset.label} vibe template`}
            aria-pressed={selectedTemplates.includes(preset.id)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500/50
              ${selectedTemplates.includes(preset.id)
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-night-50 text-gray-400 border border-night-100 hover:border-indigo-500/40 hover:text-gray-200'
              }
            `}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <Textarea
        label="Custom Vibe Prompt"
        value={vibePrompt}
        onChange={(e) => setVibePrompt(e.target.value)}
        placeholder="Describe your portfolio style... e.g. dramatic and minimalist, cyberpunk and neon"
        rows={3}
        aria-label="Custom vibe prompt"
      />
    </section>
  )
}
