import type { CaseStudy } from '../../types/content'
import { getBySlug } from '../../content/projects'
export function NextProject({ current, navigate }: { current: CaseStudy; navigate: (route: string) => void }) { const next = getBySlug(current.nextSlug); if (!next) return null; return <div className="next-project section-wrap"><span>NEXT PROJECT</span><button onClick={() => navigate(next.slug)}>{next.title} →</button></div> }
