import { getGlowBackgroundColor } from '../../utils/getGlowColor'
import type { SelectableVibeTemplate } from '../../types'

type AmbientGlowProps = {
  selectedStyles: SelectableVibeTemplate[]
  variant?: 'camera' | 'header'
  className?: string
}

export const AmbientGlow = ({
  selectedStyles,
  variant = 'camera',
  className = '',
}: AmbientGlowProps) => {
  const positionClass =
    variant === 'camera'
      ? '-top-16 -right-20 translate-x-[10%] -translate-y-[8%]'
      : '-top-28 -left-24 md:-top-36 md:-left-16'

  const sizeClass =
    variant === 'camera'
      ? 'h-[22rem] w-[22rem] blur-[140px]'
      : 'h-[32rem] w-[32rem] blur-[160px]'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full opacity-[0.15] -z-10 ${sizeClass} ${positionClass} ${className}`}
      style={{
        backgroundColor: getGlowBackgroundColor(selectedStyles),
        transition: 'background-color 1.2s ease-in-out',
      }}
    />
  )
}
