import content from '../data/content.json'
import { projectSummaries } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Container, SectionHeading, TextLink } from '../primitives'
import { bio, siteConfig } from '../data/site'
import type { Availability } from '../types/content'

type Navigate = (route: string) => void

export interface HeroSectionProps {
  readonly headline: readonly string[]
  readonly emphasis?: string
  readonly intro: string
  readonly availability?: Availability
  readonly onScrollToWork: () => void
}

export function HeroSection({ headline, emphasis, intro, availability, onScrollToWork }: HeroSectionProps) {
  return <Container className="hero">{availability && <div className="eyebrow"><span className="status-dot" /> {availability.label.toUpperCase()}</div>}<h1>{headline.map(line => <span className="headline-line" key={line}>{line}</span>)}{emphasis && <em className="headline-line">{emphasis}</em>}</h1><div className="hero-bottom"><p>{intro}</p><button className="circle-link" onClick={onScrollToWork} aria-label="View selected work">→</button></div></Container>
}

function SelectedWork({ navigate }: { navigate: Navigate }) {
  return <section className="work-section section-wrap" id="work"><SectionHeading kicker={content.work.eyebrow} headline={['A closer look', 'at how I work.']} support={content.work.intro} /><div className="project-list">{projectSummaries.map((project, index) => <ProjectCard project={project} index={index} align={index % 2 ? 'right' : 'left'} variant={index === 0 ? 'feature' : 'compact'} onOpen={navigate} key={project.slug} />)}</div></section>
}

function PositioningStatement() {
  return <Container className="messy-section"><div className="messy-mark">✳</div><h2>I’m most useful when the problem is still <em>a little messy.</em></h2><div className="messy-copy">{content.positioning.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Container>
}

function AboutTeaser({ navigate }: { navigate: Navigate }) {
  return <Container className="about-preview"><div className="portrait-placeholder"><span>YOUR<br />PORTRAIT</span><small>Replace with a candid photo</small></div><div className="about-preview-copy"><span className="kicker">02 / ABOUT</span><h2>I started out in<br /><em>mechanical engineering.</em></h2><p>{content.about.preview.body}</p><TextLink onClick={() => navigate('about')}>More about me</TextLink></div></Container>
}

export function HomePage({ navigate }: { navigate: Navigate }) {
  return <main><HeroSection headline={['I design clear,', 'coherent products']} emphasis="from complex ideas." intro={bio.short} availability={siteConfig.availability} onScrollToWork={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} /><SelectedWork navigate={navigate} /><PositioningStatement /><AboutTeaser navigate={navigate} /></main>
}
