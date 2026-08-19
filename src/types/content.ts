/** Every image on the site. Dimensions are required so nothing shifts on load. */
export interface MediaAsset {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  /** Average colour or tiny base64, painted while the file loads. */
  readonly placeholder?: string
}

/** A link that knows how it should behave, so components don't have to guess. */
export type LinkKind = 'route' | 'external' | 'mail' | 'file'
export interface NavItem { readonly label: string; readonly href: string; readonly kind: LinkKind; readonly emphasis?: boolean }

export type AvailabilityStatus = 'open' | 'selective' | 'closed'
export interface Availability { readonly status: AvailabilityStatus; readonly label: string }
export interface SiteConfig {
  readonly name: string; readonly wordmark: string; readonly role: string; readonly email: string
  readonly nav: readonly NavItem[]; readonly socials: readonly NavItem[]
  readonly availability?: Availability; readonly resumeUrl?: string
}

export interface Bio {
  readonly oneLine: string; readonly short: string; readonly long: string
  readonly narrative: readonly string[]; readonly portrait: MediaAsset
}

export type Discipline = 'design-system' | 'product-architecture' | 'founding-design' | 'product-design'
export type ProjectStatus = 'shipped' | 'in-progress' | 'concept' | 'nda'
export type ArtKey = 'atlas' | 'northstar'
export interface ProjectSummary {
  readonly slug: string; readonly title: string; readonly outcome: string
  readonly disciplines: readonly Discipline[]; readonly year: string; readonly status: ProjectStatus
  readonly artKey: ArtKey; readonly accent: string; readonly featured: boolean; readonly order: number
}
export interface CaseStudy extends ProjectSummary {
  readonly role: string; readonly team: string; readonly timeline: string; readonly platform: string
  readonly blocks: readonly CaseStudyBlock[]; readonly nextSlug: string
}

export type Beat = 'situation' | 'problem' | 'analysis' | 'constraints' | 'decision' | 'shipped' | 'outcome' | 'reflection'
interface BlockBase { readonly id: string; readonly beat: Beat }
export interface ProseBlock extends BlockBase { readonly kind: 'prose'; readonly heading: string; readonly paragraphs: readonly string[] }
export interface FigureBlock extends BlockBase { readonly kind: 'figure'; readonly media: MediaAsset; readonly caption?: string; readonly bleed: 'full' | 'wide' | 'inline' }
export interface QuoteBlock extends BlockBase { readonly kind: 'quote'; readonly quote: string; readonly label: string }
export interface InsightBlock extends BlockBase { readonly kind: 'insight'; readonly heading: string; readonly intro?: string; readonly insights: readonly Insight[] }
export interface Insight { readonly label: string; readonly statement: string }
export interface DecisionBlock extends BlockBase {
  readonly kind: 'decision'; readonly heading: string; readonly difficulty: string
  readonly proposal: string; readonly tradeoff: string; readonly figure?: MediaAsset
}
export interface OutcomeBlock extends BlockBase {
  readonly kind: 'outcome'; readonly heading: string; readonly body: string
  readonly metrics?: readonly Metric[]; readonly unverifiedNote?: string
}
export interface Metric { readonly value: string; readonly label: string; readonly source: string }
export interface ReflectionBlock extends BlockBase { readonly kind: 'reflection'; readonly heading: string; readonly body: string }
export type CaseStudyBlock = ProseBlock | FigureBlock | QuoteBlock | InsightBlock | DecisionBlock | OutcomeBlock | ReflectionBlock

export type TileSpan = 'square' | 'tall' | 'wide'
export interface PersonalTile {
  readonly id: string; readonly label: string; readonly headline: string; readonly caption: string
  readonly media: MediaAsset; readonly span: TileSpan
}
export type ReadingStatus = 'reading' | 'next' | 'finished' | 'abandoned'
export interface Book {
  readonly id: string; readonly title: string; readonly author: string; readonly status: ReadingStatus
  readonly spineColor: string; readonly cover?: MediaAsset; readonly note?: string; readonly finishedOn?: string
}
export interface Principle { readonly id: string; readonly title: string; readonly body: string }
