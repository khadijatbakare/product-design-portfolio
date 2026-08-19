import { homeContent } from '../../content/site'
import { bio } from '../../content/bio'
import { Container, Media, TextLink } from '../primitives'
export function AboutTeaser({ navigate }: { navigate: (route: string) => void }) { const copy = homeContent.about; return <Container className="about-preview"><Media className="portrait-placeholder" asset={bio.portrait} placeholderLabel="ADD YOUR PORTRAIT" /><div className="about-preview-copy"><span className="kicker">{copy.kicker}</span><h2>{copy.headline}</h2><p>{copy.body}</p><TextLink onClick={() => navigate('about')}>{copy.linkLabel}</TextLink></div></Container> }
