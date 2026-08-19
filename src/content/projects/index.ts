import type { CaseStudy, ProjectSummary } from '../../types/content'
import { atlas } from './atlas'
import { northstar } from './northstar'

export const projects = [atlas, northstar] satisfies readonly CaseStudy[]
export const projectSummaries: readonly ProjectSummary[] = projects.map(({ blocks: _blocks, role: _role, team: _team, timeline: _timeline, platform: _platform, nextSlug: _nextSlug, ...summary }) => summary)
export const getBySlug = (slug: string) => projects.find(project => project.slug === slug)
export const featuredProjects = projectSummaries.filter(project => project.featured).sort((a, b) => a.order - b.order)
