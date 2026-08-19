import content from '../data/content.json'
import { ArrowLink, Container, Eyebrow } from '../primitives'

export function SiteFooter() {
  return <footer className="footer"><Container><Eyebrow>{content.footer.eyebrow}</Eyebrow><h2>Let’s make sense<br />of it <em>together.</em></h2><ArrowLink href={`mailto:${content.site.email}`}>{content.site.email}</ArrowLink><div className="footer-bottom"><span>© 2026 {content.site.name}</span><div><ArrowLink href={content.site.linkedinUrl} diagonal>LINKEDIN</ArrowLink><ArrowLink href={content.site.resumePath} diagonal>RÉSUMÉ</ArrowLink></div><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div></Container></footer>
}
