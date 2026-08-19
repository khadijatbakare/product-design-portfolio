import { useEffect } from 'react'
import type { CaseStudy } from '../data/projects'
import { caseStudies } from '../data/projects'
import { artRegistry } from '../components/artRegistry'
import { CaseStudyBody } from '../components/CaseStudyBody'

function CaseStudyHeader({ study, navigate }: { study: CaseStudy; navigate: (route: string) => void }) {
  return <section className="case-hero section-wrap"><button className="back-link" onClick={() => navigate('home')}>← Back to work</button><p className="project-type">{study.type}</p><h1>{study.title}</h1><p className="case-deck">{study.deck}</p><div className="case-meta">{Object.entries(study.meta).map(([label, item]) => <div key={label}><span>{label.toUpperCase()}</span><strong>{item}</strong></div>)}</div></section>
}

function CaseStudyCover({ study }: { study: CaseStudy }) {
  const Art = artRegistry[study.coverArtKey]
  return <div className={`case-cover project-${study.coverArtKey}`}><Art /></div>
}

function NextProject({ current, navigate }: { current: CaseStudy; navigate: (route: string) => void }) {
  const currentIndex = caseStudies.findIndex(study => study.slug === current.slug)
  const next = caseStudies[(currentIndex + 1) % caseStudies.length]
  return <div className="next-project section-wrap"><span>NEXT PROJECT</span><button onClick={() => navigate(next.slug)}>{next.title} →</button></div>
}

export function CaseStudyPage({ study, navigate }: { study: CaseStudy; navigate: (route: string) => void }) {
  useEffect(() => window.scrollTo(0, 0), [study.slug])
  return <main className="case-study"><CaseStudyHeader study={study} navigate={navigate} /><CaseStudyCover study={study} /><CaseStudyBody blocks={study.body} /><NextProject current={study} navigate={navigate} /></main>
}
