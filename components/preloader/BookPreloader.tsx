'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
export function BookPreloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => { const timer = window.setTimeout(onComplete, 1300); return () => window.clearTimeout(timer) }, [onComplete])
  return <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-ink text-paper" exit={{ opacity: 0 }} transition={{ duration: .45 }} role="status" aria-label="Loading portfolio"><div className="text-center"><motion.div animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 1.2, ease: 'easeInOut' }}><BookOpen size={52} strokeWidth={1.2} /></motion.div><p className="mt-5 font-mono text-[10px] uppercase tracking-[.22em]">Opening the library</p></div></motion.div>
}
