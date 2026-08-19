import { caseStudies } from './data/projects'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { CaseStudyPage } from './pages/CaseStudyPage'

export function RouteOutlet({ route, navigate }: { route: string; navigate: (route: string) => void }) {
  const study = caseStudies.find(item => item.slug === route)
  if (study) return <CaseStudyPage study={study} navigate={navigate} />
  if (route === 'about') return <AboutPage />
  return <HomePage navigate={navigate} />
}
