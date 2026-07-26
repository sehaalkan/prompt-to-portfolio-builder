import { usePortfolio } from '../../context/PortfolioContext'
import { useLanguage } from '../../context/LanguageContext'
import { generatePortfolioHtml, downloadPortfolioHtml } from '../../utils/exportPortfolio'
import { getActiveSocialLinks } from '../../utils/socialLinks'
import { getLocalizedDescription, getLocalizedTones } from '../../utils/localizedAnalysis'
import { LanguageToggle } from '../ui/LanguageToggle'
import { SocialLinksLine } from '../ui/SocialLinksLine'

const formatTonesLine = (tones: string[]): string => tones.join('  /  ')

type Step3BentoGalleryProps = {
  onBack: () => void
}

export const Step3BentoGallery = ({ onBack }: Step3BentoGalleryProps) => {
  const {
    profile,
    images,
    exportStatus,
    setExportStatus,
    isAnalyzing,
  } = usePortfolio()
  const { lang, t } = useLanguage()

  const fullName = `${profile.firstName} ${profile.lastName}`.trim()
  const socialLinks = getActiveSocialLinks(profile.socialLinks)

  const handleExport = () => {
    setExportStatus('exporting')

    try {
      const html = generatePortfolioHtml({ profile, images, lang })
      const filename = `${profile.firstName || 'portfolio'}-${profile.lastName || 'export'}.html`
        .toLowerCase()
        .replace(/\s+/g, '-')

      downloadPortfolioHtml(html, filename)
      setExportStatus('success')
      setTimeout(() => setExportStatus('idle'), 3000)
    } catch {
      setExportStatus('error')
      setTimeout(() => setExportStatus('idle'), 3000)
    }
  }

  return (
    <section
      className="mx-auto w-full overflow-x-hidden pb-24 animate-stepEnter rounded-2xl bg-[#fcfbf9] transition-colors duration-500 ease-in-out dark:bg-neutral-950"
      aria-labelledby="step3-heading"
    >
      <header className="mx-auto mb-8 flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 pt-2 md:flex-row md:items-center md:px-6">
        <div>
          <p className="minimal-label mb-5">{t.step3Label}</p>

          <div className="flex flex-col">
            {profile.title && (
              <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-400 font-mono dark:text-neutral-500">
                {profile.title}
              </p>
            )}
            <h1
              id="step3-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 dark:text-neutral-50 leading-none mt-1 transition-colors duration-500 ease-in-out"
            >
              {fullName}
            </h1>
            <SocialLinksLine links={socialLinks} />
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 sm:gap-5 md:w-auto md:justify-end">
          <LanguageToggle />
          <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
          <button
            type="button"
            onClick={onBack}
            className="text-[11px] uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-300 font-mono flex items-center gap-1 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label="Go back"
          >
            <span aria-hidden="true">←</span>
            {t.back}
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={exportStatus === 'exporting' || images.length === 0}
            className="group bg-neutral-950 text-white text-[11px] uppercase tracking-widest font-mono px-5 py-3 rounded-lg hover:bg-neutral-900 transition-all duration-300 flex items-center gap-2 font-medium disabled:cursor-not-allowed disabled:opacity-35 dark:bg-neutral-950 dark:hover:bg-neutral-900"
            aria-label="Export portfolio as HTML"
          >
            {exportStatus === 'exporting' ? t.exporting : t.export}
            {exportStatus !== 'exporting' && (
              <span
                className="transition-colors duration-300 group-hover:text-red-500"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </button>
        </div>
      </header>

      {exportStatus === 'success' && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mb-8 tracking-widest uppercase px-6" role="status">
          {t.exportSuccess}
        </p>
      )}

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-neutral-400 px-6">
          <p className="text-sm tracking-widest uppercase">{t.noImages}</p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-6xl columns-1 gap-x-8 px-4 md:columns-2 md:px-6 [column-gap:2rem]">
          {images.map((image) => {
            const description = getLocalizedDescription(image.analysis, lang)
            const tones = getLocalizedTones(image.analysis, lang)

            return (
              <article
                key={image.id}
                tabIndex={0}
                aria-label={description ?? 'Portfolio photograph'}
                className="mb-8 block w-full break-inside-avoid"
              >
                <img
                  src={`data:${image.mimeType};base64,${image.base64}`}
                  alt=""
                  className="block h-auto w-full max-w-full rounded-xl object-contain"
                />

                {description ? (
                  <div className="w-full text-left">
                    <p className="mt-3 text-sm font-light leading-relaxed tracking-wide text-neutral-700 dark:text-neutral-300">
                      {description}
                    </p>
                    {tones.length > 0 && (
                      <div className="mb-8 mt-2">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                          {formatTonesLine(tones)}
                        </span>
                      </div>
                    )}
                    {tones.length === 0 && <div className="mb-8" aria-hidden="true" />}
                  </div>
                ) : (
                  <p className="mb-8 mt-3 text-left text-sm font-light italic text-neutral-400">
                    {isAnalyzing ? t.analyzing : t.awaitingAnalysis}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
