import type { Book } from '../types/content'
export const books = [{ id: 'design-everyday', title: 'The Design of Everyday Things', author: 'Don Norman', status: 'finished', spineColor: '#e9b949' }, { id: 'ways-seeing', title: 'Ways of Seeing', author: 'John Berger', status: 'finished', spineColor: '#cf6848' }, { id: 'creative-act', title: 'The Creative Act', author: 'Rick Rubin', status: 'reading', spineColor: '#ddd4bd' }, { id: 'thinking-systems', title: 'Thinking in Systems', author: 'Donella Meadows', status: 'next', spineColor: '#677d6a' }, { id: 'tomorrow', title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', status: 'finished', spineColor: '#8296b8' }] satisfies readonly Book[]

export const librarySections = [
  { id: 'systems', title: 'Systems Architecture', number: '01', color: '#292824', heading: 'How complex things hold together.', body: 'Books that sharpen how I think about systems, constraints, feedback loops, and the structures beneath a product.', bookIds: ['thinking-systems', 'design-everyday'] },
  { id: 'products', title: 'Product Design', number: '02', color: '#365b48', heading: 'Products, people, and decisions.', body: 'Reading that helps me understand behaviour, make better product decisions, and communicate ideas more clearly.', bookIds: ['ways-seeing', 'creative-act'] },
  { id: 'life', title: 'Inputs & Life', number: '03', color: '#713f2b', heading: 'Everything else that stays with me.', body: 'Fiction, essays, and other inputs I read for no professional reason at all.', bookIds: ['tomorrow'] },
] as const
export const libraryLabels = { back: 'Back to shelf', reading: 'On this shelf', close: 'Close library' }
