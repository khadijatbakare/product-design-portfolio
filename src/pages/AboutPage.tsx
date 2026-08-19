import content from '../data/content.json'
import { BookshelfWidget } from '../components/BookshelfWidget'
import { Container, Eyebrow, SectionHeading } from '../primitives'

const books = [{ title: 'The Design of Everyday Things', spineColor: '#e9b949' }, { title: 'Ways of Seeing', spineColor: '#cf6848' }, { title: 'The Creative Act', spineColor: '#ddd4bd' }, { title: 'Thinking in Systems', spineColor: '#677d6a' }, { title: 'Tomorrow, and Tomorrow, and Tomorrow', spineColor: '#8296b8' }]

function PageHero() {
  return <Container className="about-hero"><Eyebrow>{content.about.eyebrow}</Eyebrow><h1>Curious by nature.<br /><em>Structured by training.</em></h1><div className="about-intro"><p>{content.about.intro}</p></div></Container>
}

function StorySection() {
  return <Container className="story"><div className="story-photo"><span>ADD YOUR PHOTO</span></div><div className="story-copy">{content.about.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Container>
}

function PrincipleCard({ principle }: { principle: typeof content.principles[number] }) {
  return <article><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.body}</p></article>
}

function PrinciplesGrid() {
  return <Container className="principles"><SectionHeading eyebrow="HOW I WORK" title={<>Principles, not<br />a fixed process.</>} intro="Every project is different. These are the ideas I return to." /><div className="principle-grid">{content.principles.map(principle => <PrincipleCard principle={principle} key={principle.number} />)}</div></Container>
}

type PhotoSpan = 'tall' | 'wide' | 'square'
function PhotoTile({ item, span }: { item: typeof content.personal[number]; span: PhotoSpan }) {
  return <article className={`personal-card ${item.id} photo-${span}`}><div className="personal-image"><span>ADD {item.id.toUpperCase()} PHOTO</span></div><div className="personal-caption"><span>{item.label}</span><h3>{item.title}</h3><p>{item.caption}</p></div></article>
}

function PhotoGrid() {
  const photos = content.personal.filter(item => item.id !== 'books')
  const spans: PhotoSpan[] = ['square', 'square', 'wide']
  return <>{photos.map((item, index) => <PhotoTile item={item} span={spans[index]} key={item.id} />)}</>
}

function OffTheClock() {
  const bookCopy = content.personal.find(item => item.id === 'books')!
  return <section className="off-clock section-wrap"><div className="off-heading"><Eyebrow>OFF THE CLOCK</Eyebrow><h2>Away from work,<br />life looks <em>like this.</em></h2></div><div className="personal-grid"><article className="personal-card books photo-tall"><div className="personal-image"><BookshelfWidget books={books} /></div><div className="personal-caption"><span>{bookCopy.label}</span><h3>{bookCopy.title}</h3><p>{bookCopy.caption}</p></div></article><PhotoGrid /></div></section>
}

export function AboutPage() {
  return <main><PageHero /><StorySection /><PrinciplesGrid /><OffTheClock /></main>
}
