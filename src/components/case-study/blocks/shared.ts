import type { Beat } from '../../../types/content'
export const beatLabels: Record<Beat, string> = { situation: 'THE SITUATION', problem: 'THE PROBLEM', analysis: 'THE ANALYSIS', constraints: 'THE CONSTRAINTS', decision: 'THE DECISION', shipped: 'WHAT SHIPPED', outcome: 'THE OUTCOME', reflection: 'REFLECTION' }
export const beatLabel = (beat: Beat, number: string) => `${number} / ${beatLabels[beat]}`
