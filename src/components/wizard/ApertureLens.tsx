import { Aperture } from 'lucide-react'

export type LensPhase = 'opening' | 'open' | 'hero-fly' | 'hero' | 'frame'

type ApertureLensProps = {
  phase?: LensPhase
  className?: string
  size?: number
}

export const ApertureLens = ({
  phase = 'open',
  className = '',
  size = 90,
}: ApertureLensProps) => {
  const sizeByPhase =
    phase === 'hero' || phase === 'hero-fly'
      ? Math.max(size, 112)
      : phase === 'frame'
        ? Math.round(size * 0.7)
        : size

  const phaseClass =
    phase === 'hero-fly'
      ? 'aperture-lens-hero-fly'
      : phase === 'hero'
        ? 'aperture-lens-hero'
        : phase === 'frame'
          ? 'aperture-lens-frame'
          : ''

  return (
    <div
      className={`aperture-lens ${phaseClass} ${className}`}
      aria-hidden="true"
    >
      <div className="aperture-glow" />
      <Aperture
        size={sizeByPhase}
        strokeWidth={1.25}
        className="aperture-icon relative z-10 text-[#1A1A1A]"
      />
    </div>
  )
}
