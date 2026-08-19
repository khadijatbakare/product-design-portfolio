'use client'

import { useEffect, useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, X } from 'lucide-react'
import { colorMapping, faceMapping, initGame, isFlipAvailable, reducer, REVEAL_MS, type CardColor, type GameState, type GridOptions } from '@/games/uno-flip'

export interface UnoFlipMatchProps { readonly onClose: () => void; readonly seed?: number }
const STORAGE_KEY = 'khadijat-uno-flip-match-v4'
const palette: Record<CardColor, string> = { blue: '#2f63d7', red: '#d7463f', green: '#3c8f62', yellow: '#e2b93f', teal: '#00a7a0', pink: '#f20f74', orange: '#ff711a', purple: '#9b31cf' }

export function UnoFlipMatch({ onClose, seed = 7452 }: UnoFlipMatchProps) {
  const options: GridOptions = { columns: 4, rows: 4, seed }
  const [state, dispatch] = useReducer(reducer, options, (initial) => { if (typeof window === 'undefined') return initGame(initial); const saved = window.localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) as GameState : initGame(initial) })

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }, [state])
  useEffect(() => { if (state.status !== 'twoFlipped' || !state.lastOutcome) return; const timeout = window.setTimeout(() => dispatch({ type: 'RESOLVE' }), REVEAL_MS[state.lastOutcome]); return () => window.clearTimeout(timeout) }, [state.status, state.lastOutcome])
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])

  const reset = () => { window.localStorage.removeItem(STORAGE_KEY); dispatch({ type: 'RESET' }) }

  return <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-[#111217]/85 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="uno-title">
    <AnimatePresence>{state.status === 'sideFlipping' && <motion.div className="pointer-events-none fixed inset-0 z-[90] bg-white mix-blend-screen" initial={{ opacity: .9 }} animate={{ opacity: 0 }} transition={{ duration: .5 }}/>}</AnimatePresence>
    <motion.section className="open-book relative grid max-h-[92vh] min-h-[650px] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-md bg-[#FAF8F4] shadow-2xl md:grid-cols-[1.25fr_.75fr]" initial={{ scale: .9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: 20 }}>
      <nav className="absolute inset-x-0 top-0 z-20 flex justify-end border-b border-black/10 bg-[#FAF8F4]/95 px-5 py-3"><button onClick={onClose} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"><X size={14}/> Close Easter Egg</button></nav>
      <main className="flex flex-col justify-center p-6 pt-20 md:p-10 md:pt-24">
        <AnimatePresence mode="wait"><motion.div key={state.grid.side} onAnimationComplete={() => { if (state.status === 'sideFlipping') dispatch({ type: 'SIDE_FLIP_COMPLETE' }) }} className="grid grid-cols-4 gap-3" initial={{ rotateY: -90, filter: 'brightness(2) saturate(1.8)' }} animate={{ rotateY: 0, filter: 'brightness(1) saturate(1)' }} exit={{ rotateY: 90, filter: 'brightness(2) saturate(1.8)' }} transition={{ duration: .5 }} style={{ perspective: 1000 }}>
          {state.grid.cells.map((cell) => { const card = cell.card; const faceUp = cell.status !== 'face-down'; return <motion.button key={card.id} type="button" onClick={() => dispatch({ type: 'FLIP_CARD', index: cell.index })} className="relative aspect-[.7] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" animate={{ rotateY: faceUp ? 180 : 0, opacity: cell.status === 'matched' ? .4 : 1 }} transition={{ duration: .3 }} style={{ transformStyle: 'preserve-3d' }} aria-label={faceUp ? `${card.value}, face up` : `Face-down card ${cell.index + 1}`}><span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white bg-[#202126] font-mono text-2xl text-white shadow-md [backface-visibility:hidden]">UNO</span><span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white p-2 text-center font-mono text-2xl font-bold text-white shadow-md [backface-visibility:hidden]" style={{ backgroundColor: palette[card.color], transform: 'rotateY(180deg)' }}>{card.icon}<small className="absolute bottom-2 inset-x-1 font-mono text-[7px] uppercase">{card.value}</small></span></motion.button> })}
        </motion.div></AnimatePresence>
      </main>
      <aside className="flex flex-col bg-black/[.035] p-8 pt-20 md:p-10 md:pt-24">
        <p className="font-mono text-[9px] uppercase tracking-[.2em]">Game index / seeded {state.grid.seed}</p><h2 id="uno-title" className="mt-5 font-serif text-5xl leading-none">UNO Flip<br/><em>Match.</em></h2>
        <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-black/15 py-5"><div><dt className="font-mono text-[8px] uppercase">Moves</dt><dd className="font-serif text-3xl">{state.moves}</dd></div><div><dt className="font-mono text-[8px] uppercase">Pairs</dt><dd className="font-serif text-3xl">{state.matches}/{state.grid.pairCount}</dd></div><div><dt className="font-mono text-[8px] uppercase">Side</dt><dd className="mt-2 font-mono text-xs uppercase">{state.grid.side}</dd></div></dl>
        <button type="button" disabled={!isFlipAvailable(state)} onClick={() => dispatch({ type: 'TRIGGER_SIDE_FLIP' })} className="mt-7 rounded-xl border-2 border-[#7250ad] p-5 text-left text-white disabled:cursor-not-allowed disabled:opacity-45" style={{ backgroundColor: palette[state.grid.flipCard.color] }}><p className="font-mono text-xs font-bold">{state.grid.flipCard.icon} FLIP</p><p className="mt-3 text-sm leading-6">{isFlipAvailable(state) ? 'Available once. You may use it before or after revealing the first card.' : state.sideFlipUsed ? 'Used — the dark side remains in play.' : 'Wait for this turn to resolve.'}</p></button>
        <section className="mt-7"><p className="font-mono text-[8px] uppercase tracking-widest">Light ↔ Dark</p><div className="mt-3 space-y-2">{(['red','yellow','green','blue'] as const).map((color) => <div key={color} className="flex justify-between border-b border-dashed border-black/15 pb-1 font-mono text-[9px]"><span>{color}</span><span>→</span><span>{colorMapping[color]}</span></div>)}<div className="flex justify-between border-b border-dashed border-black/15 pb-1 font-mono text-[9px]"><span>draw-one</span><span>→</span><span>{faceMapping['draw-one']}</span></div></div></section>
        {state.status === 'complete' && <motion.div className="mt-7 border border-black/20 bg-white/70 p-5 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><p className="font-serif text-3xl">Shelf cleared.</p><p className="mt-2 text-sm">All pairs matched in {state.moves} moves.</p></motion.div>}
        <button onClick={reset} className="mt-auto flex w-fit items-center gap-2 pt-8 font-mono text-[9px] uppercase tracking-widest"><RotateCcw size={14}/> New seeded game</button>
      </aside>
    </motion.section>
  </motion.div>
}
