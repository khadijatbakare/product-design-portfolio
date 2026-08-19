import type { CaseStudyBlock } from '../data/projects'
import { artRegistry } from './artRegistry'

function assertNever(value: never): never {
  throw new Error(`Unhandled case study block: ${JSON.stringify(value)}`)
}

export function CaseStudyBody({ blocks }: { blocks: CaseStudyBlock[] }) {
  return <>{blocks.map((block, index) => {
    switch (block.type) {
      case 'prose':
        return <section className="case-section section-wrap narrow" key={index}><div className="case-label">{block.label}</div><div><h2>{block.heading}</h2>{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>
      case 'figure': {
        const Art = artRegistry[block.artKey]
        return <figure className={`case-figure project-${block.artKey}`} key={index}><div><Art /></div><figcaption>{block.caption}</figcaption></figure>
      }
      case 'quote':
        return <section className="case-quote section-wrap" key={index}><span>{block.label}</span><blockquote>{block.quote}</blockquote></section>
      case 'insight':
        return <section className="case-section section-wrap narrow" key={index}><div className="case-label">{block.label}</div><div><h2>{block.heading}</h2><p>{block.intro}</p><div className="insight-cards">{block.items.map(item => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}</div></div></section>
      case 'decision':
        return <section className="decision section-wrap" key={index}><span className="kicker">{block.label}</span><h2>{block.heading}</h2><div className="decision-grid">{block.items.map(item => <div key={item.label}><span>{item.label}</span><p>{item.value}</p></div>)}</div></section>
      case 'outcome':
        return <section className="outcome section-wrap" key={index}><span className="kicker">{block.label}</span><h2>{block.heading}</h2><p>{block.body}</p>{block.note && <small>{block.note}</small>}</section>
      case 'reflection':
        return <section className="reflection section-wrap" key={index}><div><span className="kicker">REFLECTION</span><h2>{block.heading}</h2></div><p>{block.body}</p></section>
      default:
        return assertNever(block)
    }
  })}</>
}
