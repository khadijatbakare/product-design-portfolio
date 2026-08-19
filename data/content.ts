export type ModalView = 'work' | 'about' | 'resume' | 'contact'
export interface Project { readonly id: string; readonly title: string; readonly discipline: string; readonly summary: string; readonly accent: string }
export const projects: readonly Project[] = [
  { id: 'atlas', title: 'A shared language for a growing product', discipline: 'Design systems · Product architecture', summary: 'A foundation that aligned fragmented workflows and helped teams build with confidence.', accent: '#cbd6ff' },
  { id: 'northstar', title: 'Turning an early idea into a product people could trust', discipline: 'Founding design · Zero to one', summary: 'A focused product model, core journey, and reusable visual foundation.', accent: '#ffb99f' },
]
export const shelfVolumes = [
  { id: 'vol-01', modal: 'work' as const, volume: 'VOL. 01', title: 'SYSTEMS', subtitle: 'Design systems & product architecture', color: '#22252a' },
  { id: 'vol-02', modal: 'work' as const, volume: 'VOL. 02', title: 'PRODUCTS', subtitle: 'End-to-end product design & user flows', color: '#1c2e24' },
  { id: 'vol-03', modal: 'about' as const, volume: 'VOL. 03', title: 'FIELD NOTES', subtitle: 'Bookshelf, photo logs, gym & home', color: '#6e3727' },
  { id: 'vol-04', modal: 'resume' as const, volume: 'VOL. 04', title: 'AUTHOR / COLOPHON', subtitle: 'Background, experience & résumé', color: '#dcd3c1' },
]
export const profile = { name: 'Khadijat', role: 'Product Designer & Founding Designer', email: 'hello@example.com', intro: 'I design clear, coherent products from complex ideas.', about: 'Mechanical engineering trained me to understand systems and constraints. Product design gave me a more human place to apply that thinking.' }
