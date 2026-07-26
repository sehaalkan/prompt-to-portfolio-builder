import { usePortfolio } from '../../context/PortfolioContext'
import { WizardHeader } from './WizardHeader'
import { Step2VibeUpload } from './Step2VibeUpload'
import { Step3BentoGallery } from './Step3BentoGallery'
import { ErrorToast } from '../ui/ErrorToast'
import { useWizardSteps } from '../../hooks/useWizardSteps'

/** @deprecated Layout moved to App.tsx — kept for backwards compatibility */
export const WizardContainer = () => {
  const { error, clearError } = usePortfolio()
  const {
    currentStep,
    showStep2,
    handleBackToStep1,
    handleStep2Continue,
    handleBackToStep2,
  } = useWizardSteps()

  return (
    <div className="relative min-h-screen gallery-bg overflow-x-hidden">
      <WizardHeader currentStep={currentStep} />
      <ErrorToast message={error ?? ''} onDismiss={clearError} />

      <main className="relative z-0 w-full min-h-screen pb-32 pt-12 md:pt-16 flex items-center justify-center">
        {currentStep === 2 && showStep2 && (
          <Step2VibeUpload
            onContinue={handleStep2Continue}
            onBack={handleBackToStep1}
          />
        )}
        {currentStep === 3 && (
          <Step3BentoGallery onBack={handleBackToStep2} />
        )}
      </main>
    </div>
  )
}
