'use client'
import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CardColor, GridCell } from '@/games/uno-flip'

export interface CardCellProps { readonly cell: GridCell; readonly disabled: boolean; readonly onFlip: (index: number) => void }
export const GridColumnsContext = createContext(1)
const palette: Record<CardColor, string> = { blue:'#2f63d7',red:'#d7463f',green:'#3c8f62',yellow:'#e2b93f',teal:'#00a7a0',pink:'#f20f74',orange:'#ff711a',purple:'#9b31cf' }

export function CardCell({ cell, disabled, onFlip }: CardCellProps) {
  const columns = useContext(GridColumnsContext); const reduced = useReducedMotion(); const faceUp = cell.status !== 'face-down'; const card = cell.card; const row = Math.floor(cell.index / columns) + 1; const column = cell.index % columns + 1
  return <motion.button type="button" disabled={disabled || cell.status === 'matched'} onClick={() => onFlip(cell.index)} className="relative aspect-[.7] rounded-xl disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" animate={reduced ? { opacity: faceUp ? 1 : .9 } : { rotateY: faceUp ? 180 : 0, opacity: cell.status === 'matched' ? .38 : 1 }} transition={{ duration: reduced ? .01 : .3 }} style={{ transformStyle: 'preserve-3d' }} aria-label={faceUp ? card.value : `Face-down card, row ${row} column ${column}`}>
    <span className="absolute inset-0 grid place-items-center rounded-xl border-4 border-white bg-[#202126] font-mono text-2xl text-white shadow-md [backface-visibility:hidden]">UNO</span>
    <span className={`absolute inset-0 grid place-items-center rounded-xl border-4 border-white p-2 text-center font-mono text-2xl font-bold text-white shadow-md ${reduced && !faceUp ? 'opacity-0' : ''} [backface-visibility:hidden]`} style={{ backgroundColor: palette[card.color], transform: reduced ? undefined : 'rotateY(180deg)' }}>{card.icon}<small className="absolute inset-x-1 bottom-2 font-mono text-[7px] uppercase">{card.value}</small></span>
  </motion.button>
}
