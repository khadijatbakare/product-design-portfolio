import type { ProjectSummary } from '../data/projects'
import { artRegistry } from './artRegistry'

type ProjectCardProps = {
  project: ProjectSummary
  onOpen: (slug: string) => void
  variant?: 'feature' | 'compact'
}

export function ProjectVisual({ project, onOpen }: Omit<ProjectCardProps, 'variant'>) {
  const Art = artRegistry[project.artKey]
  return <button className={`project-visual project-${project.artKey}`} onClick={() => onOpen(project.slug)} aria-label={`Read ${project.title}`}><Art /><span className="view-project">View case study ↗</span></button>
}

export function ProjectMeta({ project, onOpen }: Omit<ProjectCardProps, 'variant'>) {
  return <div className="project-copy"><div className="project-number">{project.number}</div><div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-summary">{project.outcome}</p><button className="text-link" onClick={() => onOpen(project.slug)}>Read the case study →</button></div></div>
}

export function ProjectCard({ project, onOpen, variant = 'feature' }: ProjectCardProps) {
  return <article className={`project project-${variant}`}>
    <ProjectVisual project={project} onOpen={onOpen} />
    <ProjectMeta project={project} onOpen={onOpen} />
  </article>
}
