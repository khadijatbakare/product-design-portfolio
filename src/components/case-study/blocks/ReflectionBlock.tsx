import type { ReflectionBlock as Reflection } from '../../../types/content'
export function ReflectionBlock(block: Reflection) { return <section className="reflection section-wrap"><div><span className="kicker">REFLECTION</span><h2>{block.heading}</h2></div><p>{block.body}</p></section> }
