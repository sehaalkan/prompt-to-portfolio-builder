type FilmStripProgressProps = {
  currentStep?: number
  totalSteps?: number
}

export const FilmStripProgress = ({
  currentStep = 1,
  totalSteps = 3,
}: FilmStripProgressProps) => {
  return (
    <nav
      className="flex items-center justify-center"
      aria-label="Wizard progress"
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1
        const isReached = step <= currentStep

        return (
          <div
            key={step}
            className={`
              mx-1 h-4 w-3 rounded-[2px] border border-neutral-300 transition-colors duration-300 ease-out
              dark:border-neutral-700
              ${isReached ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-transparent'}
            `}
            aria-current={step === currentStep ? 'step' : undefined}
            aria-label={`Step ${step}${isReached ? ', completed or active' : ', upcoming'}`}
          />
        )
      })}
    </nav>
  )
}
