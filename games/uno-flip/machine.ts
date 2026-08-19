import { generateGrid } from './deck'
import { toDark } from './mapping'
import type { GameEvent, GameState, GridOptions } from './types'

export const REVEAL_MS = { match: 520, mismatch: 900 } as const

export function initGame(options: GridOptions): GameState {
  return { status: 'idle', grid: generateGrid(options), selected: [], lastOutcome: null, moves: 0, matches: 0, sideFlipUsed: false, resumeTo: 'idle' }
}

export function isFlipAvailable(state: GameState): boolean {
  return state.grid.side === 'light' && !state.sideFlipUsed && (state.status === 'idle' || state.status === 'oneFlipped')
}

export function reducer(state: GameState, event: GameEvent): GameState {
  if (event.type === 'RESET') return initGame({ columns: state.grid.columns, rows: state.grid.rows, seed: event.seed ?? state.grid.seed + 1 })
  if (state.status === 'complete') return state

  if (event.type === 'TRIGGER_SIDE_FLIP') {
    if (!isFlipAvailable(state)) return state
    const resumeTo = state.status === 'oneFlipped' ? 'oneFlipped' : 'idle'
    return { ...state, status: 'sideFlipping', resumeTo, sideFlipUsed: true, grid: { ...state.grid, side: 'dark', cells: state.grid.cells.map((cell) => ({ ...cell, card: toDark(cell.card) })), flipCard: toDark(state.grid.flipCard) } }
  }

  if (event.type === 'SIDE_FLIP_COMPLETE') return state.status === 'sideFlipping' ? { ...state, status: state.resumeTo } : state

  if (event.type === 'FLIP_CARD') {
    if (state.status !== 'idle' && state.status !== 'oneFlipped') return state
    const cell = state.grid.cells[event.index]
    if (!cell || cell.status !== 'face-down' || !cell.card.isMatchable) return state
    const cells = state.grid.cells.map((item) => item.index === event.index ? { ...item, status: 'face-up' as const } : item)
    if (state.status === 'idle') return { ...state, status: 'oneFlipped', selected: [event.index], grid: { ...state.grid, cells } }
    const first = state.grid.cells[state.selected[0]]
    const outcome = first.card.pairId === cell.card.pairId ? 'match' : 'mismatch'
    return { ...state, status: 'twoFlipped', selected: [...state.selected, event.index], lastOutcome: outcome, moves: state.moves + 1, grid: { ...state.grid, cells } }
  }

  if (event.type === 'RESOLVE' && state.status === 'twoFlipped' && state.lastOutcome) {
    const selected = new Set(state.selected)
    const isMatch = state.lastOutcome === 'match'
    const cells = state.grid.cells.map((cell) => selected.has(cell.index) ? { ...cell, status: isMatch ? 'matched' as const : 'face-down' as const } : cell)
    const matches = state.matches + (isMatch ? 1 : 0)
    const status = matches === state.grid.pairCount ? 'complete' : 'idle'
    return { ...state, status, grid: { ...state.grid, cells }, selected: [], lastOutcome: null, matches, resumeTo: status }
  }

  return state
}
