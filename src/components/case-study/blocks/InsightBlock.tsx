import type { InsightBlock as Insight } from '../../../types/content'
import { beatLabel } from './shared'
export function InsightBlock({ number, ...block }: Insight & { number: string }) { return <section className="case-section section-wrap narrow"><div className="case-label">{beatLabel(block.beat, number)}</div><div><h2>{block.heading}</h2>{block.intro && <p>{block.intro}</p>}<div className="insight-cards">{block.insights.map(item => <article key={item.label}><span>{item.label}</span><strong>{item.statement}</strong></article>)}</div></div></section> }
