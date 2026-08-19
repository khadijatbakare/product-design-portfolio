import type { ProseBlock as Prose } from '../../../types/content'
import { beatLabel } from './shared'
export function ProseBlock({ number, ...block }: Prose & { number: string }) { return <section className="case-section section-wrap narrow"><div className="case-label">{beatLabel(block.beat, number)}</div><div><h2>{block.heading}</h2>{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section> }
