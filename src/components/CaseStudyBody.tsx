import type { Beat, CaseStudyBlock } from '../types/content'

type BlockOf<T extends CaseStudyBlock['kind']> = Extract<CaseStudyBlock, { kind: T }>
const beatLabels: Record<Beat, string> = { situation: 'THE SITUATION', problem: 'THE PROBLEM', analysis: 'THE ANALYSIS', constraints: 'THE CONSTRAINTS', decision: 'THE DECISION', shipped: 'WHAT SHIPPED', outcome: 'THE OUTCOME', reflection: 'REFLECTION' }
const beatNumber = (beat: Beat) => String(Object.keys(beatLabels).indexOf(beat) + 1).padStart(2, '0')
const label = (beat: Beat) => `${beatNumber(beat)} / ${beatLabels[beat]}`
function assertNever(value: never): never { throw new Error(`Unhandled case study block: ${JSON.stringify(value)}`) }

export function ProseBlock({ block }: { block: BlockOf<'prose'> }) {
  return <section className="case-section section-wrap narrow"><div className="case-label">{label(block.beat)}</div><div><h2>{block.heading}</h2>{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>
}
export function FigureBlock({ block }: { block: BlockOf<'figure'> }) {
  return <figure className={`case-figure figure-${block.bleed}`}><img src={block.media.src} alt={block.media.alt} width={block.media.width} height={block.media.height} style={{ backgroundColor: block.media.placeholder }} />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>
}
export function QuoteBlock({ block }: { block: BlockOf<'quote'> }) {
  return <section className="case-quote section-wrap"><span>{label(block.beat)} · {block.label}</span><blockquote>{block.quote}</blockquote></section>
}
export function InsightBlock({ block }: { block: BlockOf<'insight'> }) {
  return <section className="case-section section-wrap narrow"><div className="case-label">{label(block.beat)}</div><div><h2>{block.heading}</h2>{block.intro && <p>{block.intro}</p>}<div className="insight-cards">{block.insights.map(item => <article key={item.label}><span>{item.label}</span><strong>{item.statement}</strong></article>)}</div></div></section>
}
export function DecisionBlock({ block }: { block: BlockOf<'decision'> }) {
  const items = [{ label: 'DIFFICULTY', value: block.difficulty }, { label: 'PROPOSAL', value: block.proposal }, { label: 'TRADE-OFF', value: block.tradeoff }]
  return <section className="decision section-wrap"><span className="kicker">{label(block.beat)}</span><h2>{block.heading}</h2>{block.figure && <img src={block.figure.src} alt={block.figure.alt} width={block.figure.width} height={block.figure.height} />}<div className="decision-grid">{items.map(item => <div key={item.label}><span>{item.label}</span><p>{item.value}</p></div>)}</div></section>
}
export function OutcomeBlock({ block }: { block: BlockOf<'outcome'> }) {
  return <section className="outcome section-wrap"><span className="kicker">{label(block.beat)}</span><h2>{block.heading}</h2><p>{block.body}</p>{block.metrics && <div className="metric-grid">{block.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span><small>Source: {metric.source}</small></div>)}</div>}{block.unverifiedNote && <small>{block.unverifiedNote}</small>}</section>
}
export function ReflectionBlock({ block }: { block: BlockOf<'reflection'> }) {
  return <section className="reflection section-wrap"><div><span className="kicker">{label(block.beat)}</span><h2>{block.heading}</h2></div><p>{block.body}</p></section>
}
export function CaseStudyBody({ blocks }: { blocks: readonly CaseStudyBlock[] }) {
  return <>{blocks.map(block => {
    switch (block.kind) {
      case 'prose': return <ProseBlock block={block} key={block.id} />
      case 'figure': return <FigureBlock block={block} key={block.id} />
      case 'quote': return <QuoteBlock block={block} key={block.id} />
      case 'insight': return <InsightBlock block={block} key={block.id} />
      case 'decision': return <DecisionBlock block={block} key={block.id} />
      case 'outcome': return <OutcomeBlock block={block} key={block.id} />
      case 'reflection': return <ReflectionBlock block={block} key={block.id} />
      default: return assertNever(block)
    }
  })}</>
}
