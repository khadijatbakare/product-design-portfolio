export interface MediaAsset { readonly src: string; readonly alt: string; readonly width: number; readonly height: number; readonly placeholder?: string }
export type AvailabilityStatus = 'open' | 'selective' | 'closed'
export type VolumeContents = 'work' | 'notes' | 'about' | 'resume'
export type ModalView = VolumeContents | 'contact'
export type VolumeId = 'vol-01' | 'vol-02' | 'vol-03' | 'vol-04'

export interface Volume {
  readonly id: string
  readonly volume: string
  readonly spine: string
  readonly subtitle: string
  readonly readTime: string
  readonly contents: VolumeContents
  readonly heading: string
  readonly description: string
  readonly width: number
  readonly height: number
  readonly color: string
  readonly textColor: string
  readonly typography: 'mono' | 'serif' | 'italic' | 'sans'
  readonly texture: 'dots' | 'gradient' | 'coarse-dots' | 'paper'
  readonly accent: 'lines' | 'numeral' | 'stitch' | 'ribbon'
}
export interface Metric { readonly value: string; readonly label: string; readonly source: string; readonly verified: boolean }
export interface SystemDecision { readonly decision: string; readonly rationale: string; readonly tradeoff: string }
export interface VisualAsset { readonly media: MediaAsset; readonly caption: string; readonly spec: string }
export interface Project { readonly id: string; readonly volumeId: 'vol-01' | 'vol-02'; readonly title: string; readonly discipline: string; readonly problem: string; readonly solution: string; readonly constraints: readonly string[]; readonly systemDecisions: readonly SystemDecision[]; readonly metrics: readonly Metric[]; readonly visuals: readonly VisualAsset[]; readonly accent: string }
export interface Principle { readonly title: string; readonly body: string }
export interface Hobby { readonly id: string; readonly title: string; readonly caption: string; readonly media: MediaAsset }
export interface AboutMe { readonly name: string; readonly role: string; readonly email: string; readonly intro: string; readonly story: readonly string[]; readonly portrait: MediaAsset; readonly principles: readonly Principle[]; readonly hobbies: readonly Hobby[] }
export interface ResumeEntry { readonly organization: string; readonly role: string; readonly period: string; readonly summary: string; readonly highlights: readonly string[] }
export interface Resume { readonly entries: readonly ResumeEntry[]; readonly coreSkills: readonly string[]; readonly designSystemSkills: readonly string[]; readonly education: string }
export interface LedgerEntry { readonly label: string; readonly value: string; readonly href?: string }
export interface CheckoutSlip { readonly availability: { readonly status: AvailabilityStatus; readonly label: string }; readonly ledger: readonly LedgerEntry[] }
export interface LibraryCopy { readonly eyebrow: string; readonly instruction: string; readonly back: string; readonly open: string; readonly shelfPlate: string; readonly volumeCount: string }

export const libraryCopy: LibraryCopy = { eyebrow: 'PRODUCT DESIGNER · FOUNDING DESIGNER', instruction: 'Pull a volume from the shelf', back: 'Back to shelf', open: 'Start reading', shelfPlate: 'Khadijat — Folio Index', volumeCount: '4 Volumes' }

export const volumes: readonly Volume[] = [
  { id: 'vol-01', volume: 'VOL. 01', spine: 'SYSTEMS ARCHITECTURE', subtitle: 'Design system case studies', readTime: '6 min read', contents: 'work', heading: 'Systems that make complex products feel coherent.', description: 'Design-system work focused on shared language, durable foundations, and the decisions behind them.', width: 58, height: 290, color: '#22252A', textColor: '#A1A7B4', typography: 'mono', texture: 'dots', accent: 'lines' },
  { id: 'vol-02', volume: 'VOL. 02', spine: 'Selected Products', subtitle: 'Product case studies', readTime: '8 min read', contents: 'work', heading: 'Products shaped from first principles.', description: 'End-to-end product work, from early architecture through the flows people ultimately use.', width: 66, height: 310, color: '#1C2E24', textColor: '#E2CCA2', typography: 'serif', texture: 'gradient', accent: 'numeral' },
  { id: 'vol-03', volume: 'VOL. 03', spine: 'field notes & life', subtitle: 'Books, gym, cooking, Bambi', readTime: '4 min read', contents: 'notes', heading: 'Things I keep close when I am off the clock.', description: 'A loose scrapbook of books, training, food, home, and Bambi — no forced lesson attached.', width: 50, height: 275, color: '#6E3727', textColor: '#3E1E15', typography: 'italic', texture: 'coarse-dots', accent: 'stitch' },
  { id: 'vol-04', volume: 'VOL. 04', spine: 'AUTHOR & COLOPHON', subtitle: 'About, experience & résumé', readTime: '3 min read', contents: 'resume', heading: 'Engineer by training. Designer by practice.', description: 'My path into product design, the principles I work by, and a practical record of my experience.', width: 46, height: 260, color: '#DCD3C1', textColor: '#1A1A1A', typography: 'sans', texture: 'paper', accent: 'ribbon' },
]

export const projects: readonly Project[] = [
  { id: 'atlas', volumeId: 'vol-01', title: 'A shared language for a growing product', discipline: 'Design systems · Product architecture', problem: 'Fast product growth left teams maintaining conflicting patterns, terminology, and interaction logic.', solution: 'A shared product model and design-system foundation aligned core workflows while preserving deliberate extension points.', constraints: ['Multiple teams shipping in parallel', 'Existing workflows could not pause for migration', 'Patterns needed to work across web and mobile'], systemDecisions: [{ decision: 'Use one shared interaction model with explicit extension points.', rationale: 'Users should not relearn the same task between product areas.', tradeoff: 'Teams gave up some local freedom in exchange for consistency and maintainability.' }], metrics: [{ value: '3', label: 'product teams aligned', source: 'Internal adoption review', verified: false }], visuals: [{ media: { src: '/assets/atlas-system.svg', alt: 'Atlas design-system overview', width: 1600, height: 1000, placeholder: '#cbd6ff' }, caption: 'The shared product and component foundation.', spec: '1600 × 1000 · system overview' }], accent: '#cbd6ff' },
  { id: 'northstar', volumeId: 'vol-02', title: 'Turning an early idea into a product people could trust', discipline: 'Founding design · Zero to one', problem: 'The proposition was promising, but the product mixed education, account activity, and transactions without a clear hierarchy.', solution: 'A focused product model organized the experience around context, confirmation, and user control.', constraints: ['Early-stage proposition', 'Evolving technical scope', 'Trust-sensitive financial decisions'], systemDecisions: [{ decision: 'Design the primary journey before the dashboard.', rationale: 'The home experience should support a resolved product model rather than become a collection of features.', tradeoff: 'A visually impressive dashboard was delayed while the less visible interaction logic was resolved.' }], metrics: [], visuals: [{ media: { src: '/assets/northstar-flow.svg', alt: 'Northstar product flow', width: 1600, height: 1000, placeholder: '#ffb99f' }, caption: 'Context and control remain visible throughout the core flow.', spec: '1600 × 1000 · product flow' }], accent: '#ffb99f' },
]

export const aboutMe: AboutMe = { name: 'Khadijat', role: 'Product Designer & Founding Designer', email: 'hello@example.com', intro: 'I design clear, coherent products from complex ideas.', story: ['I originally studied mechanical engineering, where I learned to understand how different parts affect one another and how to work within real constraints.', 'Product design gave me a more human place to apply that structured way of thinking. Today I work across product architecture, design systems, and end-to-end experiences.'], portrait: { src: '/assets/portrait.jpg', alt: 'Portrait of Khadijat', width: 1200, height: 1500, placeholder: '#bcb6a8' }, principles: [{ title: 'See the whole system', body: 'Map the product, people, and dependencies before narrowing in on screens.' }, { title: 'Make decisions visible', body: 'Use flows and prototypes to help teams evaluate trade-offs together.' }, { title: 'Design for what comes next', body: 'Solve the immediate experience without creating tomorrow’s limitation.' }], hobbies: [{ id: 'books', title: 'Books', caption: 'Physical books, marginal notes, and an optimistic reading list.', media: { src: '/assets/books.jpg', alt: 'Personal book collection', width: 1200, height: 900, placeholder: '#9c4f35' } }, { id: 'training', title: 'Training', caption: 'A few heavy lifts and considerably fewer notifications.', media: { src: '/assets/training.jpg', alt: 'Weight training', width: 1200, height: 900, placeholder: '#7f8581' } }, { id: 'cooking', title: 'Cooking', caption: 'Trying recipes, then changing them halfway through.', media: { src: '/assets/cooking.jpg', alt: 'Food being prepared', width: 1200, height: 900, placeholder: '#d8a16c' } }, { id: 'bambi', title: 'Bambi', caption: 'Household supervisor and frequent meeting guest.', media: { src: '/assets/bambi.jpg', alt: 'Bambi the cat', width: 1200, height: 900, placeholder: '#c5b39b' } }] }

export const resume: Resume = { entries: [{ organization: 'Company / Product', role: 'Founding Product Designer', period: '2023 — Present', summary: 'Led product design from early definition through launch.', highlights: ['Defined product architecture and end-to-end journeys.', 'Established reusable foundations and contribution practices.'] }], coreSkills: ['Product architecture', 'Zero-to-one design', 'Interaction design', 'Product strategy'], designSystemSkills: ['Tokens and foundations', 'Component APIs', 'Governance', 'Documentation'], education: 'B.Eng. Mechanical Engineering' }
export const checkoutSlip: CheckoutSlip = { availability: { status: 'selective', label: 'Available for select opportunities' }, ledger: [{ label: 'Email', value: aboutMe.email, href: `mailto:${aboutMe.email}` }, { label: 'Location', value: 'Lagos, Nigeria' }, { label: 'Portfolio', value: '2026 edition' }] }

export const getProjectsByVolume = (volumeId: string) => projects.filter(project => project.volumeId === volumeId)
export const getVolume = (volumeId: string) => volumes.find(volume => volume.id === volumeId)
