import { offTheClockContent, personalTiles } from '../../content/personal'
import { Eyebrow } from '../primitives'
import { LibraryNav } from './LibraryNav'
import { PhotoGrid } from './PhotoGrid'
export function OffTheClock() { const copy = offTheClockContent; return <section className="off-clock section-wrap"><div className="off-heading"><Eyebrow>{copy.kicker}</Eyebrow><h2>{copy.headline.map(line => <span className="headline-line" key={line}>{line}</span>)}<em>{copy.emphasis}</em></h2></div><div className="personal-grid"><article className="personal-card books photo-tall"><div className="personal-image"><LibraryNav /></div><div className="personal-caption"><span>01 / {copy.booksLabel}</span><h3>{copy.booksHeadline}</h3><p>{copy.booksCaption}</p></div></article><PhotoGrid tiles={personalTiles} columns={2} /></div></section> }
