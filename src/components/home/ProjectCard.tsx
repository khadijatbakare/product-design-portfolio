import type { ProjectSummary } from '../../types/content'
import { ProjectVisual } from './ProjectVisual'

export interface ProjectCardProps {
  readonly project: ProjectSummary
  readonly variant?: 'feature' | 'compact'
  readonly align?: 'left' | 'right'
  readonly index: number
  readonly onOpen: (slug: string) => void
}

export function ProjectMeta({ project, index, onOpen }: Pick<ProjectCardProps, 'project' | 'index' | 'onOpen'>) {
  return <div className="project-copy"><div className="project-number">{String(index + 1).padStart(2, '0')}</div><div><p className="project-type">{project.disciplines.join(' · ').replace(/-/g, ' ').toUpperCase()}</p><h3>{project.title}</h3><p className="project-summary">{project.outcome}</p><button className="text-link" onClick={() => onOpen(project.slug)}>Read the case study →</button></div></div>
}

export function ProjectCard({ project, onOpen, index, variant = 'feature', align = 'left' }: ProjectCardProps) {
  return <article className={`project project-${variant} project-align-${align}`}>
    <button className="project-visual" onClick={() => onOpen(project.slug)} aria-label={`Read ${project.title}`}><ProjectVisual artKey={project.artKey} accent={project.accent} /><span className="view-project">View case study ↗</span></button>
    <ProjectMeta project={project} index={index} onOpen={onOpen} />
  </article>
}
