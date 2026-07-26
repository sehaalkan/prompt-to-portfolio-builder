import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { useWizardSteps } from './hooks/useWizardSteps'
import { WizardHeader } from './components/wizard/WizardHeader'
import { Step1Profile } from './components/wizard/Step1Profile'
import { Step2VibeUpload } from './components/wizard/Step2VibeUpload'
import { Step3BentoGallery } from './components/wizard/Step3BentoGallery'
import { ErrorToast } from './components/ui/ErrorToast'

const WizardContent = () => {
  const { error, clearError } = usePortfolio()
  const {
    currentStep,
    isStep1Exiting,
    showStep2,
    lensPhase,
    handleStep1Continue,
    handleBackToStep1,
    handleStep2Continue,
    handleBackToStep2,
  } = useWizardSteps()

  return (
    <div className="relative min-h-screen gallery-bg overflow-x-hidden transition-all duration-500 ease-in-out">
      <WizardHeader currentStep={currentStep} />
      <ErrorToast message={error ?? ''} onDismiss={clearError} />

      <main className="relative z-0 w-full pb-24 pt-10 md:pt-14">
        {currentStep === 1 && !showStep2 && (
          <Step1Profile
            isExiting={isStep1Exiting}
            onContinue={handleStep1Continue}
            lensPhase={lensPhase}
          />
        )}

        {currentStep === 2 && showStep2 && (
          <div className="flex justify-center px-4 md:px-6">
            <Step2VibeUpload
              onContinue={handleStep2Continue}
              onBack={handleBackToStep1}
            />
          </div>
        )}

        {currentStep === 3 && (
          <Step3BentoGallery onBack={handleBackToStep2} />
        )}
      </main>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioProvider>
          <WizardContent />
        </PortfolioProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
