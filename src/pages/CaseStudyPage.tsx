import { useEffect } from 'react'
import type { CaseStudy } from '../types/content'
import { ProjectVisual } from '../components/home/ProjectVisual'
import { CaseStudyHeader } from '../components/case-study/CaseStudyHeader'
import { CaseStudyBody } from '../components/case-study/CaseStudyBody'
import { NextProject } from '../components/case-study/NextProject'
export function CaseStudyPage({ study, navigate }: { study: CaseStudy; navigate: (route: string) => void }) { useEffect(() => window.scrollTo(0, 0), [study.slug]); return <main className="case-study"><CaseStudyHeader study={study} navigate={navigate} /><div className="case-cover"><ProjectVisual artKey={study.artKey} accent={study.accent} scale="cover" /></div><CaseStudyBody blocks={study.blocks} /><NextProject current={study} navigate={navigate} /></main> }
