export type ModalView = 'work' | 'about' | 'resume' | 'contact'
export interface Project { readonly id: string; readonly title: string; readonly discipline: string; readonly summary: string; readonly accent: string }
export const projects: readonly Project[] = [
  { id: 'atlas', title: 'A shared language for a growing product', discipline: 'Design systems · Product architecture', summary: 'A foundation that aligned fragmented workflows and helped teams build with confidence.', accent: '#cbd6ff' },
  { id: 'northstar', title: 'Turning an early idea into a product people could trust', discipline: 'Founding design · Zero to one', summary: 'A focused product model, core journey, and reusable visual foundation.', accent: '#ffb99f' },
]
export const shelfVolumes = [
  { id: 'work' as const, volume: 'VOL. 01', title: 'WORK', subtitle: 'Systems & selected products', color: '#22252a', height: 310 },
  { id: 'about' as const, volume: 'VOL. 02', title: 'ABOUT', subtitle: 'Background & approach', color: '#1c2e24', height: 285 },
  { id: 'resume' as const, volume: 'VOL. 03', title: 'RÉSUMÉ', subtitle: 'Experience & capabilities', color: '#6e3727', height: 300 },
  { id: 'contact' as const, volume: 'VOL. 04', title: 'CONTACT', subtitle: 'Start a conversation', color: '#766f63', height: 270 },
]
export const profile = { name: 'Khadijat', role: 'Product Designer & Founding Designer', email: 'hello@example.com', intro: 'I design clear, coherent products from complex ideas.', about: 'Mechanical engineering trained me to understand systems and constraints. Product design gave me a more human place to apply that thinking.' }
