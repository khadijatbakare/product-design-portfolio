import type { Bio, Book, PersonalTile, Principle, SiteConfig } from '../types/content'

export const siteConfig = {
  name: 'YOUR NAME', wordmark: 'KB', role: 'Product Designer & Founding Designer', email: 'hello@example.com',
  nav: [
    { label: 'Work', href: 'home', kind: 'route' },
    { label: 'About', href: 'about', kind: 'route' },
    { label: 'Résumé', href: '/resume.pdf', kind: 'file' },
    { label: 'Let’s talk', href: 'hello@example.com', kind: 'mail', emphasis: true },
  ],
  socials: [{ label: 'LinkedIn', href: '#linkedin', kind: 'external' }],
  availability: { status: 'selective', label: 'Available for select opportunities' },
  resumeUrl: '/resume.pdf',
} satisfies SiteConfig

export const bio = {
  oneLine: 'I design clear, coherent products from complex ideas.',
  short: 'Product and founding designer focused on product architecture, design systems, and end-to-end experiences.',
  long: 'I’m a product designer who enjoys making sense of complicated products—especially when they have many moving parts, unclear flows, or need a stronger foundation before they can grow. My background in mechanical engineering shapes a structured, systems-minded approach grounded in real constraints.',
  narrative: [
    'I originally studied mechanical engineering. I was drawn to the logic of it: understanding how different parts affect one another, working through constraints, and finding practical ways to solve difficult problems.',
    'Over time, I became more interested in the experiences around the systems than the machines themselves. That curiosity led me to product design.',
    'The medium changed, but parts of my approach stayed with me. I still like to understand how things fit together before deciding what they should look like. I ask a lot of questions, map the underlying structure, and work from the whole experience down to the smallest interaction.',
  ],
  portrait: { src: '/images/portrait.jpg', alt: 'Portrait of the designer', width: 1200, height: 1500, placeholder: '#bcb6a8' },
} satisfies Bio

export const principles = [
  { id: 'whole-system', title: 'See the whole system', body: 'I map the product, people, and dependencies before narrowing in on individual screens. It helps reveal where the real problem lives.' },
  { id: 'visible-decisions', title: 'Make decisions visible', body: 'I use flows, prototypes, and shared frameworks to help teams evaluate decisions—and their tradeoffs—together.' },
  { id: 'design-next', title: 'Design for what comes next', body: 'I consider the immediate experience and the patterns behind it, so today’s solution does not become tomorrow’s limitation.' },
] satisfies readonly Principle[]

export const personalTiles = [
  { id: 'bambi', label: 'BAMBI', headline: 'Household supervisor. Frequent meeting guest.', caption: 'Bambi keeps her feedback direct.', media: { src: '/images/bambi.jpg', alt: 'Bambi the cat', width: 1200, height: 1200, placeholder: '#c5b39b' }, span: 'square' },
  { id: 'gym', label: 'TRAINING', headline: 'Where I go to reset.', caption: 'A few heavy lifts and considerably fewer notifications.', media: { src: '/images/training.jpg', alt: 'Weight training session', width: 1200, height: 1200, placeholder: '#7f8581' }, span: 'square' },
  { id: 'cooking', label: 'COOKING', headline: 'The results vary. The enthusiasm does not.', caption: 'Trying new recipes, then changing them halfway through.', media: { src: '/images/cooking.jpg', alt: 'A meal being prepared', width: 1600, height: 900, placeholder: '#d8a16c' }, span: 'wide' },
] satisfies readonly PersonalTile[]

export const books = [
  { id: 'design-everyday', title: 'The Design of Everyday Things', author: 'Don Norman', status: 'finished', spineColor: '#e9b949' },
  { id: 'ways-seeing', title: 'Ways of Seeing', author: 'John Berger', status: 'finished', spineColor: '#cf6848' },
  { id: 'creative-act', title: 'The Creative Act', author: 'Rick Rubin', status: 'reading', spineColor: '#ddd4bd' },
  { id: 'thinking-systems', title: 'Thinking in Systems', author: 'Donella Meadows', status: 'next', spineColor: '#677d6a' },
  { id: 'tomorrow', title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', status: 'finished', spineColor: '#8296b8' },
] satisfies readonly Book[]
