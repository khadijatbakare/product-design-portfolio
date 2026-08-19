import content from '../data/content.json'
import { projectSummaries } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Container, SectionHeading, TextLink } from '../primitives'
import { bio, siteConfig } from '../data/site'

type Navigate = (route: string) => void

function HeroSection() {
  return <Container className="hero"><div className="eyebrow"><span className="status-dot" /> {siteConfig.availability?.label.toUpperCase()}</div><h1>I design clear,<br />coherent products<br />from <em>complex ideas.</em></h1><div className="hero-bottom"><p>{bio.short}</p><button className="circle-link" onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} aria-label="View selected work">→</button></div></Container>
}

function SelectedWork({ navigate }: { navigate: Navigate }) {
  return <section className="work-section section-wrap" id="work"><SectionHeading eyebrow={content.work.eyebrow} title={<>A closer look<br />at how I work.</>} intro={content.work.intro} /><div className="project-list">{projectSummaries.map((project, index) => <ProjectCard project={project} variant={index === 0 ? 'feature' : 'compact'} onOpen={navigate} key={project.slug} />)}</div></section>
}

function PositioningStatement() {
  return <Container className="messy-section"><div className="messy-mark">✳</div><h2>I’m most useful when the problem is still <em>a little messy.</em></h2><div className="messy-copy">{content.positioning.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Container>
}

function AboutTeaser({ navigate }: { navigate: Navigate }) {
  return <Container className="about-preview"><div className="portrait-placeholder"><span>YOUR<br />PORTRAIT</span><small>Replace with a candid photo</small></div><div className="about-preview-copy"><span className="kicker">02 / ABOUT</span><h2>I started out in<br /><em>mechanical engineering.</em></h2><p>{content.about.preview.body}</p><TextLink onClick={() => navigate('about')}>More about me</TextLink></div></Container>
}

export function HomePage({ navigate }: { navigate: Navigate }) {
  return <main><HeroSection /><SelectedWork navigate={navigate} /><PositioningStatement /><AboutTeaser navigate={navigate} /></main>
}
