import { bio } from '../content/bio'
import { homeContent, siteConfig } from '../content/site'
import { HeroSection } from '../components/home/HeroSection'
import { SelectedWork } from '../components/home/SelectedWork'
import { PositioningStatement } from '../components/home/PositioningStatement'
import { AboutTeaser } from '../components/home/AboutTeaser'

export function HomePage({ navigate }: { navigate: (route: string) => void }) {
  return <main><HeroSection {...homeContent.hero} intro={bio.short} availability={siteConfig.availability} onScrollToWork={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} /><SelectedWork navigate={navigate} /><PositioningStatement /><AboutTeaser navigate={navigate} /></main>
}
