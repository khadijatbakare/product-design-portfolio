import type { Book } from '../types/content'

export function BookSpine({ book }: { book: Book }) {
  return <div className="book-spine" style={{ backgroundColor: book.spineColor }}><span>{book.title}</span></div>
}

export function BookshelfWidget({ books, mode = 'spines' }: { books: readonly Book[]; mode?: 'spines' | 'covers' }) {
  return <div className={`bookshelf bookshelf-${mode}`} aria-label="Bookshelf">
    {books.map(book => mode === 'covers' && book.cover
      ? <img key={book.id} src={book.cover.src} alt={book.cover.alt} width={book.cover.width} height={book.cover.height} />
      : <BookSpine key={book.title} book={book} />)}
  </div>
}
