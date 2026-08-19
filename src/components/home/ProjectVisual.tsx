import type { ArtKey } from '../../types/content'
import { artRegistry } from '../../art/registry'

export interface ProjectVisualProps {
  readonly artKey: ArtKey
  readonly accent: string
  readonly scale?: 'card' | 'cover'
}

export function ProjectVisual({ artKey, accent, scale = 'card' }: ProjectVisualProps) {
  const Art = artRegistry[artKey]
  return <div className={`project-art project-art-${scale} project-${artKey}`} style={{ backgroundColor: accent }}><Art /></div>
}
