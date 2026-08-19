import React from 'react'
import { SiteHeader } from './components/chrome/SiteHeader'
import { SiteFooter } from './components/chrome/SiteFooter'
import { useRoute } from './routing/useRoute'
import { getBySlug } from './content/projects'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ResumePage } from './pages/ResumePage'

function RouteOutlet({ route, navigate }: { route: string; navigate: (route: string) => void }) {
  const study = getBySlug(route)
  if (study) return <CaseStudyPage study={study} navigate={navigate} />
  if (route === 'about') return <AboutPage />
  if (route === 'resume') return <ResumePage />
  return <HomePage navigate={navigate} />
}

export default function App() {
  const { route, navigate } = useRoute()
  return <div className="app">
    <SiteHeader route={route} navigate={navigate} />
    <RouteOutlet route={route} navigate={navigate} />
    <SiteFooter />
  </div>
}
