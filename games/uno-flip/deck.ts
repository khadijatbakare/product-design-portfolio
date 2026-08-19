import { toDark } from './mapping'
import type { CardFace, GridOptions, GameGrid, LightAction, LightColor, NumberFace, UnoFlipCard } from './types'

const colors: readonly LightColor[] = ['red', 'yellow', 'green', 'blue']
const faces: readonly (NumberFace | LightAction)[] = ['0','1','2','3','4','5','6','7','8','9','skip','reverse','draw-one']
const facePool = colors.flatMap((color) => faces.map((face) => ({ color, face })))
const iconFor = (face: CardFace) => face === 'reverse' ? '⇄' : face === 'skip' ? '⊘' : face === 'draw-one' ? '+1' : String(face)
const title = (color: string, face: string) => `${color[0].toUpperCase()}${color.slice(1)} ${face.replaceAll('-', ' ')}`

export class GridSizeError extends Error { constructor(message: string) { super(message); this.name = 'GridSizeError' } }
export const seededRandom = (seed: number) => { let value = seed >>> 0; return () => { value += 0x6D2B79F5; let result = value; result = Math.imul(result ^ result >>> 15, result | 1); result ^= result + Math.imul(result ^ result >>> 7, result | 61); return ((result ^ result >>> 14) >>> 0) / 4294967296 } }

export function generateGrid(options: GridOptions): GameGrid {
  const { columns, rows, side = 'light', seed = 7452 } = options
  const cellCount = columns * rows
  if (columns < 2 || rows < 2) throw new GridSizeError('Both grid dimensions must be at least 2.')
  if (cellCount % 2 !== 0) throw new GridSizeError('The grid must contain an even number of cells.')
  const pairCount = cellCount / 2
  if (pairCount > facePool.length) throw new GridSizeError(`The grid needs ${pairCount} pairs; only ${facePool.length} distinct faces exist.`)
  const random = seededRandom(seed)
  const shuffledFaces = [...facePool]
  for (let index = shuffledFaces.length - 1; index > 0; index -= 1) { const target = Math.floor(random() * (index + 1)); [shuffledFaces[index], shuffledFaces[target]] = [shuffledFaces[target], shuffledFaces[index]] }
  const cards = shuffledFaces.slice(0, pairCount).flatMap(({ color, face }, pairIndex) => [0, 1].map((copy): UnoFlipCard => ({ id: `card-${pairIndex}-${copy}`, pairId: `pair-${pairIndex}`, value: title(color, face), icon: iconFor(face), side: 'light', color, face, isMatchable: true })))
  for (let index = cards.length - 1; index > 0; index -= 1) { const target = Math.floor(random() * (index + 1)); [cards[index], cards[target]] = [cards[target], cards[index]] }
  const flipCard: UnoFlipCard = { id: 'flip-control', pairId: 'flip-control', value: 'FLIP Card', icon: '⇄', side: 'light', color: 'red', face: 'reverse', isMatchable: false }
  const activeCards = side === 'dark' ? cards.map(toDark) : cards
  return { columns, rows, side, seed, pairCount, cells: activeCards.map((card, index) => ({ index, card, status: 'face-down' })), flipCard: side === 'dark' ? toDark(flipCard) : flipCard }
}
