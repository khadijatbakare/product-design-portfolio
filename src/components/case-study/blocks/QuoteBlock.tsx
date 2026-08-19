import type { QuoteBlock as Quote } from '../../../types/content'
export function QuoteBlock(block: Quote) { return <section className="case-quote section-wrap"><span>{block.label}</span><blockquote>{block.quote}</blockquote></section> }
