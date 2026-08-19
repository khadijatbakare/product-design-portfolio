import { aboutContent, bio } from '../../content/bio'
import { Container, Eyebrow } from '../primitives'
export function PageHero() { return <Container className="about-hero"><Eyebrow>{aboutContent.kicker}</Eyebrow><h1>{aboutContent.headline.map(line => <span className="headline-line" key={line}>{line}</span>)}<em>{aboutContent.emphasis}</em></h1><div className="about-intro"><p>{bio.long}</p></div></Container> }
