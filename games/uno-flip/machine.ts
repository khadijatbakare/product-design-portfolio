import { generateGrid } from './deck'
import { toDark, toLight } from './mapping'
import type { UnoFlipAction, UnoFlipState } from './types'

export const initGame = (seed: number): UnoFlipState => ({ seed, grid: generateGrid(seed), side: 'light', selectedIds: [], matchedPairIds: [], moves: 0, phase: 'idle', flipCount: 0 })
export const isFlipAvailable = (state: UnoFlipState) => state.grid.cards.some((card) => !card.isMatchable)

export function unoFlipReducer(state: UnoFlipState, action: UnoFlipAction): UnoFlipState {
  if (action.type === 'restore') return action.state
  if (action.type === 'reset') return initGame(action.seed)
  if (action.type === 'select') {
    if (state.phase === 'resolving' || state.phase === 'complete') return state
    const card = state.grid.cards.find((item) => item.id === action.cardId)
    if (!card || state.selectedIds.includes(card.id) || state.matchedPairIds.includes(card.pairId)) return state
    if (!card.isMatchable) {
      const side = state.side === 'light' ? 'dark' : 'light'
      return { ...state, side, grid: { ...state.grid, cards: state.grid.cards.map(side === 'dark' ? toDark : toLight) }, flipCount: state.flipCount + 1 }
    }
    if (state.selectedIds.length === 0) return { ...state, selectedIds: [card.id], phase: 'one-selected' }
    return { ...state, selectedIds: [...state.selectedIds, card.id], moves: state.moves + 1, phase: 'resolving' }
  }
  if (state.phase !== 'resolving') return state
  const [first, second] = state.selectedIds.map((id) => state.grid.cards.find((card) => card.id === id))
  const matched = Boolean(first && second && first.pairId === second.pairId)
  const matchedPairIds = matched && first ? [...state.matchedPairIds, first.pairId] : state.matchedPairIds
  const pairCount = new Set(state.grid.cards.filter((card) => card.isMatchable).map((card) => card.pairId)).size
  return { ...state, selectedIds: [], matchedPairIds, phase: matchedPairIds.length === pairCount ? 'complete' : 'idle' }
}
