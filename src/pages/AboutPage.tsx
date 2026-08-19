import { BookshelfWidget } from '../components/BookshelfWidget'
import { Container, Eyebrow, Media, SectionHeading } from '../primitives'
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
  return <Container className="principles"><SectionHeading kicker="HOW I WORK" headline={['Principles, not', 'a fixed process.']} support="Every project is different. These are the ideas I return to." /><div className="principle-grid">{principles.map((principle, index) => <PrincipleCard principle={principle} index={index} key={principle.id} />)}</div></Container>
}

export interface PhotoGridProps { readonly tiles: readonly PersonalTile[]; readonly columns?: 2 | 3 }
export interface PhotoTileProps { readonly tile: PersonalTile; readonly index: number; readonly priority?: boolean }
export function PhotoTile({ tile, index, priority = false }: PhotoTileProps) {
  return <article className={`personal-card ${tile.id} photo-${tile.span}`}><Media className="personal-image" asset={tile.media} priority={priority} placeholderLabel={`ADD ${tile.label} PHOTO`} /><div className="personal-caption"><span>{String(index + 2).padStart(2, '0')} / {tile.label}</span><h3>{tile.headline}</h3><p>{tile.caption}</p></div></article>
}

export function PhotoGrid({ tiles, columns = 2 }: PhotoGridProps) {
  return <div className={`photo-grid photo-grid-${columns}`}>{tiles.map((tile, index) => <PhotoTile tile={tile} index={index} priority={index === 0} key={tile.id} />)}</div>
}

function OffTheClock() {
  return <section className="off-clock section-wrap"><div className="off-heading"><Eyebrow>OFF THE CLOCK</Eyebrow><h2>Away from work,<br />life looks <em>like this.</em></h2></div><div className="personal-grid"><article className="personal-card books photo-tall"><div className="personal-image"><BookshelfWidget books={books} display="spines" featureCurrent /></div><div className="personal-caption"><span>01 / BOOKS</span><h3>My shelves are steadily running out of room.</h3><p>Usually reading one book and thinking about the next three.</p></div></article><PhotoGrid tiles={personalTiles} columns={2} /></div></section>
}

export function AboutPage() {
  return <main><PageHero /><StorySection /><PrinciplesGrid /><OffTheClock /></main>
}
