export type Book = {
  title: string
  spineColor: string
  coverUrl?: string
}

export function BookshelfWidget({ books, mode = 'spines' }: { books: Book[]; mode?: 'spines' | 'covers' }) {
  return <div className={`bookshelf bookshelf-${mode}`} aria-label="Bookshelf">
    {books.map(book => mode === 'covers' && book.coverUrl
      ? <img key={book.title} src={book.coverUrl} alt={`${book.title} cover`} />
      : <div className="book-spine" key={book.title} style={{ backgroundColor: book.spineColor }}><span>{book.title}</span></div>)}
  </div>
}
