type StepIndicatorProps = {
  totalSteps?: number
  currentStep?: number
}

export const StepIndicator = ({ currentStep = 1, totalSteps = 3 }: StepIndicatorProps) => {
  return (
    <nav
      className="flex items-center gap-3"
      aria-label="Wizard progress"
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isActive = step === currentStep
        const isDone = step < currentStep

        return (
          <div
            key={step}
            className={`step-dot ${isActive ? 'step-dot-active' : ''} ${isDone ? 'step-dot-done' : ''}`}
            aria-current={isActive ? 'step' : undefined}
          />
        )
      })}
    </nav>
  )
}
