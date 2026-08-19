import type { CardColor, CardFace } from './types'

export const lightToDark: Record<CardColor, CardFace> = {
  blue: { color: 'blue', icon: 'number', display: 'TEAL 7' }, red: { color: 'red', icon: 'number', display: 'PINK 1' }, green: { color: 'green', icon: 'number', display: 'LIME 4' }, yellow: { color: 'yellow', icon: 'number', display: 'ORANGE 9' }, wild: { color: 'wild', icon: 'wild', display: 'WILD +' }, flip: { color: 'flip', icon: 'flip', display: 'FLIP' },
}
export const darkToLight: Record<CardColor, CardFace> = {
  blue: { color: 'blue', icon: 'number', display: 'BLUE 2' }, red: { color: 'red', icon: 'number', display: 'RED 5' }, green: { color: 'green', icon: 'number', display: 'GREEN 8' }, yellow: { color: 'yellow', icon: 'number', display: 'YELLOW 3' }, wild: { color: 'wild', icon: 'wild', display: 'WILD' }, flip: { color: 'flip', icon: 'flip', display: 'FLIP' },
}
export const toDark = (face: CardFace): CardFace => lightToDark[face.color]
export const toLight = (face: CardFace): CardFace => darkToLight[face.color]
