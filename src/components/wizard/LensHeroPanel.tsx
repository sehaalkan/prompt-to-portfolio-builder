import { ApertureLens, type LensPhase } from './ApertureLens'

type LensHeroPanelProps = {
  phase: LensPhase
}

export const LensHeroPanel = ({ phase }: LensHeroPanelProps) => {
  return (
    <aside
      className="flex h-full min-h-[280px] w-full items-center justify-center"
      aria-hidden="true"
    >
      <ApertureLens phase={phase} size={120} />
    </aside>
  )
}
