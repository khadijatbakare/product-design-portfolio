import type { CaseStudyBlock } from '../../types/content'
import { ProseBlock } from './blocks/ProseBlock'
import { FigureBlock } from './blocks/FigureBlock'
import { QuoteBlock } from './blocks/QuoteBlock'
import { InsightBlock } from './blocks/InsightBlock'
import { DecisionBlock } from './blocks/DecisionBlock'
import { OutcomeBlock } from './blocks/OutcomeBlock'
import { ReflectionBlock } from './blocks/ReflectionBlock'
export interface CaseStudyBodyProps { readonly blocks: readonly CaseStudyBlock[] }
function assertNever(value: never): never { throw new Error(`Unhandled block: ${JSON.stringify(value)}`) }
export function CaseStudyBody({ blocks }: CaseStudyBodyProps) { return <>{blocks.map((block, index) => { const number = String(index + 1).padStart(2, '0'); switch (block.kind) { case 'prose': return <ProseBlock key={block.id} number={number} {...block} />; case 'figure': return <FigureBlock key={block.id} {...block} />; case 'quote': return <QuoteBlock key={block.id} {...block} />; case 'insight': return <InsightBlock key={block.id} number={number} {...block} />; case 'decision': return <DecisionBlock key={block.id} number={number} {...block} />; case 'outcome': return <OutcomeBlock key={block.id} number={number} {...block} />; case 'reflection': return <ReflectionBlock key={block.id} {...block} />; default: return assertNever(block) } })}</> }
