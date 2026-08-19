import { faceMappings } from './mapping'
import type { UnoFlipCard, UnoGrid } from './types'

const matchablePairs = ['blue', 'red', 'green', 'yellow', 'wild'] as const
export const seededRandom = (seed: number) => { let value = seed >>> 0; return () => { value += 0x6D2B79F5; let result = value; result = Math.imul(result ^ result >>> 15, result | 1); result ^= result + Math.imul(result ^ result >>> 7, result | 61); return ((result ^ result >>> 14) >>> 0) / 4294967296 } }

export function generateGrid(seed: number): UnoGrid {
  const random = seededRandom(seed)
  const cards: UnoFlipCard[] = matchablePairs.flatMap((pairId) => [0, 1].map((copy) => ({ id: `${pairId}-${copy}`, pairId, ...faceMappings[pairId].light })))
  cards.push({ id: 'flip-special', pairId: 'flip', ...faceMappings.flip.light })
  for (let index = cards.length - 1; index > 0; index -= 1) { const target = Math.floor(random() * (index + 1)); [cards[index], cards[target]] = [cards[target], cards[index]] }
  return { cards, columns: 4 }
}
