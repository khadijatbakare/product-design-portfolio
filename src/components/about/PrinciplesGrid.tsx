import { aboutContent } from '../../content/bio'
import { principles } from '../../content/principles'
import { Container, SectionHeading } from '../primitives'
function PrincipleCard({ principle, index }: { principle: typeof principles[number]; index: number }) { return <article><span>{String(index + 1).padStart(2, '0')}</span><h3>{principle.title}</h3><p>{principle.body}</p></article> }
export function PrinciplesGrid() { return <Container className="principles"><SectionHeading kicker={aboutContent.principlesKicker} headline={aboutContent.principlesHeadline} support={aboutContent.principlesSupport} /><div className="principle-grid">{principles.map((principle, index) => <PrincipleCard principle={principle} index={index} key={principle.id} />)}</div></Container> }
