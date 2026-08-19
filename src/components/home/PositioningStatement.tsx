import { homeContent } from '../../content/site'
import { Container } from '../primitives'
export function PositioningStatement() { const copy = homeContent.positioning; return <Container className="messy-section"><div className="messy-mark">✳</div><h2>{copy.headline}</h2><div className="messy-copy">{copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Container> }
