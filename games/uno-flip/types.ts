export type GameSide = 'light' | 'dark'
export type CardColor = 'blue' | 'red' | 'green' | 'yellow' | 'wild' | 'flip'
export type CardIcon = 'number' | 'wild' | 'flip'

export interface CardFace { readonly color: CardColor; readonly icon: CardIcon; readonly display: string }
export interface UnoCard { readonly id: string; readonly pairId: string; readonly light: CardFace; readonly dark: CardFace; readonly isFlip: boolean }
export interface UnoGrid { readonly cards: readonly UnoCard[]; readonly columns: number }
export type GamePhase = 'idle' | 'one-selected' | 'resolving' | 'complete'
export interface UnoFlipState { readonly seed: number; readonly grid: UnoGrid; readonly side: GameSide; readonly selectedIds: readonly string[]; readonly matchedPairIds: readonly string[]; readonly moves: number; readonly phase: GamePhase; readonly flipCount: number }
export type UnoFlipAction = { readonly type: 'select'; readonly cardId: string } | { readonly type: 'resolve' } | { readonly type: 'reset'; readonly seed: number } | { readonly type: 'restore'; readonly state: UnoFlipState }
