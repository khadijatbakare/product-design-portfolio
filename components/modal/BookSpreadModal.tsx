'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Mail, X } from 'lucide-react'
import { aboutMe, checkoutSlip, getProjectsByVolume, projects, resume, type ModalView } from '@/data/content'

interface Props {
  readonly activeModal: ModalView
  readonly selectedProject: string | null
  readonly onClose: () => void
  readonly onSelectProject: (id: string) => void
}

export function BookSpreadModal({ activeModal, selectedProject, onClose, onSelectProject }: Props) {
  const project = projects.find((item) => item.id === selectedProject) ?? projects[0]
  const volumeProjects = getProjectsByVolume(project.volumeId)
  const projectIndex = Math.max(0, volumeProjects.findIndex((item) => item.id === project.id))
  const previousProject = volumeProjects[(projectIndex - 1 + volumeProjects.length) % volumeProjects.length]
  const nextProject = volumeProjects[(projectIndex + 1) % volumeProjects.length]

  const title = activeModal === 'work'
    ? project.title
    : activeModal === 'about'
      ? 'The notes beyond the work.'
      : activeModal === 'resume'
        ? 'Author & colophon.'
        : 'Let’s make sense of something together.'

  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.article className="open-book relative grid max-h-[90vh] min-h-[620px] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-md shadow-2xl md:grid-cols-2" initial={{ scale: .92, y: 28 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95, y: 20 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
        <button autoFocus onClick={onClose} className="absolute right-5 top-5 z-10 rounded-full border border-black/20 bg-white/70 p-2" aria-label="Close"><X size={18}/></button>
        <div className="p-10 md:p-16">
          <span className="font-mono text-[10px] uppercase tracking-[.18em]">{activeModal} / Library volume</span>
          <h2 id="modal-title" className="mt-10 font-serif text-5xl leading-none md:text-7xl">{title}</h2>
          {activeModal === 'work' && <p className="mt-8 font-mono text-[10px] uppercase tracking-widest">{project.discipline}</p>}
          {activeModal === 'about' && <div className="mt-10 space-y-6 text-lg leading-8">{aboutMe.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
          {activeModal === 'resume' && <div className="mt-10"><p className="text-lg leading-8">{aboutMe.intro}</p><p className="mt-6 font-mono text-xs uppercase tracking-widest">{resume.education}</p></div>}
          {activeModal === 'contact' && <p className="mt-10 max-w-sm text-lg leading-8">{checkoutSlip.availability.label}. If there is a thoughtful product problem to untangle, I’d like to hear about it.</p>}
        </div>

        <div className="flex flex-col justify-center bg-white/35 p-10 md:p-16">
          {activeModal === 'work' && <>
            <section><p className="font-mono text-[10px] uppercase tracking-widest">The problem</p><p className="mt-3 leading-7">{project.problem}</p></section>
            <section className="mt-8"><p className="font-mono text-[10px] uppercase tracking-widest">What shipped</p><p className="mt-3 leading-7">{project.solution}</p></section>
            <section className="mt-8"><p className="font-mono text-[10px] uppercase tracking-widest">Constraints</p><ul className="mt-3 list-disc space-y-2 pl-5">{project.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></section>
            {project.systemDecisions.map((item) => <section key={item.decision} className="mt-8 border-l-2 border-black/30 pl-5"><p className="font-serif text-2xl">{item.decision}</p><p className="mt-3 text-sm leading-6"><strong>Why:</strong> {item.rationale}</p><p className="mt-2 text-sm leading-6"><strong>Trade-off:</strong> {item.tradeoff}</p></section>)}
            {project.metrics.map((metric) => <div key={metric.label} className="mt-8 border-t border-black/15 pt-5"><span className="font-serif text-4xl">{metric.value}</span><p>{metric.label}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-black/50">{metric.verified ? 'Verified' : 'Unverified'} · {metric.source}</p></div>)}
            {volumeProjects.length > 1 && <div className="mt-12 flex gap-3"><button className="rounded-full border p-3" onClick={() => onSelectProject(previousProject.id)} aria-label="Previous project"><ChevronLeft/></button><button className="rounded-full border p-3" onClick={() => onSelectProject(nextProject.id)} aria-label="Next project"><ChevronRight/></button></div>}
          </>}
          {activeModal === 'about' && <div className="grid gap-5 sm:grid-cols-2">{aboutMe.hobbies.map((hobby, index) => <article key={hobby.id} className={`${index % 3 === 0 ? '-rotate-1' : 'rotate-1'} border border-black/15 bg-[#f8f1e5] p-5 shadow-sm`}><span className="font-mono text-[9px] uppercase tracking-widest">0{index + 1} / {hobby.title}</span><p className="mt-5 font-serif text-2xl">{hobby.caption}</p></article>)}</div>}
          {activeModal === 'resume' && <>
            <div className="space-y-8">{resume.entries.map((entry) => <article key={`${entry.organization}-${entry.period}`}><p className="font-mono text-[10px] uppercase tracking-widest">{entry.period}</p><h3 className="mt-2 font-serif text-3xl">{entry.role}</h3><p className="mt-1 text-sm">{entry.organization}</p><p className="mt-4 leading-7">{entry.summary}</p><ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</div>
            <div className="mt-10 grid gap-6 border-t border-black/15 pt-8 sm:grid-cols-2"><div><p className="font-mono text-[9px] uppercase tracking-widest">Core skills</p><p className="mt-3 text-sm leading-6">{resume.coreSkills.join(' · ')}</p></div><div><p className="font-mono text-[9px] uppercase tracking-widest">Design systems</p><p className="mt-3 text-sm leading-6">{resume.designSystemSkills.join(' · ')}</p></div></div>
            <button onClick={() => window.print()} className="mt-10 flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper"><Download size={16}/> Download résumé</button>
          </>}
          {activeModal === 'contact' && <><a href={`mailto:${aboutMe.email}`} className="flex items-center gap-3 text-xl underline underline-offset-8"><Mail/> {aboutMe.email}</a><dl className="mt-10 space-y-4">{checkoutSlip.ledger.map((entry) => <div key={entry.label} className="flex justify-between gap-6 border-b border-dashed border-black/20 pb-2"><dt className="font-mono text-[10px] uppercase tracking-widest">{entry.label}</dt><dd>{entry.value}</dd></div>)}</dl></>}
        </div>
      </motion.article>
    </motion.div>
  )
}
