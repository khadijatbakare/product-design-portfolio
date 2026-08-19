import { generateGrid } from './deck'
import type { UnoFlipAction, UnoFlipState } from './types'

export const initGame = (seed: number): UnoFlipState => ({ seed, grid: generateGrid(seed), side: 'light', selectedIds: [], matchedPairIds: [], moves: 0, phase: 'idle', flipCount: 0 })
export const isFlipAvailable = (state: UnoFlipState) => !state.matchedPairIds.includes('flip')

export function unoFlipReducer(state: UnoFlipState, action: UnoFlipAction): UnoFlipState {
  if (action.type === 'restore') return action.state
  if (action.type === 'reset') return initGame(action.seed)
  if (action.type === 'select') {
    if (state.phase === 'resolving' || state.phase === 'complete') return state
    const card = state.grid.cards.find((item) => item.id === action.cardId)
    if (!card || state.selectedIds.includes(card.id) || state.matchedPairIds.includes(card.pairId)) return state
    if (state.selectedIds.length === 0) return { ...state, selectedIds: [card.id], phase: 'one-selected' }
    return { ...state, selectedIds: [...state.selectedIds, card.id], moves: state.moves + 1, phase: 'resolving' }
  }
  if (state.phase !== 'resolving') return state
  const [first, second] = state.selectedIds.map((id) => state.grid.cards.find((card) => card.id === id))
  const matched = Boolean(first && second && first.pairId === second.pairId)
  const matchedPairIds = matched && first ? [...state.matchedPairIds, first.pairId] : state.matchedPairIds
  const flipped = matched && Boolean(first?.isFlip)
  return { ...state, selectedIds: [], matchedPairIds, side: flipped ? state.side === 'light' ? 'dark' : 'light' : state.side, flipCount: state.flipCount + (flipped ? 1 : 0), phase: matchedPairIds.length === new Set(state.grid.cards.map((card) => card.pairId)).size ? 'complete' : 'idle' }
}
