import type { ReactNode } from 'react'
export function TextLink({ children, onClick }: { children: ReactNode; onClick: () => void }) { return <button className="text-link" onClick={onClick}>{children} <span aria-hidden="true">→</span></button> }
