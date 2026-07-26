import { usePortfolio } from '../context/PortfolioContext'
import { useLanguage } from '../context/LanguageContext'
import { getThemeClasses } from '../utils/themeMapper'
import { getLocalizedDescription, getLocalizedTones } from '../utils/localizedAnalysis'

export const LivePreview = () => {
  const { profile, images, vibePrompt, selectedTemplate } = usePortfolio()
  const { lang } = useLanguage()
  const theme = getThemeClasses(vibePrompt, selectedTemplate)

  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Your Name'
  const title = profile.title || 'Creative Professional'

  const socialLinks = [
    { url: profile.socialLinks.instagram, label: 'Instagram' },
    { url: profile.socialLinks.linkedin, label: 'LinkedIn' },
    { url: profile.socialLinks.twitter, label: 'Twitter' },
    { url: profile.socialLinks.website, label: 'Website' },
  ].filter((link) => link.url.trim())

  return (
    <div
      className={`${theme.pageBg} rounded-xl overflow-hidden min-h-[600px] transition-all duration-500`}
      aria-label="Portfolio live preview"
    >
      <header className={`text-center ${theme.heroSpacing} transition-all duration-500`}>
        <p className={`${theme.subheading} mb-4`}>{title}</p>
        <h1 className={`${theme.heading} mb-6`}>{fullName}</h1>

        {socialLinks.length > 0 && (
          <nav className="flex items-center justify-center flex-wrap gap-1" aria-label="Social links">
            {socialLinks.map((link, index) => (
              <span key={link.label} className="flex items-center">
                {index > 0 && <span className="mx-2 opacity-30">·</span>}
                <span
                  className={`${theme.accent} text-sm cursor-default`}
                  tabIndex={0}
                  role="link"
                  aria-label={link.label}
                >
                  {link.label}
                </span>
              </span>
            ))}
          </nav>
        )}
      </header>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 opacity-40">
          <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className={`${theme.body} text-center`}>Upload images to see your portfolio preview</p>
        </div>
      ) : (
        <section className={`max-w-3xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 ${theme.galleryGap}`}>
          {images.map((image) => (
            <article
              key={image.id}
              className={`overflow-hidden rounded-xl ${theme.cardBg} ${theme.cardBorder} transition-all duration-500`}
            >
              <img
                src={`data:${image.mimeType};base64,${image.base64}`}
                alt={getLocalizedDescription(image.analysis, lang) ?? image.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                {image.analysis ? (
                  <>
                    <p className={`${theme.body} text-sm mb-3`}>
                      {getLocalizedDescription(image.analysis, lang)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {getLocalizedTones(image.analysis, lang).map((tag) => (
                        <span key={tag} className={theme.tag}>{tag}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className={`${theme.body} text-sm opacity-50 italic`}>
                    Run AI analysis to generate description & tones
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
