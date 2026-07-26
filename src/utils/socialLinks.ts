import type { SocialLinks } from '../types'

export type SocialLinkItem = {
  key: 'instagram' | 'linkedin' | 'twitter' | 'website'
  href: string
  displayText: string
  ariaLabel: string
}

const stripAtOrSlash = (value: string): string =>
  value.trim().replace(/^[@/]+/, '').trim()

const formatHandle = (username: string): string => `@${stripAtOrSlash(username)}`

export const getInstagramLink = (
  raw: string
): { username: string; href: string } | null => {
  const trimmed = raw.trim()
  if (!trimmed) return null

  let username = trimmed

  if (/instagram\.com/i.test(trimmed)) {
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
      username = url.pathname.replace(/^\//, '').split('/')[0]?.split('?')[0] ?? ''
    } catch {
      username = stripAtOrSlash(trimmed)
    }
  }

  username = stripAtOrSlash(username)
  if (!username) return null

  return {
    username,
    href: `https://instagram.com/${username}`,
  }
}

export const getLinkedInLink = (
  raw: string
): { username: string; href: string } | null => {
  const trimmed = raw.trim()
  if (!trimmed) return null

  if (/linkedin\.com/i.test(trimmed)) {
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
      const segments = url.pathname.split('/').filter(Boolean)
      const inIndex = segments.findIndex((segment) => segment.toLowerCase() === 'in')
      const username =
        (inIndex >= 0 ? segments[inIndex + 1] : segments[segments.length - 1])?.split('?')[0] ?? ''

      if (!username) return null

      return {
        username: stripAtOrSlash(username),
        href: url.href.replace(/\/$/, ''),
      }
    } catch {
      return null
    }
  }

  const username = stripAtOrSlash(trimmed).replace(/^in\//i, '')
  if (!username) return null

  return {
    username,
    href: `https://linkedin.com/in/${username}`,
  }
}

export const getTwitterLink = (
  raw: string
): { username: string; href: string } | null => {
  const trimmed = raw.trim()
  if (!trimmed) return null

  if (/twitter\.com|x\.com/i.test(trimmed)) {
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
      const username = url.pathname.replace(/^\//, '').split('/')[0]?.split('?')[0] ?? ''
      if (!username) return null

      return {
        username: stripAtOrSlash(username),
        href: url.href.replace(/\/$/, ''),
      }
    } catch {
      return null
    }
  }

  const username = stripAtOrSlash(trimmed)
  if (!username) return null

  return {
    username,
    href: `https://x.com/${username}`,
  }
}

export const getWebsiteLink = (
  raw: string
): { href: string; displayHost: string } | null => {
  const trimmed = raw.trim()
  if (!trimmed) return null

  const href = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed.replace(/^\/+/, '')}`

  try {
    const url = new URL(href)
    return {
      href: url.href.replace(/\/$/, ''),
      displayHost: url.hostname.replace(/^www\./, ''),
    }
  } catch {
    return null
  }
}

export const getActiveSocialLinks = (socialLinks: SocialLinks): SocialLinkItem[] => {
  const items: SocialLinkItem[] = []

  const instagram = getInstagramLink(socialLinks.instagram)
  if (instagram) {
    items.push({
      key: 'instagram',
      href: instagram.href,
      displayText: `IG: ${formatHandle(instagram.username)}`,
      ariaLabel: `Instagram ${formatHandle(instagram.username)}`,
    })
  }

  const linkedin = getLinkedInLink(socialLinks.linkedin)
  if (linkedin) {
    items.push({
      key: 'linkedin',
      href: linkedin.href,
      displayText: `LN: ${formatHandle(linkedin.username)}`,
      ariaLabel: `LinkedIn ${formatHandle(linkedin.username)}`,
    })
  }

  const twitter = getTwitterLink(socialLinks.twitter)
  if (twitter) {
    items.push({
      key: 'twitter',
      href: twitter.href,
      displayText: `X: ${formatHandle(twitter.username)}`,
      ariaLabel: `X ${formatHandle(twitter.username)}`,
    })
  }

  const website = getWebsiteLink(socialLinks.website)
  if (website) {
    items.push({
      key: 'website',
      href: website.href,
      displayText: 'WEB',
      ariaLabel: `Website ${website.displayHost}`,
    })
  }

  return items
}

const linkClass =
  'transition-all duration-200 hover:text-neutral-900 hover:underline underline-offset-4 dark:hover:text-neutral-200'

export const buildSocialLinksHtml = (
  socialLinks: SocialLinks,
  escapeHtml: (text: string) => string
): string => {
  const links = getActiveSocialLinks(socialLinks)
  if (links.length === 0) return ''

  const parts = links.map((link, index) => {
    const separator =
      index > 0
        ? '<span class="text-neutral-300" aria-hidden="true">/</span>'
        : ''
    return `${separator}<a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${escapeHtml(link.displayText)}</a>`
  })

  return `<div class="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">${parts.join('')}</div>`
}
