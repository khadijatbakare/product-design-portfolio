import { bio } from '../../content/bio'
import { Container, Media } from '../primitives'
export function StorySection() { return <Container className="story"><Media className="story-photo" asset={bio.portrait} priority placeholderLabel="ADD YOUR PHOTO" /><div className="story-copy">{bio.narrative.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Container> }
