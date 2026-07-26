import { useState, useCallback, useEffect } from 'react'
import type { LensPhase } from '../components/wizard/ApertureLens'

const STEP_TRANSITION_MS = 900

export const useWizardSteps = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isStep1Exiting, setIsStep1Exiting] = useState(false)
  const [showStep2, setShowStep2] = useState(false)
  const [showHeroBadge, setShowHeroBadge] = useState(false)
  const [lensPhase, setLensPhase] = useState<LensPhase>('open')

  useEffect(() => {
    if (lensPhase !== 'opening') return
    const timer = setTimeout(() => setLensPhase('open'), 400)
    return () => clearTimeout(timer)
  }, [lensPhase])

  const handleStep1Continue = useCallback(() => {
    setIsStep1Exiting(true)
    setLensPhase('hero-fly')

    setTimeout(() => {
      setShowHeroBadge(true)
      setCurrentStep(2)
      setShowStep2(true)
      setIsStep1Exiting(false)
      setLensPhase('hero')
    }, STEP_TRANSITION_MS)
  }, [])

  const handleBackToStep1 = useCallback(() => {
    setShowHeroBadge(false)
    setShowStep2(false)
    setCurrentStep(1)
    setLensPhase('open')
  }, [])

  const handleStep2Continue = useCallback(() => {
    setCurrentStep(3)
  }, [])

  const handleBackToStep2 = useCallback(() => {
    setCurrentStep(2)
    setShowStep2(true)
    setLensPhase('hero')
  }, [])

  return {
    currentStep,
    isStep1Exiting,
    showStep2,
    showHeroBadge,
    lensPhase,
    handleStep1Continue,
    handleBackToStep1,
    handleStep2Continue,
    handleBackToStep2,
  }
}
