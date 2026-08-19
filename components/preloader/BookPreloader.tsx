'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
export interface BookPreloaderProps { readonly onFinish: () => void }
export function BookPreloader({ onFinish }: BookPreloaderProps) {
  const [complete, setComplete] = useState(false)
  useEffect(() => { const progress = window.setTimeout(() => setComplete(true), 800); const finish = window.setTimeout(onFinish, 1120); return () => { window.clearTimeout(progress); window.clearTimeout(finish) } }, [onFinish])
  return <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-[#181A1E]" exit={{ opacity: 0 }} transition={{ duration: .2 }} role="status" aria-label="Loading portfolio" aria-live="polite"><motion.div className="relative h-64 w-14 overflow-hidden rounded-t-[3px] border border-white/10 bg-[#24272D] shadow-2xl" animate={complete ? { y: -30, opacity: 0, rotate: -5 } : { y: 0, opacity: 1 }} transition={complete ? { duration: .3, ease: 'easeIn' } : undefined}><div className="absolute inset-[5px] overflow-hidden rounded-sm bg-[#111317]"><motion.div className="absolute inset-0 origin-bottom bg-[#D8FF55]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: .8, ease: [0.65, 0, 0.35, 1] }} /></div><span className="absolute inset-0 flex items-center justify-center rotate-180 [writing-mode:vertical-rl] font-mono text-[9px] uppercase tracking-[.2em] text-white/70 mix-blend-difference">Portfolio index</span></motion.div><span className="sr-only">Loading</span></motion.div>
}
