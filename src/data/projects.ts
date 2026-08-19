import type { CaseStudy, ProjectSummary } from '../types/content'

export const projectSummaries = [
  { slug: 'atlas', title: 'Giving a growing product one shared language', outcome: 'A new foundation that aligned fragmented workflows, reduced repeated decisions, and helped teams build with confidence.', disciplines: ['design-system', 'product-architecture'], year: '2025', status: 'shipped', artKey: 'atlas', accent: '#cbd6ff', featured: true, order: 1 },
  { slug: 'northstar', title: 'Turning an early idea into a product people could trust', outcome: 'From the first product model to the core experience: shaping a complex financial tool around clarity and control.', disciplines: ['founding-design', 'product-design'], year: '2024', status: 'concept', artKey: 'northstar', accent: '#ffb99f', featured: true, order: 2 },
] satisfies readonly ProjectSummary[]

export const caseStudies = [
  {
    ...projectSummaries[0], role: 'Lead product designer', team: '3 designers, 8 engineers, product leads', timeline: '8 months', platform: 'Web + mobile', nextSlug: 'northstar',
    blocks: [
      { id: 'atlas-situation', kind: 'prose', beat: 'situation', heading: 'Growth had created more decisions than the product could hold.', paragraphs: ['The product had expanded quickly across multiple teams. Each team solved immediate needs independently, leaving users to relearn familiar interactions and engineers maintaining several versions of the same patterns.', 'The inconsistency was visible, but the deeper problem was structural: there was no shared model for how the product should behave.'] },
      { id: 'atlas-problem', kind: 'quote', beat: 'problem', label: 'THE REAL PROBLEM', quote: 'We didn’t just need consistent screens. We needed a shared understanding of the product underneath them.' },
      { id: 'atlas-analysis', kind: 'insight', beat: 'analysis', heading: 'Finding the patterns beneath the interface.', intro: 'I mapped core journeys, audited recurring patterns, and compared how teams had solved similar user needs.', insights: [{ label: 'WE STARTED WITH', statement: 'A request to standardise the interface.' }, { label: 'WE LEARNED', statement: 'Similar workflows used different logic and language.' }, { label: 'SO THE PROBLEM BECAME', statement: 'Align product behaviour, not just components.' }] },
      { id: 'atlas-decision', kind: 'decision', beat: 'decision', heading: 'One shared model, with room for variation.', difficulty: 'Teams served different users and worried that standardisation would remove necessary flexibility.', proposal: 'A common interaction model with defined extension points for genuine product-specific needs.', tradeoff: 'A shared model reduced local freedom, so extension points had to be explicit and governed.' },
      { id: 'atlas-outcome', kind: 'outcome', beat: 'outcome', heading: 'A clearer experience. A stronger foundation.', body: 'The work gave product and engineering teams a shared language for making decisions. It established reusable patterns, clarified ownership, and created a foundation the product could continue to grow from.', unverifiedNote: 'Replace this section with verified metrics and specific team outcomes before publishing.' },
      { id: 'atlas-reflection', kind: 'reflection', beat: 'reflection', heading: 'What I’d do differently.', body: 'Governance conversations should start alongside the initial audit—not after the first components ship. Beginning earlier would make ownership clearer and reduce avoidable revision.' },
    ],
  },
  {
    ...projectSummaries[1], role: 'Founding designer', team: 'Founders, product, and engineering', timeline: '0→1 product', platform: 'Strategy + execution', nextSlug: 'atlas',
    blocks: [
      { id: 'northstar-situation', kind: 'prose', beat: 'situation', heading: 'The idea was promising. The product model was still open.', paragraphs: ['The team saw an opportunity to make an intimidating financial task feel more manageable, but early concepts mixed education, account activity, and transactions without a clear hierarchy.', 'Before designing screens, I worked with the founders to define who the product was for, the decisions it needed to support, and the smallest experience that could earn trust.'] },
      { id: 'northstar-problem', kind: 'quote', beat: 'problem', label: 'THE PRODUCT QUESTION', quote: 'How might we give people enough context to act confidently—without making every decision feel like homework?' },
      { id: 'northstar-analysis', kind: 'insight', beat: 'analysis', heading: 'Trust came from control, not more information.', intro: 'Concept testing showed that people did not need another dense financial dashboard.', insights: [{ label: 'PEOPLE NEEDED', statement: 'A plain-language view of their current position.' }, { label: 'THE PRODUCT NEEDED', statement: 'A focused path from understanding to action.' }, { label: 'THE TEAM NEEDED', statement: 'A model that could grow without changing its centre.' }] },
      { id: 'northstar-decision', kind: 'decision', beat: 'decision', heading: 'Design the journey before the dashboard.', difficulty: 'The dashboard was the most tangible idea, but it depended on decisions the team had not made yet.', proposal: 'Define the primary task and its states first, then let the home experience support that journey.', tradeoff: 'We delayed a visually impressive dashboard to resolve the less visible product logic first.' },
      { id: 'northstar-outcome', kind: 'outcome', beat: 'outcome', heading: 'A product direction the team could build from.', body: 'The work translated an early proposition into a testable product model, a focused core journey, and a reusable visual foundation.', unverifiedNote: 'Add verified launch, activation, or research outcomes here before publishing.' },
      { id: 'northstar-reflection', kind: 'reflection', beat: 'reflection', heading: 'What I’d carry forward.', body: 'In zero-to-one work, visual polish can make an unresolved idea look deceptively complete. The strongest progress came when we kept returning to the product model and treated the interface as evidence of those decisions.' },
    ],
  },
] satisfies readonly CaseStudy[]
