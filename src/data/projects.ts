export type ArtKey = 'atlas' | 'northstar'

export type ProjectSummary = {
  slug: string
  number: string
  type: string
  title: string
  outcome: string
  artKey: ArtKey
}

type ProseBlock = {
  type: 'prose'
  label: string
  heading: string
  paragraphs: string[]
}

type FigureBlock = {
  type: 'figure'
  artKey: ArtKey
  caption: string
}

type QuoteBlock = {
  type: 'quote'
  label: string
  quote: string
}

type InsightBlock = {
  type: 'insight'
  label: string
  heading: string
  intro: string
  items: Array<{ label: string; value: string }>
}

type DecisionBlock = {
  type: 'decision'
  label: string
  heading: string
  items: Array<{ label: string; value: string }>
}

type OutcomeBlock = {
  type: 'outcome'
  label: string
  heading: string
  body: string
  note?: string
}

type ReflectionBlock = {
  type: 'reflection'
  heading: string
  body: string
}

export type CaseStudyBlock =
  | ProseBlock
  | FigureBlock
  | QuoteBlock
  | InsightBlock
  | DecisionBlock
  | OutcomeBlock
  | ReflectionBlock

export type CaseStudy = {
  slug: ProjectSummary['slug']
  type: string
  title: string
  deck: string
  meta: {
    role: string
    timeline: string
    scope: string
  }
  coverArtKey: ArtKey
  body: CaseStudyBlock[]
}

export const projectSummaries = [
  {
    slug: 'atlas',
    number: '01',
    type: 'DESIGN SYSTEMS · PRODUCT ARCHITECTURE',
    title: 'Giving a growing product one shared language',
    outcome: 'A new foundation that aligned fragmented workflows, reduced repeated decisions, and helped teams build with confidence.',
    artKey: 'atlas',
  },
  {
    slug: 'northstar',
    number: '02',
    type: 'FOUNDING DESIGN · ZERO TO ONE',
    title: 'Turning an early idea into a product people could trust',
    outcome: 'From the first product model to the core experience: shaping a complex financial tool around clarity and control.',
    artKey: 'northstar',
  },
] satisfies ProjectSummary[]

export const caseStudies = [
  {
    slug: 'atlas',
    type: 'DESIGN SYSTEMS · PRODUCT ARCHITECTURE',
    title: 'Giving a growing product one shared language',
    deck: 'A new foundation that aligned fragmented workflows, reduced repeated decisions, and helped teams build with confidence.',
    meta: { role: 'Lead product designer', timeline: '8 months', scope: 'Web + mobile' },
    coverArtKey: 'atlas',
    body: [
      { type: 'prose', label: '01 / THE SITUATION', heading: 'Growth had created more decisions than the product could hold.', paragraphs: ['The product had expanded quickly across multiple teams. Each team solved immediate needs independently, leaving users to relearn familiar interactions and engineers maintaining several versions of the same patterns.', 'The inconsistency was visible, but the deeper problem was structural: there was no shared model for how the product should behave.'] },
      { type: 'quote', label: 'THE REAL PROBLEM', quote: 'We didn’t just need consistent screens. We needed a shared understanding of the product underneath them.' },
      { type: 'insight', label: '02 / MAKING SENSE OF IT', heading: 'Finding the patterns beneath the interface.', intro: 'I mapped core journeys, audited recurring patterns, and compared how teams had solved similar user needs.', items: [{ label: 'WE STARTED WITH', value: 'A request to standardise the interface.' }, { label: 'WE LEARNED', value: 'Similar workflows used different logic and language.' }, { label: 'SO THE PROBLEM BECAME', value: 'Align product behaviour, not just components.' }] },
      { type: 'decision', label: '03 / A KEY DECISION', heading: 'One shared model, with room for variation.', items: [{ label: 'WHAT MADE IT DIFFICULT', value: 'Teams served different users and worried that standardisation would remove necessary flexibility.' }, { label: 'WHAT I PROPOSED', value: 'A common interaction model with defined extension points for genuine product-specific needs.' }, { label: 'WHAT CHANGED', value: 'Teams could reuse one foundation without forcing every workflow into an identical shape.' }] },
      { type: 'outcome', label: '04 / OUTCOME', heading: 'A clearer experience. A stronger foundation.', body: 'The work gave product and engineering teams a shared language for making decisions. It established reusable patterns, clarified ownership, and created a foundation the product could continue to grow from.', note: 'Replace this section with verified metrics and specific team outcomes before publishing.' },
      { type: 'reflection', heading: 'What I’d do differently.', body: 'Governance conversations should start alongside the initial audit—not after the first components ship. Beginning earlier would make ownership clearer and reduce avoidable revision.' },
    ],
  },
  {
    slug: 'northstar',
    type: 'FOUNDING DESIGN · ZERO TO ONE',
    title: 'Turning an early idea into a product people could trust',
    deck: 'From the first product model to the core experience: shaping a complex financial tool around clarity and control.',
    meta: { role: 'Founding designer', timeline: '0→1 product', scope: 'Strategy + execution' },
    coverArtKey: 'northstar',
    body: [
      { type: 'prose', label: '01 / THE STARTING POINT', heading: 'The idea was promising. The product model was still open.', paragraphs: ['The team saw an opportunity to make an intimidating financial task feel more manageable, but early concepts mixed education, account activity, and transactions without a clear hierarchy.', 'Before designing screens, I worked with the founders to define who the product was for, the decisions it needed to support, and the smallest experience that could earn trust.'] },
      { type: 'quote', label: 'THE PRODUCT QUESTION', quote: 'How might we give people enough context to act confidently—without making every decision feel like homework?' },
      { type: 'insight', label: '02 / DEFINING THE CORE', heading: 'Trust came from control, not more information.', intro: 'Concept testing showed that people did not need another dense financial dashboard. They needed a clear sense of what was happening and what would happen next.', items: [{ label: 'PEOPLE NEEDED', value: 'A plain-language view of their current position.' }, { label: 'THE PRODUCT NEEDED', value: 'A focused path from understanding to action.' }, { label: 'THE TEAM NEEDED', value: 'A model that could grow without changing its centre.' }] },
      { type: 'figure', artKey: 'northstar', caption: 'The core flow keeps context, confirmation, and control visible at each step.' },
      { type: 'decision', label: '03 / A KEY DECISION', heading: 'Design the journey before the dashboard.', items: [{ label: 'WHAT MADE IT DIFFICULT', value: 'The dashboard was the most tangible idea, but it depended on decisions the team had not made yet.' }, { label: 'WHAT I PROPOSED', value: 'Define the primary task and its states first, then let the home experience support that journey.' }, { label: 'WHAT CHANGED', value: 'The product became a coherent flow rather than a collection of promising features.' }] },
      { type: 'outcome', label: '04 / OUTCOME', heading: 'A product direction the team could build from.', body: 'The work translated an early proposition into a testable product model, a focused core journey, and a reusable visual foundation. The team could now discuss scope through a shared experience rather than abstract feature lists.', note: 'Add verified launch, activation, or research outcomes here before publishing.' },
      { type: 'reflection', heading: 'What I’d carry forward.', body: 'In zero-to-one work, visual polish can make an unresolved idea look deceptively complete. The strongest progress came when we kept returning to the product model and treated the interface as evidence of those decisions.' },
    ],
  },
] satisfies CaseStudy[]
