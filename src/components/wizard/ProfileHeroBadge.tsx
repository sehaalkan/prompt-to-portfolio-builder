import { usePortfolio } from '../../context/PortfolioContext'

type HeaderIdentityProps = {
  visible: boolean
}

export const HeaderIdentity = ({ visible }: HeaderIdentityProps) => {
  const { profile } = usePortfolio()

  const fullName = `${profile.firstName} ${profile.lastName}`.trim()
  if (!visible || (!fullName && !profile.title)) return null

  return (
    <div
      className={`mt-1.5 min-w-0 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
      }`}
      aria-label={fullName ? `Signed in as ${fullName}` : undefined}
    >
      {fullName && (
        <p className="truncate font-display text-[11px] leading-tight text-neutral-600 dark:text-neutral-400 transition-colors duration-500 ease-in-out">
          {fullName}
        </p>
      )}
      {profile.title && (
        <p className="truncate text-[9px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 transition-colors duration-500 ease-in-out">
          {profile.title}
        </p>
      )}
    </div>
  )
}

/** @deprecated Use HeaderIdentity inside WizardHeader */
export const ProfileHeroBadge = HeaderIdentity
