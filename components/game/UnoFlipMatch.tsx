'use client'

import { useEffect, useReducer, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, X } from 'lucide-react'
import { faceMappings, initGame, isFlipAvailable, unoFlipReducer, type CardColor, type UnoFlipState } from '@/games/uno-flip'

export interface UnoFlipMatchProps { readonly onClose: () => void; readonly seed?: number }
const STORAGE_KEY = 'khadijat-uno-flip-match-v2'
const palette: Record<CardColor, string> = { blue: '#2f63d7', red: '#d7463f', green: '#3c8f62', yellow: '#e2b93f', teal: '#00a7a0', pink: '#f20f74', orange: '#ff711a', purple: '#9b31cf' }

export function UnoFlipMatch({ onClose, seed = 7452 }: UnoFlipMatchProps) {
  const [state, dispatch] = useReducer(unoFlipReducer, seed, initGame)
  const [ready, setReady] = useState(false)

  useEffect(() => { try { const saved = window.localStorage.getItem(STORAGE_KEY); if (saved) dispatch({ type: 'restore', state: JSON.parse(saved) as UnoFlipState }) } finally { setReady(true) } }, [])
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }, [ready, state])
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])

  const selected = new Set(state.selectedIds)
  const matched = new Set(state.matchedPairIds)
  const reset = () => { window.localStorage.removeItem(STORAGE_KEY); dispatch({ type: 'reset', seed }) }

  return <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-[#111217]/85 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="uno-title">
    <AnimatePresence>{state.flipCount > 0 && <motion.div key={state.flipCount} className="pointer-events-none fixed inset-0 z-[90] bg-white mix-blend-screen" initial={{ opacity: .9 }} animate={{ opacity: 0 }} transition={{ duration: .5 }}/>}</AnimatePresence>
    <motion.section className="open-book relative grid max-h-[92vh] min-h-[650px] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-md bg-[#FAF8F4] shadow-2xl md:grid-cols-[1.25fr_.75fr]" initial={{ scale: .9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: 20 }}>
      <nav className="absolute inset-x-0 top-0 z-20 flex justify-end border-b border-black/10 bg-[#FAF8F4]/95 px-5 py-3"><button onClick={onClose} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"><X size={14}/> Close Easter Egg</button></nav>
      <main className="flex flex-col justify-center p-6 pt-20 md:p-10 md:pt-24">
        <AnimatePresence mode="wait"><motion.div key={`${state.side}-${state.flipCount}`} className="grid grid-cols-3 gap-3 sm:grid-cols-4" initial={{ rotateY: -90, filter: 'brightness(2) saturate(1.8)' }} animate={{ rotateY: 0, filter: 'brightness(1) saturate(1)' }} exit={{ rotateY: 90, filter: 'brightness(2) saturate(1.8)' }} transition={{ duration: .5 }} style={{ perspective: 1000 }}>
          {state.grid.cards.map((card) => { const faceUp = !card.isMatchable || selected.has(card.id) || matched.has(card.pairId); const resolves = state.phase === 'resolving' && state.selectedIds[1] === card.id; return <motion.button key={card.id} type="button" onClick={() => dispatch({ type: 'select', cardId: card.id })} onAnimationComplete={() => { if (resolves) dispatch({ type: 'resolve' }) }} className="relative aspect-[.7] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" animate={{ rotateY: faceUp ? 180 : 0, opacity: matched.has(card.pairId) ? .4 : 1 }} transition={{ duration: .3 }} style={{ transformStyle: 'preserve-3d' }} aria-label={faceUp ? `${card.value}, face up` : 'Face-down card'}><span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white bg-[#202126] font-mono text-2xl text-white shadow-md [backface-visibility:hidden]">UNO</span><span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white p-2 text-center font-mono text-2xl font-bold text-white shadow-md [backface-visibility:hidden]" style={{ backgroundColor: palette[card.color], transform: 'rotateY(180deg)' }}>{card.icon}<small className="absolute bottom-2 inset-x-1 font-mono text-[7px] uppercase">{card.value}</small></span></motion.button> })}
        </motion.div></AnimatePresence>
      </main>
      <aside className="flex flex-col bg-black/[.035] p-8 pt-20 md:p-10 md:pt-24">
        <p className="font-mono text-[9px] uppercase tracking-[.2em]">Game index / seeded {state.seed}</p><h2 id="uno-title" className="mt-5 font-serif text-5xl leading-none">UNO Flip<br/><em>Match.</em></h2>
        <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-black/15 py-5"><div><dt className="font-mono text-[8px] uppercase">Moves</dt><dd className="font-serif text-3xl">{state.moves}</dd></div><div><dt className="font-mono text-[8px] uppercase">Pairs</dt><dd className="font-serif text-3xl">{state.matchedPairIds.length}/5</dd></div><div><dt className="font-mono text-[8px] uppercase">Side</dt><dd className="mt-2 font-mono text-xs uppercase">{state.side}</dd></div></dl>
        <section className="mt-7 rounded-xl border-2 border-[#7250ad] bg-[#7250ad] p-5 text-white"><p className="font-mono text-xs font-bold">FLIP</p><p className="mt-3 text-sm leading-6">{isFlipAvailable(state) ? 'This card does not match. Activate it to turn every card over.' : 'FLIP unavailable.'}</p></section>
        <section className="mt-7"><p className="font-mono text-[8px] uppercase tracking-widest">Light ↔ Dark</p><div className="mt-3 space-y-2">{(['blue','red','green','yellow','wild'] as const).map((key) => <div key={key} className="flex justify-between border-b border-dashed border-black/15 pb-1 font-mono text-[9px]"><span>{faceMappings[key].light.icon}</span><span>→</span><span>{faceMappings[key].dark.icon}</span></div>)}</div></section>
        {state.phase === 'complete' && <motion.div className="mt-7 border border-black/20 bg-white/70 p-5 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><p className="font-serif text-3xl">Shelf cleared.</p><p className="mt-2 text-sm">All pairs matched in {state.moves} moves.</p></motion.div>}
        <button onClick={reset} className="mt-auto flex w-fit items-center gap-2 pt-8 font-mono text-[9px] uppercase tracking-widest"><RotateCcw size={14}/> New seeded game</button>
      </aside>
    </motion.section>
  </motion.div>
}
