import type { ImageAnalysis } from '../types'
import type { Language } from '../i18n/translations'
import { cleanDescription } from './cleanDescription'

type AnalysisLike = Partial<ImageAnalysis> & {
  description?: string
  tones?: string[]
}

export const getLocalizedDescription = (
  analysis: AnalysisLike | null | undefined,
  lang: Language
): string | undefined => {
  if (!analysis) return undefined

  const raw =
    lang === 'TR'
      ? analysis.description_tr ?? analysis.description
      : analysis.description_en ?? analysis.description

  if (!raw?.trim()) return undefined

  return cleanDescription(raw)
}

export const getLocalizedTones = (
  analysis: AnalysisLike | null | undefined,
  lang: Language
): string[] => {
  if (!analysis) return []

  const tones =
    lang === 'TR'
      ? analysis.tones_tr ?? analysis.tones
      : analysis.tones_en ?? analysis.tones

  return tones?.filter((tone) => tone.trim() !== '') ?? []
}
