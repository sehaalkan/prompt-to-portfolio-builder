import { usePortfolio } from '../context/PortfolioContext'
import { ProfileForm } from './ProfileForm'
import { VibeSelector } from './VibeSelector'
import { ImageUploader } from './ImageUploader'
import { ExportButton } from './ExportButton'

export const ControlPanel = () => {
  const { error, clearError } = usePortfolio()

  return (
    <aside className="flex flex-col gap-8 p-6 lg:p-8 overflow-y-auto max-h-screen lg:max-h-[100vh]">
      <header>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Prompt-to-Portfolio
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Upload photos, set your vibe, let AI craft your story
        </p>
      </header>

      {error && (
        <div
          className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
          role="alert"
        >
          <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-red-300">{error}</p>
          </div>
          <button
            type="button"
            onClick={clearError}
            aria-label="Dismiss error"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <ProfileForm />
      <VibeSelector />
      <ImageUploader />

      <div className="pt-4 border-t border-night-100">
        <ExportButton />
      </div>
    </aside>
  )
}
