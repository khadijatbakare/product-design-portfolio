import { Eyebrow } from './Eyebrow'
export interface SectionHeadingProps { readonly kicker: string; readonly headline: readonly string[]; readonly emphasis?: string; readonly support?: string }
export function SectionHeading({ kicker, headline, emphasis, support }: SectionHeadingProps) { return <div className="section-heading"><div><Eyebrow>{kicker}</Eyebrow><h2>{headline.map(line => <span className="headline-line" key={line}>{line}</span>)}{emphasis && <em className="headline-line">{emphasis}</em>}</h2></div>{support && <p>{support}</p>}</div> }
