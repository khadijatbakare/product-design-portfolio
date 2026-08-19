import type { ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`section-wrap ${className}`.trim()}>{children}</div>
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`kicker ${className}`.trim()}>{children}</span>
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return <div className="section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{intro && <p>{intro}</p>}</div>
}

export function ArrowLink({ children, href, diagonal = false, className = '' }: { children: ReactNode; href: string; diagonal?: boolean; className?: string }) {
  return <a className={className} href={href}>{children} <span aria-hidden="true">{diagonal ? '↗' : '→'}</span></a>
}

export function TextLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className="text-link" onClick={onClick}>{children} <span aria-hidden="true">→</span></button>
}

export function Media({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  return <div className={className} aria-label={label}>{children}</div>
}
