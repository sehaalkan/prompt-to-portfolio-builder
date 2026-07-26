import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Language, type TranslationStrings } from '../i18n/translations'

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationStrings
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const getInitialLanguage = (): Language => {
  if (typeof localStorage === 'undefined') return 'EN'
  const stored = localStorage.getItem('language')
  return stored === 'TR' ? 'TR' : 'EN'
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('language', lang)
  }, [lang])

  const setLang = (next: Language) => {
    setLangState(next)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
