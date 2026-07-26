import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type {
  PortfolioProfile,
  PortfolioImage,
  VibeTemplate,
  SelectableVibeTemplate,
  ImageAnalysis,
} from '../types'
import { analyzeAllImages, createFallbackAnalysis } from '../services/geminiService'
import { processImageFiles } from '../utils/imageOptimizer'
import { buildCombinedVibePrompt, VIBE_PRESETS } from '../utils/themeMapper'
import { useLanguage } from './LanguageContext'
import { translations } from '../i18n/translations'
import type { Language } from '../i18n/translations'

const getSelectedStyleLabels = (templates: SelectableVibeTemplate[], language: Language): string[] =>
  templates.map((id) => translations[language].vibes[id]?.label ?? VIBE_PRESETS.find((preset) => preset.id === id)?.label ?? id)

type PortfolioContextType = {
  profile: PortfolioProfile
  vibePrompt: string
  selectedTemplates: SelectableVibeTemplate[]
  selectedTemplate: VibeTemplate
  images: PortfolioImage[]
  isAnalyzing: boolean
  isProcessingImages: boolean
  analysisProgress: { completed: number; total: number }
  error: string | null
  exportStatus: 'idle' | 'exporting' | 'success' | 'error'
  updateProfile: (updates: Partial<PortfolioProfile>) => void
  updateSocialLink: (platform: keyof PortfolioProfile['socialLinks'], value: string) => void
  setVibePrompt: (prompt: string) => void
  toggleSelectedTemplate: (template: SelectableVibeTemplate) => void
  setSelectedTemplate: (template: VibeTemplate) => void
  addImages: (files: File[]) => Promise<void>
  removeImage: (id: string) => void
  analyzeImages: () => Promise<void>
  clearError: () => void
  setExportStatus: (status: 'idle' | 'exporting' | 'success' | 'error') => void
}

const defaultProfile: PortfolioProfile = {
  firstName: '',
  lastName: '',
  title: '',
  socialLinks: {
    instagram: '',
    linkedin: '',
    twitter: '',
    website: '',
  },
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

const generateId = (): string => crypto.randomUUID()

const buildFileKey = (name: string, size: number): string => `${name}:${size}`

const reportError = (message: string) => {
  console.error('[App]', message)
}

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const { lang, t } = useLanguage()
  const [profile, setProfile] = useState<PortfolioProfile>(defaultProfile)
  const [vibePrompt, setVibePromptState] = useState('dramatic and minimalist with wide whitespace')
  const [selectedTemplates, setSelectedTemplates] = useState<SelectableVibeTemplate[]>(['minimalist'])
  const selectedTemplate: VibeTemplate = selectedTemplates[0] ?? 'minimalist'
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isProcessingImages, setIsProcessingImages] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState({ completed: 0, total: 0 })
  const [error, setError] = useState<string | null>(null)
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle')

  const showError = useCallback((message: string) => {
    reportError(message)
    setError(message)
  }, [])

  const updateProfile = useCallback((updates: Partial<PortfolioProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateSocialLink = useCallback((platform: keyof PortfolioProfile['socialLinks'], value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }, [])

  const setVibePrompt = useCallback((prompt: string) => {
    setVibePromptState(prompt)
  }, [])

  const toggleSelectedTemplate = useCallback((template: SelectableVibeTemplate) => {
    setSelectedTemplates((prev) => {
      const next = prev.includes(template)
        ? prev.filter((id) => id !== template)
        : [...prev, template]
      setVibePromptState(buildCombinedVibePrompt(next))
      return next
    })
  }, [])

  const setSelectedTemplate = useCallback((template: VibeTemplate) => {
    if (template === 'custom') return
    setSelectedTemplates([template])
    setVibePromptState(buildCombinedVibePrompt([template]))
  }, [])

  const addImages = useCallback(async (files: File[]) => {
    setIsProcessingImages(true)
    setError(null)

    const imageFiles = files.filter((file) => file.type.startsWith('image/'))
    if (imageFiles.length === 0) {
      setIsProcessingImages(false)
      return
    }

    const existingKeys = new Set(images.map((img) => buildFileKey(img.name, img.size)))
    const incomingKeys = new Set<string>()
    const uniqueFiles: File[] = []

    for (const file of imageFiles) {
      const key = buildFileKey(file.name, file.size)
      if (existingKeys.has(key) || incomingKeys.has(key)) {
        continue
      }
      incomingKeys.add(key)
      uniqueFiles.push(file)
    }

    if (uniqueFiles.length === 0) {
      setIsProcessingImages(false)
      return
    }

    try {
      console.log(`[App] ${uniqueFiles.length} dosya seçildi, sıkıştırma başlıyor...`)
      const processed = await processImageFiles(uniqueFiles)

      const newImages: PortfolioImage[] = processed.map((img, index) => ({
        id: generateId(),
        name: img.name,
        size: uniqueFiles[index]?.size ?? 0,
        base64: img.base64,
        mimeType: img.mimeType,
        analysis: null,
      }))

      setImages((prev) => [...prev, ...newImages])
      console.log(`[App] ${newImages.length} görsel portfolyoya eklendi.`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Görsel işlenemedi.'
      showError(message)
    } finally {
      setIsProcessingImages(false)
    }
  }, [images, showError])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }, [])

  const analyzeImages = useCallback(async () => {
    if (images.length === 0) {
      showError(t.errorNoImages)
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysisProgress({ completed: 0, total: images.length })

    console.log('[App] AI analizi başlatılıyor...')

    const selectedStyleTones = {
      en: getSelectedStyleLabels(selectedTemplates, 'EN'),
      tr: getSelectedStyleLabels(selectedTemplates, 'TR'),
    }

    try {
      const results = await analyzeAllImages(
        images.map((img) => ({
          id: img.id,
          base64: img.base64,
          mimeType: img.mimeType,
          name: img.name,
        })),
        selectedStyleTones,
        lang,
        (completed, total) => setAnalysisProgress({ completed, total })
      )

      setImages((prev) =>
        prev.map((img, index) => {
          const analysis = results.get(img.id) ?? createFallbackAnalysis(selectedStyleTones, index, lang)
          return { ...img, analysis: analysis as ImageAnalysis }
        })
      )

      console.log('[App] AI analizi tamamlandı.')
    } catch (err) {
      console.warn('[App] AI analizi beklenmeyen hata — fallback ile devam ediliyor:', err)

      setImages((prev) =>
        prev.map((img, index) => ({
          ...img,
          analysis:
            img.analysis ??
            (createFallbackAnalysis(selectedStyleTones, index, lang) as ImageAnalysis),
        }))
      )
    } finally {
      setIsAnalyzing(false)
    }
  }, [images, selectedTemplates, lang, t.errorNoImages, showError])

  const clearError = useCallback(() => setError(null), [])

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        vibePrompt,
        selectedTemplates,
        selectedTemplate,
        images,
        isAnalyzing,
        isProcessingImages,
        analysisProgress,
        error,
        exportStatus,
        updateProfile,
        updateSocialLink,
        setVibePrompt,
        toggleSelectedTemplate,
        setSelectedTemplate,
        addImages,
        removeImage,
        analyzeImages,
        clearError,
        setExportStatus,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }
  return context
}
