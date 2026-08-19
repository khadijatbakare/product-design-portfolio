import type { Book } from '../../types/content'
export interface BookSpineProps { readonly book: Book; readonly height: number }
export function BookSpine({ book, height }: BookSpineProps) { return <div className="book-spine" style={{ backgroundColor: book.spineColor, height: `${height}%` }} title={`${book.title} — ${book.author}`}><span>{book.title}</span></div> }
