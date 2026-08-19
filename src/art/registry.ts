import type { ComponentType } from 'react'
import { AtlasArt } from './AtlasArt'
import { NorthstarArt } from './NorthstarArt'
import type { ArtKey } from '../types/content'

export const artRegistry: Record<ArtKey, ComponentType> = { atlas: AtlasArt, northstar: NorthstarArt }
