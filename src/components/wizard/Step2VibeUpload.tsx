import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { useLanguage } from '../../context/LanguageContext'
import { X } from 'lucide-react'
import { VibeBentoGrid } from './VibeBentoGrid'
import { AmbientGlow } from '../ui/AmbientGlow'
import { DashDropZone } from '../ui/DashDropZone'
import { LoadingSkeleton } from '../ui/LoadingSkeleton'

type Step2VibeUploadProps = {
  onContinue: () => void
  onBack: () => void
}

export const Step2VibeUpload = ({ onContinue, onBack }: Step2VibeUploadProps) => {
  const [toastMessage, setToastMessage] = useState('')

  const {
    profile,
    selectedTemplates,
    toggleSelectedTemplate,
    images,
    isAnalyzing,
    analysisProgress,
    addImages,
    removeImage,
    analyzeImages,
  } = usePortfolio()
  const { t } = useLanguage()

  const displayName = profile.firstName.trim()

  const canContinue = images.length > 0 && !isAnalyzing && selectedTemplates.length > 0
  const hasAnalysis = images.some((img) => img.analysis !== null)

  const handleContinue = async () => {
    if (images.length > 0) {
      await analyzeImages()
    }
    onContinue()
  }

  const handleFileUpload = async (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))
    if (imageFiles.length === 0) return

    for (const file of imageFiles) {
      const isDuplicate = images.some(
        (img) => img.name === file.name && img.size === file.size
      )

      if (isDuplicate) {
        setToastMessage(t.duplicatePhoto)
        setTimeout(() => setToastMessage(''), 3000)
        return
      }
    }

    await addImages(imageFiles)
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <section
        className="relative isolate z-0 w-full px-4 md:px-6 step-enter overflow-x-hidden"
        aria-labelledby="step2-heading"
      >
        <AmbientGlow selectedStyles={selectedTemplates} variant="header" />

        <header className="relative z-10 mb-16 md:mb-20 text-center sm:text-left">
          <p className="minimal-label mb-5">{t.step2Label}</p>
          <h1
            id="step2-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-2 transition-colors duration-500 ease-in-out"
          >
            <span className="step2-heading-enter">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{t.step2HeadingPrefix} </span>
              <span className="italic text-neutral-500 dark:text-neutral-400">
                {t.step2HeadingVibe}{displayName ? ',' : ''}
              </span>
            </span>
            {displayName && (
              <>
                {' '}
                <span className="step2-heading-accent-enter italic text-[#c92a2a] dark:text-red-500 sm:whitespace-nowrap">
                  {displayName}?
                </span>
              </>
            )}
          </h1>
          <p className="step2-subcopy-enter mt-3 text-neutral-500 dark:text-neutral-400 font-sans text-base max-w-md transition-colors duration-500 ease-in-out">
            {t.step2Subcopy}
          </p>
        </header>

        <div className="space-y-12">
          <div className="pt-2 md:pt-4">
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <p className="minimal-label mb-0">{t.chooseStyle}</p>
              {selectedTemplates.length > 0 && (
                <span
                  className="text-[11px] font-medium uppercase tracking-widest text-[#c92a2a] transition-opacity duration-300 ease-out"
                  aria-live="polite"
                >
                  [ {selectedTemplates.length} {t.selected} ]
                </span>
              )}
            </div>
            <VibeBentoGrid
              selectedTemplates={selectedTemplates}
              onToggle={toggleSelectedTemplate}
            />
          </div>

          <div className="w-full min-w-0">
            <p className="minimal-label mb-5">{t.uploadPhotos}</p>

            <div className="flex w-full min-w-0 flex-col">
              <DashDropZone
                onFilesSelected={handleFileUpload}
                disabled={isAnalyzing}
              />

              {images.length > 0 && (
                <div className="mt-6 grid w-full min-w-0 grid-cols-2 gap-4 md:grid-cols-4 m-0 p-0">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="group relative aspect-square w-full min-w-0 overflow-hidden rounded-xl border border-neutral-200/30 dark:border-neutral-700/40"
                    >
                      <img
                        src={`data:${image.mimeType};base64,${image.base64}`}
                        alt={image.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {image.analysis && (
                        <div
                          className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-black/70 dark:bg-neutral-100/80"
                          aria-hidden="true"
                        />
                      )}
                      {!isAnalyzing && (
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          aria-label={`Remove ${image.name}`}
                          className="group/delete absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
                        >
                          <span
                            className="absolute inset-0 bg-black/40 transition-all duration-300"
                            aria-hidden="true"
                          />
                          <X
                            size={20}
                            strokeWidth={1.5}
                            className="relative z-10 text-white opacity-80 transition-opacity duration-300 group-hover/delete:opacity-100"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isAnalyzing && (
            <LoadingSkeleton
              message={t.reading}
              progress={analysisProgress}
            />
          )}
        </div>

        <footer className="mt-8 flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto font-mono text-[11px] uppercase tracking-widest text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="Go back to profile"
          >
            ← {t.back}
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue && !isAnalyzing}
            className={`group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-lg bg-neutral-950 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white transition-all duration-300 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-neutral-100 ${
              isAnalyzing ? 'pointer-events-none opacity-50' : 'disabled:opacity-35'
            }`}
            aria-label="Continue to gallery"
          >
            {isAnalyzing ? t.analyzingContinue : hasAnalysis ? t.viewGallery : t.analyzeContinue}
            {!isAnalyzing && (
              <span
                className="text-white transition-colors duration-300 group-hover:text-red-500 dark:text-neutral-900 dark:group-hover:text-red-500"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </button>
        </footer>
      </section>

      {toastMessage && (
        <div
          className="pointer-events-none fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2 transform"
          role="status"
          aria-live="polite"
        >
          <div
            className="animate-fade-in-up bg-[#111111] text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs tracking-widest uppercase px-6 py-3 rounded-lg shadow-2xl border border-neutral-800 dark:border-neutral-200 transition-all duration-300 ease-out"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  )
}
