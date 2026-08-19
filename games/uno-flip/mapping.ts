import type { UnoFlipCard } from './types'

type FaceSpec = Pick<UnoFlipCard, 'value' | 'icon' | 'side' | 'color' | 'face' | 'isMatchable'>
export interface FaceMapping { readonly light: FaceSpec; readonly dark: FaceSpec }

export const faceMappings: Record<string, FaceMapping> = {
  blue: { light: { value: 'Blue 2', icon: '2', side: 'light', color: 'blue', face: '2', isMatchable: true }, dark: { value: 'Dark Side Teal 7', icon: '7', side: 'dark', color: 'teal', face: '7', isMatchable: true } },
  red: { light: { value: 'Red 5', icon: '5', side: 'light', color: 'red', face: '5', isMatchable: true }, dark: { value: 'Dark Side Pink 1', icon: '1', side: 'dark', color: 'pink', face: '1', isMatchable: true } },
  green: { light: { value: 'Green 8', icon: '8', side: 'light', color: 'green', face: '8', isMatchable: true }, dark: { value: 'Dark Side Purple 4', icon: '4', side: 'dark', color: 'purple', face: '4', isMatchable: true } },
  yellow: { light: { value: 'Yellow Draw One', icon: '+1', side: 'light', color: 'yellow', face: 'draw-one', isMatchable: true }, dark: { value: 'Dark Side Orange Draw Five', icon: '+5', side: 'dark', color: 'orange', face: 'draw-five', isMatchable: true } },
  wild: { light: { value: 'Wild Draw Two', icon: '+2', side: 'light', color: 'blue', face: 'wild-draw-two', isMatchable: true }, dark: { value: 'Dark Side Wild Draw Color', icon: 'W', side: 'dark', color: 'purple', face: 'wild-draw-color', isMatchable: true } },
  flip: { light: { value: 'FLIP Card', icon: '⇄', side: 'light', color: 'red', face: 'wild', isMatchable: false }, dark: { value: 'Dark Side FLIP Card', icon: '⇄', side: 'dark', color: 'pink', face: 'wild', isMatchable: false } },
}

const transform = (card: UnoFlipCard, target: 'light' | 'dark'): UnoFlipCard => ({ id: card.id, pairId: card.pairId, ...faceMappings[card.pairId][target] })
export const toDark = (card: UnoFlipCard): UnoFlipCard => transform(card, 'dark')
export const toLight = (card: UnoFlipCard): UnoFlipCard => transform(card, 'light')
