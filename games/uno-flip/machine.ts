import { generateGrid } from './deck'
import { toDark, toLight } from './mapping'
import type { UnoFlipAction, UnoFlipState } from './types'

export const initGame = (seed: number): UnoFlipState => ({ seed, grid: generateGrid({ columns: 4, rows: 4, seed }), selectedIds: [], matchedPairIds: [], moves: 0, phase: 'idle', flipCount: 0 })
export const isFlipAvailable = (state: UnoFlipState) => Boolean(state.grid.flipCard)

export function unoFlipReducer(state: UnoFlipState, action: UnoFlipAction): UnoFlipState {
  if (action.type === 'restore') return action.state
  if (action.type === 'reset') return initGame(action.seed)
  if (action.type === 'select') {
    if (state.phase === 'resolving' || state.phase === 'complete') return state
    if (action.cardId === state.grid.flipCard.id) {
      const side = state.grid.side === 'light' ? 'dark' : 'light'
      const transform = side === 'dark' ? toDark : toLight
      return { ...state, grid: { ...state.grid, side, cells: state.grid.cells.map((cell) => ({ ...cell, card: transform(cell.card) })), flipCard: transform(state.grid.flipCard) }, flipCount: state.flipCount + 1 }
    }
    const cell = state.grid.cells.find((item) => item.card.id === action.cardId)
    const card = cell?.card
    if (!card || cell?.status === 'matched' || state.selectedIds.includes(card.id)) return state
    const cells = state.grid.cells.map((item) => item.card.id === card.id ? { ...item, status: 'face-up' as const } : item)
    if (state.selectedIds.length === 0) return { ...state, grid: { ...state.grid, cells }, selectedIds: [card.id], phase: 'one-selected' }
    return { ...state, grid: { ...state.grid, cells }, selectedIds: [...state.selectedIds, card.id], moves: state.moves + 1, phase: 'resolving' }
  }
  if (state.phase !== 'resolving') return state
  const [first, second] = state.selectedIds.map((id) => state.grid.cells.find((cell) => cell.card.id === id)?.card)
  const matched = Boolean(first && second && first.pairId === second.pairId)
  const matchedPairIds = matched && first ? [...state.matchedPairIds, first.pairId] : state.matchedPairIds
  const selectedSet = new Set(state.selectedIds)
  const cells = state.grid.cells.map((cell) => selectedSet.has(cell.card.id) ? { ...cell, status: matched ? 'matched' as const : 'face-down' as const } : cell)
  return { ...state, grid: { ...state.grid, cells }, selectedIds: [], matchedPairIds, phase: matchedPairIds.length === state.grid.pairCount ? 'complete' : 'idle' }
}
