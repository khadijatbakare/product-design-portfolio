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
export type ProjectCategory = 'Design System' | 'Product Architecture' | 'Zero to One' | 'Product Design'
export interface Metric { readonly value: string; readonly label: string; readonly source: string; readonly verified: boolean }
export interface SystemDecision { readonly id: string; readonly decision: string; readonly rationale: string; readonly tradeoff: string }
export interface VisualAsset { readonly id: string; readonly media: MediaAsset; readonly caption: string; readonly spec?: string }
export interface Project {
  readonly slug: string
  readonly title: string
  readonly category: ProjectCategory
  readonly role: string
  readonly timeline: string
  readonly team: string
  readonly platform: string
  readonly summary: string
  readonly problem: readonly string[]
  readonly solution: readonly string[]
  readonly constraints: readonly string[]
  readonly metrics: readonly Metric[]
  readonly systemDecisions: readonly SystemDecision[]
  readonly visualAssets: readonly VisualAsset[]
  readonly reflection: string
  readonly volumeId: string
}
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
  {
    slug: 'atlas', volumeId: 'vol-01', title: 'Giving a growing product one shared language', category: 'Design System', role: 'Lead product designer', timeline: '8 months', team: '3 designers, 8 engineers, product leads', platform: 'Web + mobile',
    summary: 'A component library, token architecture, and documentation site built while the product shipped every two weeks.',
    problem: ['The product had expanded quickly across several teams. Each team solved its own immediate needs, so people relearned familiar interactions from one area to the next and engineers maintained several versions of the same pattern.', 'The inconsistency was easy to see. The harder problem was structural: there was no shared model for how the product should behave, so every new screen restarted a decision that had already been made three times.'],
    solution: ['Built a semantic token architecture, a layered component model, and documentation that gave designers and engineers one shared reference.', 'Introduced the system incrementally so teams could adopt it without interrupting the product’s two-week shipping rhythm.'],
    constraints: ['The product could not stop shipping — nothing could require a coordinated freeze.', 'Two design tools and one codebase had to stay in sync without a full-time systems team.', 'Regulated surfaces meant some copy and states could not change without review.'],
    systemDecisions: [
      { id: 'atlas-semantic-tokens', decision: 'Semantic tokens only. No component may reference a raw colour.', rationale: 'A component bound to a hex value has to be reopened for every theme, brand, or contrast change. Binding to intent instead of value means themes become data.', tradeoff: 'Slower to author, and it forces a naming argument early — but the argument happens once instead of at every new surface.' },
      { id: 'atlas-shared-model', decision: 'One shared interaction model, with defined extension points.', rationale: 'Teams served different user groups and worried that standardisation would remove flexibility they genuinely needed.', tradeoff: 'Teams could reuse the same foundation without forcing every workflow into an identical shape — but a shared model reduced local freedom, so extension points had to be explicit and governed.' },
      { id: 'atlas-two-layer-components', decision: 'Two-layer components: a private base, and the public component built on it.', rationale: 'States and sizing live in the base; the public component only exposes what a consumer should choose. Fixing a state fixes every variant at once.', tradeoff: 'Twice the components to maintain, and the indirection is invisible to consumers — so the pattern needs documenting or the next maintainer will flatten it.' },
    ],
    metrics: [],
    visualAssets: [
      { id: 'atlas-audit', media: { src: '/assets/systems-audit.svg', alt: 'Audit board showing button inconsistencies across the product', width: 1600, height: 1000, placeholder: '#CBD6FF' }, caption: 'Every button in the product, before. The audit that made the case.', spec: 'AUDIT BOARD · 12 VARIANTS ACROSS 4 SURFACES' },
      { id: 'atlas-layers', media: { src: '/assets/systems-layers.svg', alt: 'Three-layer token architecture', width: 1600, height: 1000, placeholder: '#D8E0FF' }, caption: 'Three layers. Teams compose from the middle one.', spec: 'PRIMITIVES → SEMANTIC → COMPONENT' },
      { id: 'atlas-component', media: { src: '/assets/systems-component.svg', alt: 'Component states and sizes across base and public layers', width: 1600, height: 1000, placeholder: '#E4E8F6' }, caption: 'One component, all the way down — every state, every size.', spec: 'BASE + PUBLIC LAYER · 48 VARIANTS' },
    ],
    reflection: 'Governance conversations should have started alongside the audit, not after the first components shipped. Beginning earlier would have made ownership clearer and saved a round of avoidable revision.',
  },
  {
    slug: 'northstar', volumeId: 'vol-02', title: 'Turning an early idea into a product people could trust', category: 'Zero to One', role: 'Founding product designer', timeline: 'Concept to launch', team: 'Founders, product, engineering', platform: 'Responsive web',
    summary: 'A product model, a focused core journey, and the visual foundation the team went on to build from.',
    problem: ['The team saw an opportunity to make an intimidating financial task feel manageable, but early concepts mixed education, account activity, and transactions with no clear hierarchy.', 'Before designing screens, I worked with the founders to define who the product was for, which decisions it needed to support, and the smallest experience that could earn trust.'],
    solution: ['Concept testing showed people did not want another dense financial dashboard. They wanted a plain-language view of where they stood, and one obvious next action.'],
    constraints: ['The proposition and technical scope were evolving together.', 'Financial decisions required unusually clear states and language.', 'A small team needed patterns it could reuse quickly.'],
    systemDecisions: [{ id: 'northstar-journey-first', decision: 'Design the journey before the dashboard.', rationale: 'The dashboard was the most tangible idea in the room, but it depended on product decisions nobody had made yet. Building it first would have locked those decisions in by accident.', tradeoff: 'We delayed the visually impressive artefact to resolve the less visible product logic — a hard thing to sell to a team that wants to see progress.' }],
    metrics: [], visualAssets: [{ id: 'northstar-flow', media: { src: '/assets/northstar-flow.svg', alt: 'Northstar product flow', width: 1600, height: 1000, placeholder: '#FFB99F' }, caption: 'Context and control remain visible throughout the core flow.', spec: 'CORE FLOW · RESPONSIVE WEB · 7 STATES' }], reflection: 'Starting with the journey exposed product questions that a dashboard concept would have hidden. The slower first step made the rest of the product faster to design.',
  },
]

export const aboutMe: AboutMe = { name: 'Khadijat', role: 'Product Designer & Founding Designer', email: 'hello@example.com', intro: 'I design clear, coherent products from complex ideas.', story: ['I originally studied mechanical engineering, where I learned to understand how different parts affect one another and how to work within real constraints.', 'Product design gave me a more human place to apply that structured way of thinking. Today I work across product architecture, design systems, and end-to-end experiences.'], portrait: { src: '/assets/portrait.jpg', alt: 'Portrait of Khadijat', width: 1200, height: 1500, placeholder: '#bcb6a8' }, principles: [{ title: 'See the whole system', body: 'Map the product, people, and dependencies before narrowing in on screens.' }, { title: 'Make decisions visible', body: 'Use flows and prototypes to help teams evaluate trade-offs together.' }, { title: 'Design for what comes next', body: 'Solve the immediate experience without creating tomorrow’s limitation.' }], hobbies: [{ id: 'books', title: 'Books', caption: 'Physical books, marginal notes, and an optimistic reading list.', media: { src: '/assets/books.jpg', alt: 'Personal book collection', width: 1200, height: 900, placeholder: '#9c4f35' } }, { id: 'training', title: 'Training', caption: 'A few heavy lifts and considerably fewer notifications.', media: { src: '/assets/training.jpg', alt: 'Weight training', width: 1200, height: 900, placeholder: '#7f8581' } }, { id: 'cooking', title: 'Cooking', caption: 'Trying recipes, then changing them halfway through.', media: { src: '/assets/cooking.jpg', alt: 'Food being prepared', width: 1200, height: 900, placeholder: '#d8a16c' } }, { id: 'bambi', title: 'Bambi', caption: 'Household supervisor and frequent meeting guest.', media: { src: '/assets/bambi.jpg', alt: 'Bambi the cat', width: 1200, height: 900, placeholder: '#c5b39b' } }] }

export const resume: Resume = { entries: [{ organization: 'Company / Product', role: 'Founding Product Designer', period: '2023 — Present', summary: 'Led product design from early definition through launch.', highlights: ['Defined product architecture and end-to-end journeys.', 'Established reusable foundations and contribution practices.'] }], coreSkills: ['Product architecture', 'Zero-to-one design', 'Interaction design', 'Product strategy'], designSystemSkills: ['Tokens and foundations', 'Component APIs', 'Governance', 'Documentation'], education: 'B.Eng. Mechanical Engineering' }
export const checkoutSlip: CheckoutSlip = { availability: { status: 'selective', label: 'Available for select opportunities' }, ledger: [{ label: 'Email', value: aboutMe.email, href: `mailto:${aboutMe.email}` }, { label: 'Location', value: 'Lagos, Nigeria' }, { label: 'Portfolio', value: '2026 edition' }] }

export const getProjectsByVolume = (volumeId: string) => projects.filter(project => project.volumeId === volumeId)
export const getVolume = (volumeId: string) => volumes.find(volume => volume.id === volumeId)
