import { featuredProjects } from '../../content/projects'
import { homeContent } from '../../content/site'
import { SectionHeading } from '../primitives'
import { ProjectCard } from './ProjectCard'
export function SelectedWork({ navigate }: { navigate: (route: string) => void }) { const copy = homeContent.work; return <section className="work-section section-wrap" id="work"><SectionHeading kicker={copy.kicker} headline={copy.headline} support={copy.support} /><div className="project-list">{featuredProjects.map((project, index) => <ProjectCard project={project} index={index} align={index % 2 ? 'right' : 'left'} variant={index === 0 ? 'feature' : 'compact'} onOpen={navigate} key={project.slug} />)}</div></section> }
