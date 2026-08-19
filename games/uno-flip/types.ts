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
export type CellStatus = 'face-down' | 'face-up' | 'matched'
export interface GridCell { readonly index: number; readonly card: UnoFlipCard; readonly status: CellStatus }
export interface GameGrid { readonly columns: number; readonly rows: number; readonly side: Side; readonly seed: number; readonly cells: readonly GridCell[]; readonly flipCard: UnoFlipCard; readonly pairCount: number }
export interface GridOptions { readonly columns: number; readonly rows: number; readonly side?: Side; readonly seed?: number }
export type TurnState = 'idle' | 'oneFlipped' | 'twoFlipped' | 'sideFlipping' | 'complete'
export type GameEvent = { type: 'FLIP_CARD'; index: number } | { type: 'RESOLVE' } | { type: 'TRIGGER_SIDE_FLIP' } | { type: 'SIDE_FLIP_COMPLETE' } | { type: 'RESET'; seed?: number }
export interface GameState { readonly status: TurnState; readonly grid: GameGrid; readonly selected: readonly number[]; readonly lastOutcome: 'match' | 'mismatch' | null; readonly moves: number; readonly matches: number; readonly sideFlipUsed: boolean; readonly resumeTo: Exclude<TurnState, 'sideFlipping'> }
