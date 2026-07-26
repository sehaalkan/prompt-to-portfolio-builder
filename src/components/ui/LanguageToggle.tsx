import { useLanguage } from '../../context/LanguageContext'
import type { Language } from '../../i18n/translations'

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage()

  const handleSelect = (next: Language) => {
    setLang(next)
  }

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-neutral-400">
      <button
        type="button"
        onClick={() => handleSelect('EN')}
        className={`transition-colors duration-300 ${lang === 'EN' ? 'font-bold text-neutral-900 dark:text-neutral-100' : 'hover:text-neutral-600 dark:hover:text-neutral-300'}`}
        aria-label="Switch to English"
        aria-pressed={lang === 'EN'}
      >
        EN
      </button>
      <span className="text-neutral-300 dark:text-neutral-600">/</span>
      <button
        type="button"
        onClick={() => handleSelect('TR')}
        className={`transition-colors duration-300 ${lang === 'TR' ? 'font-bold text-neutral-900 dark:text-neutral-100' : 'hover:text-neutral-600 dark:hover:text-neutral-300'}`}
        aria-label="Türkçe'ye geç"
        aria-pressed={lang === 'TR'}
      >
        TR
      </button>
    </div>
  )
}
