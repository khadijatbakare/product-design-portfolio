import type { Book } from '../types/content'

export interface BookshelfWidgetProps {
  readonly books: readonly Book[]
  readonly display?: 'spines' | 'list'
  readonly limit?: number
  readonly featureCurrent?: boolean
}
export interface BookSpineProps { readonly book: Book; readonly height: number }

export function BookSpine({ book, height }: BookSpineProps) {
  return <div className="book-spine" style={{ backgroundColor: book.spineColor, height: `${height}%` }} title={`${book.title} — ${book.author}`}><span>{book.title}</span></div>
}

export function BookshelfWidget({ books, display = 'spines', limit, featureCurrent = false }: BookshelfWidgetProps) {
  const current = featureCurrent ? books.find(book => book.status === 'reading') : undefined
  const ordered = current ? [current, ...books.filter(book => book.id !== current.id)] : books
  const visible = limit ? ordered.slice(0, limit) : ordered
  const remaining = ordered.length - visible.length
  if (display === 'list') return <div className="book-list">{visible.map(book => <div className={book.id === current?.id ? 'book-current' : ''} key={book.id}><strong>{book.title}</strong><span>{book.author}</span></div>)}{remaining > 0 && <span>+ {remaining} more</span>}</div>
  return <div className="bookshelf bookshelf-spines" aria-label="Bookshelf">{visible.map((book, index) => <BookSpine key={book.id} book={book} height={68 + ((index * 11) % 25)} />)}{remaining > 0 && <div className="books-remaining">+ {remaining}<br />more</div>}</div>
}
