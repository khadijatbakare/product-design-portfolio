'use client'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BookPreloader } from '@/components/preloader/BookPreloader'
import { CornerBookshelf } from '@/components/shelf/CornerBookshelf'
import { BookSpreadModal } from '@/components/modal/BookSpreadModal'
import { LibraryCheckoutFooter } from '@/components/footer/LibraryCheckoutFooter'
import { profile, projects, type ModalView } from '@/data/content'

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalView | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const closeModal = useCallback(() => setActiveModal(null), [])
  const openModal = useCallback((view: ModalView) => { setActiveModal(view); if (view === 'work') setSelectedProject(current => current ?? projects[0].id) }, [])
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeModal(); if (activeModal !== 'work') return; const index = Math.max(0, projects.findIndex(project => project.id === selectedProject)); if (event.key === 'ArrowRight') setSelectedProject(projects[(index + 1) % projects.length].id); if (event.key === 'ArrowLeft') setSelectedProject(projects[(index - 1 + projects.length) % projects.length].id) }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown) }, [activeModal, selectedProject, closeModal])
  return <main className="paper-texture min-h-screen bg-paper"><AnimatePresence>{isLoading && <BookPreloader key="preloader" onComplete={() => setIsLoading(false)} />}</AnimatePresence><header className="mx-auto max-w-7xl px-6 pt-12 md:px-12"><span className="font-mono text-[10px] uppercase tracking-[.18em]">{profile.role}</span><h1 className="mt-8 max-w-5xl font-serif text-6xl leading-[.9] tracking-tight md:text-8xl">{profile.intro}</h1><p className="mt-8 max-w-lg leading-7 text-black/60">Choose a volume from the shelf to explore the portfolio.</p></header><div className="mx-auto max-w-7xl px-6 md:px-12"><CornerBookshelf onOpen={openModal}/></div><LibraryCheckoutFooter onOpen={openModal}/><AnimatePresence>{activeModal && <BookSpreadModal key={activeModal} activeModal={activeModal} selectedProject={selectedProject} onClose={closeModal} onSelectProject={setSelectedProject}/>}</AnimatePresence></main>
}
