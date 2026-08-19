import type { PersonalTile } from '../../types/content'
import { PhotoTile } from './PhotoTile'
export interface PhotoGridProps { readonly tiles: readonly PersonalTile[]; readonly columns?: 2 | 3 }
export function PhotoGrid({ tiles, columns = 2 }: PhotoGridProps) { return <div className={`photo-grid photo-grid-${columns}`}>{tiles.map((tile, index) => <PhotoTile tile={tile} index={index} priority={index === 0} key={tile.id} />)}</div> }
