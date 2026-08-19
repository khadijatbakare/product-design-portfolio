import { useState } from 'react'
import { siteConfig } from '../../content/site'

export function SiteHeader({ route, navigate }: { route: string; navigate: (route: string) => void }) {
  const [open, setOpen] = useState(false)
  const go = (target: string) => { setOpen(false); navigate(target) }
  return <header className="site-header">
    <button className="wordmark" onClick={() => go('home')} aria-label="Go home">{siteConfig.wordmark}<span>.</span></button>
    <button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
      {siteConfig.nav.map(item => item.kind === 'route'
        ? <button key={item.label} className={route !== 'home' && route === item.href ? 'active' : ''} onClick={() => go(item.href)}>{item.label}</button>
        : <a key={item.label} className={item.emphasis ? 'nav-cta' : ''} href={item.kind === 'mail' ? `mailto:${item.href}` : item.href}>{item.label} {item.kind === 'file' && '↗'}{item.emphasis && ' →'}</a>)}
    </nav>
  </header>
}
