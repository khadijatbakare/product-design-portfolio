import { useEffect } from 'react'
import type { CaseStudy } from '../types/content'
import { caseStudies } from '../data/projects'
import { artRegistry } from '../components/artRegistry'
import { CaseStudyBody } from '../components/CaseStudyBody'

function CaseStudyHeader({ study, navigate }: { study: CaseStudy; navigate: (route: string) => void }) {
  const meta = { role: study.role, team: study.team, timeline: study.timeline, platform: study.platform }
  return <section className="case-hero section-wrap"><button className="back-link" onClick={() => navigate('home')}>← Back to work</button><p className="project-type">{study.disciplines.join(' · ').replace(/-/g, ' ').toUpperCase()}</p><h1>{study.title}</h1><p className="case-deck">{study.outcome}</p><div className="case-meta">{Object.entries(meta).map(([label, item]) => <div key={label}><span>{label.toUpperCase()}</span><strong>{item}</strong></div>)}</div></section>
}

function CaseStudyCover({ study }: { study: CaseStudy }) {
  const Art = artRegistry[study.artKey]
  return <div className={`case-cover project-${study.artKey}`} style={{ backgroundColor: study.accent }}><Art /></div>
}

function NextProject({ current, navigate }: { current: CaseStudy; navigate: (route: string) => void }) {
  const next = caseStudies.find(study => study.slug === current.nextSlug) ?? caseStudies[0]
  return <div className="next-project section-wrap"><span>NEXT PROJECT</span><button onClick={() => navigate(next.slug)}>{next.title} →</button></div>
}

export function CaseStudyPage({ study, navigate }: { study: CaseStudy; navigate: (route: string) => void }) {
  useEffect(() => window.scrollTo(0, 0), [study.slug])
  return <main className="case-study"><CaseStudyHeader study={study} navigate={navigate} /><CaseStudyCover study={study} /><CaseStudyBody blocks={study.blocks} /><NextProject current={study} navigate={navigate} /></main>
}
