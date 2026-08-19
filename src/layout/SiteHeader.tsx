import { useState } from 'react'
import content from '../data/content.json'
import { ArrowLink } from '../primitives'

export function SiteHeader({ route, navigate }: { route: string; navigate: (route: string) => void }) {
  const [open, setOpen] = useState(false)
  const go = (target: string) => { setOpen(false); navigate(target) }
  return <header className="site-header">
    <button className="wordmark" onClick={() => go('home')} aria-label="Go home">{content.site.initials}<span>.</span></button>
    <button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
      <button className={route === 'home' ? 'active' : ''} onClick={() => go('home')}>Work</button>
      <button className={route === 'about' ? 'active' : ''} onClick={() => go('about')}>About</button>
      <ArrowLink href={content.site.resumePath} diagonal>Résumé</ArrowLink>
      <ArrowLink className="nav-cta" href={`mailto:${content.site.email}`}>Let’s talk</ArrowLink>
    </nav>
  </header>
}
