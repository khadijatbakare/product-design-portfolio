import { BookshelfWidget } from '../components/BookshelfWidget'
import { Container, Eyebrow, SectionHeading } from '../primitives'
import { bio, books, personalTiles, principles } from '../data/site'
import type { PersonalTile } from '../types/content'

function PageHero() {
  return <Container className="about-hero"><Eyebrow>ABOUT ME</Eyebrow><h1>Curious by nature.<br /><em>Structured by training.</em></h1><div className="about-intro"><p>{bio.long}</p></div></Container>
}

function StorySection() {
  return <Container className="story"><div className="story-photo" style={{ backgroundColor: bio.portrait.placeholder }}><span>ADD YOUR PHOTO</span></div><div className="story-copy">{bio.narrative.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></Container>
}

function PrincipleCard({ principle, index }: { principle: typeof principles[number]; index: number }) {
  return <article><span>{String(index + 1).padStart(2, '0')}</span><h3>{principle.title}</h3><p>{principle.body}</p></article>
}

function PrinciplesGrid() {
  return <Container className="principles"><SectionHeading eyebrow="HOW I WORK" title={<>Principles, not<br />a fixed process.</>} intro="Every project is different. These are the ideas I return to." /><div className="principle-grid">{principles.map((principle, index) => <PrincipleCard principle={principle} index={index} key={principle.id} />)}</div></Container>
}

function PhotoTile({ item, index }: { item: PersonalTile; index: number }) {
  return <article className={`personal-card ${item.id} photo-${item.span}`}><div className="personal-image" style={{ backgroundColor: item.media.placeholder }}><span>ADD {item.label} PHOTO</span></div><div className="personal-caption"><span>{String(index + 2).padStart(2, '0')} / {item.label}</span><h3>{item.headline}</h3><p>{item.caption}</p></div></article>
}

function PhotoGrid() {
  return <>{personalTiles.map((item, index) => <PhotoTile item={item} index={index} key={item.id} />)}</>
}

function OffTheClock() {
  return <section className="off-clock section-wrap"><div className="off-heading"><Eyebrow>OFF THE CLOCK</Eyebrow><h2>Away from work,<br />life looks <em>like this.</em></h2></div><div className="personal-grid"><article className="personal-card books photo-tall"><div className="personal-image"><BookshelfWidget books={books} /></div><div className="personal-caption"><span>01 / BOOKS</span><h3>My shelves are steadily running out of room.</h3><p>Usually reading one book and thinking about the next three.</p></div></article><PhotoGrid /></div></section>
}

export function AboutPage() {
  return <main><PageHero /><StorySection /><PrinciplesGrid /><OffTheClock /></main>
}
