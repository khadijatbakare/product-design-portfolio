import React, { useState, type ReactNode } from 'react'
import type { MediaAsset } from '../types/content'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`section-wrap ${className}`.trim()}>{children}</div>
}

export interface EyebrowProps {
  readonly children: React.ReactNode
  readonly withDot?: boolean
  readonly tone?: 'ink' | 'paper'
}
export function Eyebrow({ children, withDot = false, tone = 'ink' }: EyebrowProps) {
  return <span className={`kicker eyebrow-${tone}`}>{withDot && <span className="status-dot" />}{children}</span>
}

export interface SectionHeadingProps {
  readonly kicker: string
  readonly headline: readonly string[]
  readonly emphasis?: string
  readonly support?: string
}
export function SectionHeading({ kicker, headline, emphasis, support }: SectionHeadingProps) {
  return <div className="section-heading"><div><Eyebrow>{kicker}</Eyebrow><h2>{headline.map(line => <span className="headline-line" key={line}>{line}</span>)}{emphasis && <em className="headline-line">{emphasis}</em>}</h2></div>{support && <p>{support}</p>}</div>
}

export interface ArrowLinkProps {
  readonly children: React.ReactNode
  readonly href?: string
  readonly onClick?: () => void
  readonly direction?: 'right' | 'diagonal' | 'up'
  readonly variant?: 'text' | 'circle' | 'pill'
}
export function ArrowLink({ children, href, onClick, direction = 'right', variant = 'text' }: ArrowLinkProps) {
  const arrow = { right: '→', diagonal: '↗', up: '↑' }[direction]
  const className = `arrow-link arrow-link-${variant}`
  return href ? <a className={className} href={href}>{children} <span aria-hidden="true">{arrow}</span></a> : <button className={className} onClick={onClick}>{children} <span aria-hidden="true">{arrow}</span></button>
}

export function TextLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className="text-link" onClick={onClick}>{children} <span aria-hidden="true">→</span></button>
}

export interface MediaProps {
  readonly asset: MediaAsset
  readonly priority?: boolean
  readonly className?: string
  readonly placeholderLabel?: string
}
export function Media({ asset, priority = false, className = '', placeholderLabel }: MediaProps) {
  const [failed, setFailed] = useState(false)
  return <div className={`media ${className}`.trim()} style={{ aspectRatio: `${asset.width}/${asset.height}`, background: asset.placeholder }}>
    {!failed && <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onError={() => setFailed(true)} />}
    {failed && placeholderLabel && <span className="media-placeholder">{placeholderLabel}</span>}
  </div>
}
