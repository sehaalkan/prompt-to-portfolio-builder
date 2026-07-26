import type { SocialLinkItem } from '../../utils/socialLinks'

type SocialLinksLineProps = {
  links: SocialLinkItem[]
}

export const SocialLinksLine = ({ links }: SocialLinksLineProps) => {
  if (links.length === 0) return null

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
      {links.map((link, index) => (
        <span key={link.key} className="inline-flex items-center gap-x-4">
          {index > 0 && (
            <span className="text-neutral-300 dark:text-neutral-600" aria-hidden="true">
              /
            </span>
          )}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:text-neutral-900 hover:underline underline-offset-4 dark:hover:text-neutral-200"
            aria-label={link.ariaLabel}
          >
            {link.displayText}
          </a>
        </span>
      ))}
    </div>
  )
}
