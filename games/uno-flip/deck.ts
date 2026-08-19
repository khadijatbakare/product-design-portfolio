import { toDark } from './mapping'
import type { CardColor, CardFace, UnoCard, UnoGrid } from './types'

const pool: readonly { pairId: string; face: CardFace; isFlip?: boolean }[] = [
  { pairId: 'blue', face: { color: 'blue', icon: 'number', display: 'BLUE 2' } }, { pairId: 'red', face: { color: 'red', icon: 'number', display: 'RED 5' } }, { pairId: 'green', face: { color: 'green', icon: 'number', display: 'GREEN 8' } }, { pairId: 'yellow', face: { color: 'yellow', icon: 'number', display: 'YELLOW 3' } }, { pairId: 'wild', face: { color: 'wild', icon: 'wild', display: 'WILD' } }, { pairId: 'flip', face: { color: 'flip', icon: 'flip', display: 'FLIP' }, isFlip: true },
]

export const seededRandom = (seed: number) => { let value = seed >>> 0; return () => { value += 0x6D2B79F5; let result = value; result = Math.imul(result ^ result >>> 15, result | 1); result ^= result + Math.imul(result ^ result >>> 7, result | 61); return ((result ^ result >>> 14) >>> 0) / 4294967296 } }

export function generateGrid(seed: number): UnoGrid {
  const random = seededRandom(seed)
  const cards: UnoCard[] = pool.flatMap((item) => [0, 1].map((copy) => ({ id: `${item.pairId}-${copy}`, pairId: item.pairId, light: item.face, dark: toDark(item.face), isFlip: Boolean(item.isFlip) })))
  for (let index = cards.length - 1; index > 0; index -= 1) { const target = Math.floor(random() * (index + 1)); [cards[index], cards[target]] = [cards[target], cards[index]] }
  return { cards, columns: 4 }
}

export const cardColors: readonly CardColor[] = pool.map((item) => item.face.color)
