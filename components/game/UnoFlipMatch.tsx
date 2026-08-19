'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, X } from 'lucide-react'

type GameSide = 'light' | 'dark'
type CardColor = 'blue' | 'red' | 'green' | 'yellow' | 'flip' | 'wild'

interface GameCard {
  readonly id: string
  readonly pairId: string
  readonly color: CardColor
  readonly lightLabel: string
  readonly darkLabel: string
  readonly isFlip?: boolean
}

export interface UnoFlipMatchProps { readonly onClose: () => void }

const pairs = [
  { pairId: 'blue', color: 'blue' as const, lightLabel: 'BLUE 2', darkLabel: 'TEAL 7' },
  { pairId: 'red', color: 'red' as const, lightLabel: 'RED 5', darkLabel: 'PINK 1' },
  { pairId: 'green', color: 'green' as const, lightLabel: 'GREEN 8', darkLabel: 'LIME 4' },
  { pairId: 'yellow', color: 'yellow' as const, lightLabel: 'YELLOW 3', darkLabel: 'ORANGE 9' },
  { pairId: 'wild', color: 'wild' as const, lightLabel: 'WILD', darkLabel: 'WILD +' },
  { pairId: 'flip', color: 'flip' as const, lightLabel: 'FLIP', darkLabel: 'FLIP', isFlip: true },
]

const palette: Record<GameSide, Record<CardColor, string>> = {
  light: { blue: '#2f63d7', red: '#d7463f', green: '#3c8f62', yellow: '#e2b93f', flip: '#7250ad', wild: '#25252a' },
  dark: { blue: '#00a7a0', red: '#f20f74', green: '#9bc400', yellow: '#ff711a', flip: '#b031dc', wild: '#060608' },
}

const makeDeck = (): GameCard[] => pairs.flatMap((pair) => [0, 1].map((copy) => ({ ...pair, id: `${pair.pairId}-${copy}` }))).sort(() => Math.random() - .5)

export function UnoFlipMatch({ onClose }: UnoFlipMatchProps) {
  const [deck, setDeck] = useState<GameCard[]>(makeDeck)
  const [selected, setSelected] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [side, setSide] = useState<GameSide>('light')
  const [locked, setLocked] = useState(false)
  const [flash, setFlash] = useState(0)
  const complete = matched.length === pairs.length
  const matchedIds = useMemo(() => new Set(matched), [matched])

  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])

  const reset = () => { setDeck(makeDeck()); setSelected([]); setMatched([]); setMoves(0); setSide('light'); setLocked(false) }

  const choose = (card: GameCard) => {
    if (locked || selected.includes(card.id) || matchedIds.has(card.pairId)) return
    const next = [...selected, card.id]
    setSelected(next)
    if (next.length < 2) return
    setMoves((value) => value + 1)
    setLocked(true)
    const first = deck.find((item) => item.id === next[0])!
    if (first.pairId === card.pairId) {
      window.setTimeout(() => {
        setMatched((value) => [...value, card.pairId])
        setSelected([])
        if (card.isFlip) { setFlash((value) => value + 1); setSide((value) => value === 'light' ? 'dark' : 'light') }
        setLocked(false)
      }, 360)
    } else {
      window.setTimeout(() => { setSelected([]); setLocked(false) }, 760)
    }
  }

  return <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-[#111217]/85 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="uno-title">
    <AnimatePresence>{flash > 0 && <motion.div key={flash} className="pointer-events-none fixed inset-0 z-[90] bg-white mix-blend-screen" initial={{ opacity: 0 }} animate={{ opacity: [.9, 0] }} exit={{ opacity: 0 }} transition={{ duration: .5 }}/>}</AnimatePresence>
    <motion.section className="open-book relative grid max-h-[92vh] min-h-[650px] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-md bg-[#FAF8F4] shadow-2xl md:grid-cols-[.72fr_1.28fr]" initial={{ scale: .9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: 20 }}>
      <nav className="absolute inset-x-0 top-0 z-20 flex justify-end border-b border-black/10 bg-[#FAF8F4]/95 px-5 py-3"><button onClick={onClose} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"><X size={14}/> Close Easter Egg</button></nav>
      <aside className="flex flex-col justify-between p-8 pt-20 md:p-12 md:pt-24">
        <div><p className="font-mono text-[9px] uppercase tracking-[.2em]">A shelf-side diversion</p><h2 id="uno-title" className="mt-7 font-serif text-5xl leading-none">UNO Flip<br/><em>Match.</em></h2><p className="mt-6 max-w-xs leading-7 text-black/60">Find every pair. Matching the FLIP cards turns the whole table over.</p></div>
        <dl className="mt-12 grid grid-cols-3 gap-3 border-y border-black/15 py-6"><div><dt className="font-mono text-[8px] uppercase tracking-widest">Moves</dt><dd className="mt-2 font-serif text-4xl">{moves}</dd></div><div><dt className="font-mono text-[8px] uppercase tracking-widest">Pairs</dt><dd className="mt-2 font-serif text-4xl">{matched.length}/{pairs.length}</dd></div><div><dt className="font-mono text-[8px] uppercase tracking-widest">Side</dt><dd className="mt-3 font-mono text-xs uppercase">{side}</dd></div></dl>
        <button onClick={reset} className="mt-8 flex w-fit items-center gap-2 font-mono text-[9px] uppercase tracking-widest"><RotateCcw size={14}/> Shuffle again</button>
      </aside>
      <main className="flex flex-col justify-center bg-black/[.035] p-6 pt-20 md:p-10 md:pt-24">
        <AnimatePresence mode="wait"><motion.div key={side} className="grid grid-cols-3 gap-3 sm:grid-cols-4" initial={{ rotateY: -90, filter: 'brightness(2) saturate(1.8)' }} animate={{ rotateY: 0, filter: 'brightness(1) saturate(1)' }} exit={{ rotateY: 90, filter: 'brightness(2) saturate(1.8)' }} transition={{ duration: .5 }} style={{ perspective: 1000 }}>
          {deck.map((card) => { const faceUp = selected.includes(card.id) || matchedIds.has(card.pairId); return <motion.button key={card.id} type="button" onClick={() => choose(card)} className="relative aspect-[.7] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" animate={{ rotateY: faceUp ? 180 : 0, opacity: matchedIds.has(card.pairId) ? .42 : 1 }} transition={{ duration: .3 }} style={{ transformStyle: 'preserve-3d' }} aria-label={faceUp ? `${side === 'light' ? card.lightLabel : card.darkLabel}, face up` : 'Face-down card'}>
            <span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white bg-[#202126] font-mono text-2xl text-white shadow-md [backface-visibility:hidden]">UNO</span>
            <span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white p-2 text-center font-mono text-sm font-bold text-white shadow-md [backface-visibility:hidden]" style={{ backgroundColor: palette[side][card.color], transform: 'rotateY(180deg)' }}>{side === 'light' ? card.lightLabel : card.darkLabel}</span>
          </motion.button> })}
        </motion.div></AnimatePresence>
        <AnimatePresence>{complete && <motion.div className="mt-7 border border-black/20 bg-white/70 p-5 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><p className="font-serif text-3xl">Shelf cleared.</p><p className="mt-2 text-sm text-black/60">All six pairs matched in {moves} moves.</p></motion.div>}</AnimatePresence>
      </main>
    </motion.section>
  </motion.div>
}
