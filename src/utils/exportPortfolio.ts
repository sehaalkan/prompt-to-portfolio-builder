import type { PortfolioProfile, PortfolioImage } from '../types'
import type { Language } from '../i18n/translations'
import { buildSocialLinksHtml } from './socialLinks'
import { getLocalizedDescription, getLocalizedTones } from './localizedAnalysis'

type ExportData = {
  profile: PortfolioProfile
  images: PortfolioImage[]
  lang?: Language
}

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const buildGallery = (images: PortfolioImage[], lang: Language): string => {
  return images
    .map((image) => {
      const description = getLocalizedDescription(image.analysis, lang) ?? ''
      const tones = getLocalizedTones(image.analysis, lang)
      const tonesLine = tones.map((tag) => escapeHtml(tag)).join('  /  ')

      return `
        <article class="mb-8 block w-full break-inside-avoid">
          <img src="data:${image.mimeType};base64,${image.base64}" alt="" class="block h-auto w-full max-w-full rounded-xl object-contain" loading="lazy" />
          ${description ? `
          <div class="w-full text-left">
            <p class="mt-3 text-sm font-light text-neutral-700 tracking-wide leading-relaxed">${escapeHtml(description)}</p>
            ${tonesLine ? `<div class="mt-2 mb-8"><span class="block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">${tonesLine}</span></div>` : '<div class="mb-8" aria-hidden="true"></div>'}
          </div>` : ''}
        </article>
      `
    })
    .join('')
}

export const generatePortfolioHtml = ({ profile, images, lang = 'EN' }: ExportData): string => {
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Portfolio'
  const title = profile.title || (lang === 'TR' ? 'Yaratıcı Profesyonel' : 'Creative Professional')
  const socialLinksHtml = buildSocialLinksHtml(profile.socialLinks, escapeHtml)

  const galleryHtml = images.length > 0
    ? `<section class="mx-auto w-full max-w-6xl columns-1 gap-x-8 px-4 pb-24 md:columns-2 md:px-6 [column-gap:2rem]">${buildGallery(images, lang)}</section>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${escapeHtml(title)} — Portfolio by ${escapeHtml(fullName)}" />
  <meta name="author" content="${escapeHtml(fullName)}" />
  <title>${escapeHtml(fullName)} — Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; }
    .font-display { font-family: 'Playfair Display', Georgia, serif; }
  </style>
</head>
<body class="bg-[#fcfbf9] min-h-screen text-neutral-900">
  <header class="flex flex-col items-center px-4 py-16 text-center md:px-8 md:py-20">
    ${title ? `<p class="text-[11px] uppercase tracking-[0.35em] text-neutral-400 font-mono">${escapeHtml(title)}</p>` : ''}
    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-1 leading-none">${escapeHtml(fullName)}</h1>
    ${socialLinksHtml}
  </header>
  ${galleryHtml}
  <footer class="text-center py-10 text-[11px] uppercase tracking-widest text-neutral-400">
    ${lang === 'TR' ? 'Portfolyo' : 'Portfolio'}
  </footer>
</body>
</html>`
}

export const downloadPortfolioHtml = (html: string, filename: string): void => {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
