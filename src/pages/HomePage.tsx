import { BookshelfHero } from '../components/home/BookshelfHero'
import { SelectedWork } from '../components/home/SelectedWork'
import { PositioningStatement } from '../components/home/PositioningStatement'
import { AboutTeaser } from '../components/home/AboutTeaser'
export function HomePage({ navigate }: { navigate: (route: string) => void }) { return <main><BookshelfHero navigate={navigate} /><SelectedWork navigate={navigate} /><PositioningStatement /><AboutTeaser navigate={navigate} /></main> }
