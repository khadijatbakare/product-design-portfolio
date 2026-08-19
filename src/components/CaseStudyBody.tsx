import type { CaseStudyBlock } from '../data/projects'
import { artRegistry } from './artRegistry'

type BlockOf<T extends CaseStudyBlock['type']> = Extract<CaseStudyBlock, { type: T }>

function assertNever(value: never): never {
  throw new Error(`Unhandled case study block: ${JSON.stringify(value)}`)
}

export function ProseBlock({ block }: { block: BlockOf<'prose'> }) {
  return <section className="case-section section-wrap narrow"><div className="case-label">{block.label}</div><div><h2>{block.heading}</h2>{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>
}

export function FigureBlock({ block }: { block: BlockOf<'figure'> }) {
  const Art = artRegistry[block.artKey]
  return <figure className={`case-figure project-${block.artKey}`}><div><Art /></div><figcaption>{block.caption}</figcaption></figure>
}

export function QuoteBlock({ block }: { block: BlockOf<'quote'> }) {
  return <section className="case-quote section-wrap"><span>{block.label}</span><blockquote>{block.quote}</blockquote></section>
}

export function InsightBlock({ block }: { block: BlockOf<'insight'> }) {
  return <section className="case-section section-wrap narrow"><div className="case-label">{block.label}</div><div><h2>{block.heading}</h2><p>{block.intro}</p><div className="insight-cards">{block.items.map(item => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}</div></div></section>
}

export function DecisionBlock({ block }: { block: BlockOf<'decision'> }) {
  return <section className="decision section-wrap"><span className="kicker">{block.label}</span><h2>{block.heading}</h2><div className="decision-grid">{block.items.map(item => <div key={item.label}><span>{item.label}</span><p>{item.value}</p></div>)}</div></section>
}

export function OutcomeBlock({ block }: { block: BlockOf<'outcome'> }) {
  return <section className="outcome section-wrap"><span className="kicker">{block.label}</span><h2>{block.heading}</h2><p>{block.body}</p>{block.note && <small>{block.note}</small>}</section>
}

export function ReflectionBlock({ block }: { block: BlockOf<'reflection'> }) {
  return <section className="reflection section-wrap"><div><span className="kicker">REFLECTION</span><h2>{block.heading}</h2></div><p>{block.body}</p></section>
}

export function CaseStudyBody({ blocks }: { blocks: CaseStudyBlock[] }) {
  return <>{blocks.map((block, index) => {
    switch (block.type) {
      case 'prose':
        return <ProseBlock block={block} key={index} />
      case 'figure':
        return <FigureBlock block={block} key={index} />
      case 'quote':
        return <QuoteBlock block={block} key={index} />
      case 'insight':
        return <InsightBlock block={block} key={index} />
      case 'decision':
        return <DecisionBlock block={block} key={index} />
      case 'outcome':
        return <OutcomeBlock block={block} key={index} />
      case 'reflection':
        return <ReflectionBlock block={block} key={index} />
      default:
        return assertNever(block)
    }
  })}</>
}
