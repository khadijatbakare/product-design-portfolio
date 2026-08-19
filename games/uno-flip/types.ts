export type Side = 'light' | 'dark'
export type LightColor = 'red' | 'yellow' | 'green' | 'blue'
export type DarkColor = 'pink' | 'orange' | 'teal' | 'purple'
export type CardColor = LightColor | DarkColor
export type NumberFace = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
export type LightAction = 'skip' | 'reverse' | 'draw-one'
export type DarkAction = 'skip-everyone' | 'reverse' | 'draw-five'
export type LightWild = 'wild' | 'wild-draw-two'
export type DarkWild = 'wild' | 'wild-draw-color'
export type LightFace = NumberFace | LightAction | LightWild
export type DarkFace = NumberFace | DarkAction | DarkWild
export type CardFace = LightFace | DarkFace

export interface UnoFlipCard { readonly id: string; readonly pairId: string; readonly value: string; readonly icon: string; readonly side: Side; readonly color: CardColor; readonly face: CardFace; readonly isMatchable: boolean }
export interface UnoGrid { readonly cards: readonly UnoFlipCard[]; readonly columns: number }
export type GamePhase = 'idle' | 'one-selected' | 'resolving' | 'complete'
export interface UnoFlipState { readonly seed: number; readonly grid: UnoGrid; readonly side: Side; readonly selectedIds: readonly string[]; readonly matchedPairIds: readonly string[]; readonly moves: number; readonly phase: GamePhase; readonly flipCount: number }
export type UnoFlipAction = { readonly type: 'select'; readonly cardId: string } | { readonly type: 'resolve' } | { readonly type: 'reset'; readonly seed: number } | { readonly type: 'restore'; readonly state: UnoFlipState }
