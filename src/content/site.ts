import type { SiteConfig } from '../types/content'

export const siteConfig: SiteConfig = {
  name: 'YOUR NAME', wordmark: 'KB', role: 'Product Designer & Founding Designer', email: 'hello@example.com',
  nav: [{ label: 'Work', href: 'home', kind: 'route' }, { label: 'About', href: 'about', kind: 'route' }, { label: 'Résumé', href: 'resume', kind: 'route' }, { label: 'Let’s talk', href: 'hello@example.com', kind: 'mail', emphasis: true }],
  socials: [{ label: 'LinkedIn', href: '#linkedin', kind: 'external' }],
  availability: { status: 'selective', label: 'Available for select opportunities' }, resumeUrl: '#resume',
}

export const homeContent = {
  hero: { headline: ['I design clear,', 'coherent products'], emphasis: 'from complex ideas.' },
  work: { kicker: '01 / SELECTED WORK', headline: ['A closer look', 'at how I work.'], support: 'Projects spanning foundational product decisions, complex user flows, and systems designed to scale.' },
  positioning: { headline: 'I’m most useful when the problem is still a little messy.', paragraphs: ['I work across the structure of a product: understanding what needs to exist, defining how the pieces connect, and designing the flows and systems that make it usable.', 'Sometimes that means shaping a new product from the ground up. Other times, it means bringing order and consistency to something already growing.'] },
  about: { kicker: '02 / ABOUT', headline: 'I started out in mechanical engineering.', body: 'It taught me to break large problems into understandable parts, work within real constraints, and think carefully about how systems behave. Product design gave me a more human place to apply that way of thinking.', linkLabel: 'More about me' },
}

export const footerContent = { eyebrow: 'HAVE A COMPLICATED PRODUCT PROBLEM?', headline: ['Let’s make sense', 'of it'], emphasis: 'together.' }

export const libraryNavigation = {
  eyebrow: 'PRODUCT DESIGNER · FOUNDING DESIGNER', instruction: 'Choose a volume', backLabel: 'Back to shelf', openLabel: 'Open section',
  books: [
    { id: 'systems', spine: 'SYSTEMS', number: '01', color: '#292824', route: 'atlas', heading: 'Systems that help products hold together.', description: 'Design systems, product architecture, and the foundations that help teams move with clarity.', detail: 'Featured case study · Atlas' },
    { id: 'products', spine: 'PRODUCTS', number: '02', color: '#315746', route: 'northstar', heading: 'Products shaped from first principles.', description: 'End-to-end experiences, zero-to-one product work, and the decisions behind what ships.', detail: 'Featured case study · Northstar' },
    { id: 'notes', spine: 'NOTES & LIFE', number: '03', color: '#7b4933', route: 'about', scrollId: 'off-the-clock', heading: 'Books, training, food, and Bambi.', description: 'The things I make time for when I am away from product work.', detail: 'Off the clock' },
    { id: 'about', spine: 'ABOUT ME', number: '04', color: '#766f63', route: 'about', heading: 'Engineer by training. Designer by practice.', description: 'How mechanical engineering shaped the structured way I approach complex product problems.', detail: 'Background and approach' },
  ],
} as const
