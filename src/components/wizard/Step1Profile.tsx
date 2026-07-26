import { type KeyboardEvent } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { useLanguage } from '../../context/LanguageContext'
import { MinimalInput } from '../ui/MinimalInput'
import { AmbientGlow } from '../ui/AmbientGlow'
import type { LensPhase } from './ApertureLens'

type Step1ProfileProps = {
  isExiting: boolean
  onContinue: () => void
  lensPhase?: LensPhase
}

export const Step1Profile = ({ isExiting, onContinue, lensPhase = 'open' }: Step1ProfileProps) => {
  const { profile, updateProfile, updateSocialLink, selectedTemplates } = usePortfolio()
  const { t, lang } = useLanguage()

  const canContinue = profile.firstName.trim().length > 0

  const handleContinue = () => {
    if (!canContinue) return
    onContinue()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && canContinue) onContinue()
  }

  return (
    <section
      className={`relative mx-auto w-full max-w-4xl px-4 md:px-10 ${isExiting ? 'pointer-events-none' : 'step-enter'}`}
      aria-labelledby="step1-heading"
      onKeyDown={handleKeyDown}
    >
      <div className={`mb-12 ${isExiting ? 'step-content-exit' : ''}`}>
        <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium block mb-4 transition-colors duration-500 ease-in-out">
          {t.step1Label}
        </span>

        <div className="grid grid-cols-1 items-center gap-x-10 gap-y-8 md:grid-cols-2 lg:gap-x-16 xl:gap-x-20">
          <div className="flex flex-col">
            <h1
              id="step1-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight transition-colors duration-500 ease-in-out"
            >
              {t.step1HeadingLine1 && (
                <>
                  <span className="text-neutral-900 dark:text-neutral-200">{t.step1HeadingLine1}</span>
                  <br />
                </>
              )}
              {t.step1HeadingPrimary && (
                <span className="text-neutral-900 dark:text-neutral-200">{t.step1HeadingPrimary}</span>
              )}
              {t.step1HeadingPrimary && t.step1HeadingSecondary && ' '}
              {t.step1HeadingSecondary && (
                <span className="italic font-light text-neutral-900 dark:text-neutral-200">
                  {t.step1HeadingSecondary}
                </span>
              )}
              {t.step1HeadingHighlight && (
                <>
                  {' '}
                  <span
                    className={`italic font-light ${
                      lang === 'TR'
                        ? 'text-neutral-500 dark:text-neutral-400'
                        : 'text-red-500 dark:text-red-500'
                    }`}
                  >
                    {t.step1HeadingHighlight}
                  </span>
                </>
              )}
              {t.step1HeadingTail && (
                <span className="text-red-500 dark:text-red-500">{t.step1HeadingTail}</span>
              )}
            </h1>

            <p className="mt-4 max-w-md font-sans text-base text-neutral-500 transition-colors duration-500 ease-in-out dark:text-neutral-400">
              {t.step1Subcopy}
            </p>
          </div>

          <div
            className={`relative isolate z-0 flex shrink-0 justify-center md:justify-end md:mr-6 lg:mr-10 ${
              isExiting || lensPhase === 'hero-fly' ? 'aperture-lens-hero-fly' : ''
            }`}
          >
            <AmbientGlow selectedStyles={selectedTemplates} variant="camera" />
            <div className="relative w-full aspect-square max-w-[240px] bg-white dark:bg-neutral-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden flex items-center justify-center">

              {/* 1. SAF SVG KATMANI: GRID VE L KÖŞELERİ TEK BİR MATEMATİKSEL DÜZENDE */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 3x3 Kılavuz Çizgileri */}
                <line x1="33.33" y1="0" x2="33.33" y2="100" stroke="currentColor" className="text-neutral-900/5 dark:text-neutral-100/5" strokeWidth="0.5" />
                <line x1="66.66" y1="0" x2="66.66" y2="100" stroke="currentColor" className="text-neutral-900/5 dark:text-neutral-100/5" strokeWidth="0.5" />
                <line x1="0" y1="33.33" x2="100" y2="33.33" stroke="currentColor" className="text-neutral-900/5 dark:text-neutral-100/5" strokeWidth="0.5" />
                <line x1="0" y1="66.66" x2="100" y2="66.66" stroke="currentColor" className="text-neutral-900/5 dark:text-neutral-100/5" strokeWidth="0.5" />
                {/* Jilet İnce L Köşeleri (Dış kenarlara tam dengeli) */}
                <path d="M12 20V12H20" stroke="currentColor" className="text-neutral-400" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M88 20V12H80" stroke="currentColor" className="text-neutral-400" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M12 80V88H20" stroke="currentColor" className="text-neutral-400" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M88 80V88H80" stroke="currentColor" className="text-neutral-400" strokeWidth="0.5" strokeLinecap="round" />
              </svg>
              {/* 2. KATMAN: METADATA VE REC YAZILARI */}
              <div className="absolute top-3 left-3.5 flex items-center gap-1.5 text-[8.5px] tracking-widest text-neutral-400 font-mono select-none">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>REC
              </div>
              <div className="absolute bottom-3 right-3.5 text-[7.5px] tracking-widest text-neutral-400 font-mono select-none">
                ISO 400 F/2.8 1/125S
              </div>
              {/* 3. KATMAN: KUSURSUZ MERKEZLENMİŞ PARLAYAN KIRMIZI NOKTA */}
              <div className="relative pointer-events-none flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_16px_rgba(239,68,68,0.85)] z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`space-y-5 ${isExiting ? 'step-content-exit' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <MinimalInput
            label={t.firstName}
            variant="camera-body"
            value={profile.firstName}
            onChange={(e) => updateProfile({ firstName: e.target.value })}
            aria-label={t.firstName}
            autoFocus
          />
          <MinimalInput
            label={t.lastName}
            variant="camera-body"
            value={profile.lastName}
            onChange={(e) => updateProfile({ lastName: e.target.value })}
            aria-label={t.lastName}
          />
        </div>

        <MinimalInput
          label={t.professionalTitle}
          variant="camera-body"
          value={profile.title}
          onChange={(e) => updateProfile({ title: e.target.value })}
          aria-label={t.professionalTitle}
        />

        <div className="pt-2 space-y-4">
          <p className="minimal-label">{t.socialPresence}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <MinimalInput
              label="Instagram"
              variant="camera-body"
              prefix="@"
              value={profile.socialLinks.instagram}
              onChange={(e) => updateSocialLink('instagram', e.target.value)}
              placeholder={t.socialUsernamePlaceholder}
              aria-label="Instagram"
            />
            <MinimalInput
              label="LinkedIn"
              variant="camera-body"
              plainRow
              value={profile.socialLinks.linkedin}
              onChange={(e) => updateSocialLink('linkedin', e.target.value)}
              placeholder={t.linkedinPlaceholder}
              aria-label="LinkedIn"
            />
            <MinimalInput
              label="Twitter / X"
              variant="camera-body"
              prefix="@"
              value={profile.socialLinks.twitter}
              onChange={(e) => updateSocialLink('twitter', e.target.value)}
              placeholder={t.socialUsernamePlaceholder}
              aria-label="Twitter"
            />
            <MinimalInput
              label="Website"
              variant="camera-body"
              plainRow
              value={profile.socialLinks.website}
              onChange={(e) => updateSocialLink('website', e.target.value)}
              placeholder={t.websitePlaceholder}
              aria-label="Website"
            />
          </div>
        </div>
      </div>

      <footer className={`mt-10 md:mt-14 flex justify-end ${isExiting ? 'step-content-exit' : ''}`}>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue || isExiting}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-neutral-900 px-8 sm:px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-neutral-100"
          aria-label="Continue to next step"
        >
          {t.nextStep}
          <span className="text-white transition-colors duration-300 group-hover:text-red-500 dark:text-neutral-900" aria-hidden="true">
            →
          </span>
        </button>
      </footer>
    </section>
  )
}
