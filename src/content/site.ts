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
