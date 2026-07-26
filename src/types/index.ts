export type SocialLinks = {
  instagram: string
  linkedin: string
  twitter: string
  website: string
}

export type PortfolioProfile = {
  firstName: string
  lastName: string
  title: string
  socialLinks: SocialLinks
}

export type VibeTemplate = 'minimalist' | 'cyberpunk' | 'cinematic' | 'dramatic' | 'editorial' | 'street' | 'custom'

export type SelectableVibeTemplate = Exclude<VibeTemplate, 'custom'>

export type ImageAnalysis = {
  description_en: string
  description_tr: string
  tones_en: string[]
  tones_tr: string[]
}

export type PortfolioImage = {
  id: string
  name: string
  size: number
  base64: string
  mimeType: string
  analysis: ImageAnalysis | null
}

export type ThemeClasses = {
  pageBg: string
  cardBg: string
  cardBorder: string
  heading: string
  subheading: string
  body: string
  tag: string
  accent: string
  galleryGap: string
  heroSpacing: string
}

export type GeminiAnalysisResponse = ImageAnalysis

export type VibePreset = {
  id: SelectableVibeTemplate
  label: string
  prompt: string
  subtitle: string
}
