import type { PersonalTile } from '../../types/content'
import { Media } from '../primitives'
export interface PhotoTileProps { readonly tile: PersonalTile; readonly index: number; readonly priority?: boolean }
export function PhotoTile({ tile, index, priority = false }: PhotoTileProps) { return <article className={`personal-card ${tile.id} photo-${tile.span}`}><Media className="personal-image" asset={tile.media} priority={priority} placeholderLabel={`ADD ${tile.label} PHOTO`} /><div className="personal-caption"><span>{String(index + 2).padStart(2, '0')} / {tile.label}</span><h3>{tile.headline}</h3><p>{tile.caption}</p></div></article> }
