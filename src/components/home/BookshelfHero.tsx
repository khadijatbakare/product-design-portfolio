import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { bio } from '../../content/bio'
import { homeContent, libraryNavigation, siteConfig } from '../../content/site'
import { BookshelfNavigation } from './BookshelfNavigation'
import { ScrapbookSpread } from './ScrapbookSpread'
export function BookshelfHero({ navigate: _navigate }: { navigate: (route: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const backButton = useRef<HTMLButtonElement>(null)
  const selected = libraryNavigation.books.find(book => book.id === selectedId)
  useEffect(() => { if (!selected) return; backButton.current?.focus(); const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedId(null); document.body.style.overflow = 'hidden'; window.addEventListener('keydown', close); return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close) } }, [selected])
  return <section className="bookshelf-hero section-wrap"><div className="bookshelf-positioning"><div className="eyebrow"><span className="status-dot" /> {siteConfig.availability?.label.toUpperCase()}</div><h1>{homeContent.hero.headline.map(line => <span className="headline-line" key={line}>{line}</span>)}<em className="headline-line">{homeContent.hero.emphasis}</em></h1><p>{bio.short}</p></div><div className="bookshelf-intro"><span>{libraryNavigation.eyebrow}</span><p>{libraryNavigation.instruction} ↓</p></div><div className="hero-shelf-scene"><BookshelfNavigation onSelectBook={setSelectedId} /><div className="shelf-object" aria-hidden="true"><i /><span /></div></div><AnimatePresence>{selected && <motion.div className="site-book-overlay" role="dialog" aria-modal="true" aria-labelledby="site-book-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.article layoutId={`site-book-${selected.id}`} className="open-site-book open-scrapbook" style={{ '--book-color': selected.color } as CSSProperties}><button ref={backButton} className="site-book-back" onClick={() => setSelectedId(null)}>← {libraryNavigation.backLabel}</button><div className="scrapbook-scroll"><header className="scrapbook-cover-note"><span>{selected.volume} / {selected.spine}</span><h1 id="site-book-title">{selected.heading}</h1><p>{selected.description}</p></header><ScrapbookSpread bookId={selected.id} /></div></motion.article></motion.div>}</AnimatePresence></section>
}
