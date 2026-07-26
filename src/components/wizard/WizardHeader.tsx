import { usePortfolio } from '../../context/PortfolioContext'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { FilmStripProgress } from './FilmStripProgress'

type WizardHeaderProps = {
  currentStep: number
}

export const WizardHeader = ({ currentStep }: WizardHeaderProps) => {
  const { profile } = usePortfolio()
  const brandMark = profile.title.trim().toUpperCase()

  return (
    <header
      className="wizard-header"
      aria-label="Wizard navigation"
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 transition-colors duration-500 ease-in-out">
          Prompt-to-Portfolio
        </p>

        <div className="absolute left-1/2 -translate-x-1/2">
          <FilmStripProgress currentStep={currentStep} />
        </div>

        <div className="flex items-center justify-end gap-4">
          {brandMark && (
            <p className="text-xs font-light uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 transition-colors duration-500 ease-in-out">
              {brandMark}
            </p>
          )}
          <LanguageToggle />
          <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
