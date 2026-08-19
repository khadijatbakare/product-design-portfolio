import React from 'react'
export interface EyebrowProps { readonly children: React.ReactNode; readonly withDot?: boolean; readonly tone?: 'ink' | 'paper' }
export function Eyebrow({ children, withDot = false, tone = 'ink' }: EyebrowProps) { return <span className={`kicker eyebrow-${tone}`}>{withDot && <span className="status-dot" />}{children}</span> }
