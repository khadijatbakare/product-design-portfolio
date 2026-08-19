import content from '../data/content.json'
import { siteConfig } from '../data/site'
import { ArrowLink, Container, Eyebrow } from '../primitives'

export function SiteFooter() {
  return <footer className="footer"><Container><Eyebrow>{content.footer.eyebrow}</Eyebrow><h2>Let’s make sense<br />of it <em>together.</em></h2><ArrowLink href={`mailto:${siteConfig.email}`}>{siteConfig.email}</ArrowLink><div className="footer-bottom"><span>© 2026 {siteConfig.name}</span><div>{siteConfig.socials.map(item => <ArrowLink href={item.href} diagonal key={item.label}>{item.label.toUpperCase()}</ArrowLink>)}{siteConfig.resumeUrl && <ArrowLink href={siteConfig.resumeUrl} diagonal>RÉSUMÉ</ArrowLink>}</div><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div></Container></footer>
}
