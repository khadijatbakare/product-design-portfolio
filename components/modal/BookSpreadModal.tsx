'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Mail, X } from 'lucide-react'
import { aboutMe, checkoutSlip, getProjectsByVolume, libraryCopy, projects, resume, siteIdentity, volumes, type Hobby, type ModalView, type Project } from '@/data/content'

interface Props { readonly activeModal: ModalView; readonly selectedProject: string | null; readonly onClose: () => void; readonly onSelectProject: (slug: string) => void }

function Label({ children }: { readonly children: React.ReactNode }) {
  return <p className="font-mono text-[9px] uppercase tracking-[.18em] text-black/55">{children}</p>
}

const hobbySpan: Record<Hobby['span'], string> = { square: 'min-h-64', tall: 'min-h-96 md:row-span-2', wide: 'min-h-64 sm:col-span-2' }

function WorkArgument({ project }: { readonly project: Project }) {
  return <div className="p-8 md:p-12">
    <Label>{project.category} · {project.role} · {project.timeline}</Label>
    <h2 id="modal-title" className="mt-7 font-serif text-4xl leading-[.95] md:text-6xl">{project.title}</h2>
    <p className="mt-5 font-mono text-[9px] uppercase tracking-widest text-black/50">{project.team} · {project.platform}</p>
    <p className="mt-8 border-y border-black/15 py-6 text-lg leading-8">{project.summary}</p>
    <div className="mt-8 grid gap-7">
      <section><Label>Context / problem</Label><div className="mt-3 space-y-3 leading-7">{project.problem.map((item) => <p key={item}>{item}</p>)}</div></section>
      <section><Label>Constraints</Label><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{project.constraints.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><Label>Solution</Label><ul className="mt-3 space-y-3 leading-7">{project.solution.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><Label>System decisions</Label>{project.systemDecisions.map((item) => <article key={item.id} className="mt-4 border-l-2 border-black/25 pl-4"><h3 className="font-serif text-2xl">{item.decision}</h3><p className="mt-2 text-sm leading-6"><strong>Rationale:</strong> {item.rationale}</p><p className="mt-1 text-sm leading-6"><strong>Trade-off:</strong> {item.tradeoff}</p></article>)}</section>
    </div>
  </div>
}

function WorkEvidence({ project, onSelectProject }: { readonly project: Project; readonly onSelectProject: (slug: string) => void }) {
  const volumeProjects = getProjectsByVolume(project.volumeId)
  const index = Math.max(0, volumeProjects.findIndex((item) => item.slug === project.slug))
  const previous = volumeProjects[(index - 1 + volumeProjects.length) % volumeProjects.length]
  const next = volumeProjects[(index + 1) % volumeProjects.length]
  return <div className="bg-white/35 p-8 md:p-12">
    <Label>Evidence / annotated plates</Label>
    <div className="mt-6 space-y-8">{project.visualAssets.map((asset) => <figure key={asset.id}><div className="overflow-hidden border border-black/15" style={{ background: asset.media.placeholder }}><Image src={asset.media.src} alt={asset.media.alt} width={asset.media.width} height={asset.media.height} className="h-auto w-full"/></div><figcaption className="mt-3 flex items-start justify-between gap-4 text-xs leading-5"><span>{asset.caption}</span>{asset.spec && <span className="max-w-[45%] text-right font-mono text-[8px] uppercase tracking-widest text-black/50">{asset.spec}</span>}</figcaption></figure>)}</div>
    {project.metrics.length > 0 && <section className="mt-10 border-y border-black/15 py-7"><Label>Measured outcome</Label><div className="mt-5 grid gap-5 sm:grid-cols-2">{project.metrics.map((metric) => <article key={metric.label}><p className="font-serif text-5xl">{metric.value}</p><p className="mt-1 text-sm">{metric.label}</p><p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-black/45">Source: {metric.source} · {metric.verified ? 'verified' : 'pending verification'}</p></article>)}</div></section>}
    <section className="mt-10"><Label>Reflection</Label><p className="mt-4 font-serif text-2xl leading-9">{project.reflection}</p></section>
    {volumeProjects.length > 1 && <div className="mt-10 flex gap-3"><button className="rounded-full border p-3" onClick={() => onSelectProject(previous.slug)} aria-label="Previous project"><ChevronLeft/></button><button className="rounded-full border p-3" onClick={() => onSelectProject(next.slug)} aria-label="Next project"><ChevronRight/></button></div>}
  </div>
}

export function BookSpreadModal({ activeModal, selectedProject, onClose, onSelectProject }: Props) {
  const project = projects.find((item) => item.slug === selectedProject) ?? projects[0]
  const volume = activeModal === 'work' ? volumes.find((item) => item.id === project.volumeId) : volumes.find((item) => item.contents === activeModal)
  return <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <motion.article className="open-book relative grid max-h-[92vh] min-h-[620px] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-md shadow-2xl md:grid-cols-2" initial={{ scale: .92, y: 28 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95, y: 20 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
      <button autoFocus onClick={onClose} className="fixed right-7 top-7 z-10 flex items-center gap-2 rounded-full border border-black/20 bg-white/85 px-4 py-2 font-mono text-[9px] uppercase tracking-widest" aria-label={libraryCopy.back}><X size={15}/>{libraryCopy.back}</button>
      {activeModal === 'work' ? <><WorkArgument project={project}/><WorkEvidence project={project} onSelectProject={onSelectProject}/></> : <>
        <div className="p-10 md:p-16"><Label>{activeModal === 'resume' ? aboutMe.kicker : `${activeModal} / Library volume`}</Label><h2 id="modal-title" className="mt-10 font-serif text-5xl leading-none md:text-7xl">{activeModal === 'resume' ? aboutMe.headline.map((line) => <span key={line} className={`block ${line === aboutMe.emphasis ? 'italic' : ''}`}>{line}</span>) : volume?.heading ?? 'Let’s make sense of something together.'}</h2>{volume && <p className="mt-8 max-w-md text-lg leading-8 text-black/65">{activeModal === 'resume' ? aboutMe.intro : volume.description}</p>}{activeModal === 'resume' && <div className="mt-10 space-y-5 text-base leading-7">{aboutMe.story.map((paragraph) => <p key={paragraph} className={paragraph.startsWith('[TODO') ? 'border border-dashed border-black/30 bg-amber-50/60 p-4 font-mono text-xs leading-6' : ''}>{paragraph}</p>)}<p className="font-mono text-xs uppercase tracking-widest">{resume.education}</p></div>}{activeModal === 'contact' && <p className="mt-10 max-w-sm text-lg leading-8">{checkoutSlip.availability.label}. If there is a thoughtful product problem to untangle, I’d like to hear about it.</p>}</div>
        <div className="flex flex-col justify-center bg-white/35 p-10 md:p-16">{activeModal === 'notes' && <div className="grid auto-rows-min gap-5 sm:grid-cols-2">{aboutMe.hobbies.map((hobby, index) => <article key={hobby.id} className={`${hobbySpan[hobby.span]} ${index % 3 === 0 ? '-rotate-1' : 'rotate-1'} relative flex flex-col justify-end overflow-hidden border border-black/15 p-5 shadow-sm`} style={{ backgroundColor: hobby.media.placeholder }} aria-label={hobby.media.alt}><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/10"/><div className="relative text-white"><Label>0{index + 1} / {hobby.label}</Label><h3 className="mt-4 font-serif text-3xl">{hobby.headline}</h3><p className="mt-3 text-sm leading-6 text-white/85">{hobby.caption}</p></div></article>)}</div>}{activeModal === 'resume' && <><div className="space-y-8">{resume.entries.map((entry) => <article key={`${entry.organization}-${entry.period}`}><Label>{entry.period}</Label><h3 className="mt-2 font-serif text-3xl">{entry.role}</h3><p className="mt-1 text-sm">{entry.organization}</p><p className="mt-4 leading-7">{entry.summary}</p><ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</div><div className="mt-10 grid gap-6 border-t border-black/15 pt-8 sm:grid-cols-2"><div><Label>Core skills</Label><p className="mt-3 text-sm leading-6">{resume.coreSkills.join(' · ')}</p></div><div><Label>Design systems</Label><p className="mt-3 text-sm leading-6">{resume.designSystemSkills.join(' · ')}</p></div></div><button onClick={() => window.print()} className="mt-10 flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper"><Download size={16}/> Download résumé</button></>}{activeModal === 'contact' && <><a href={`mailto:${siteIdentity.email}`} className="flex items-center gap-3 text-xl underline underline-offset-8"><Mail/> {siteIdentity.email}</a><dl className="mt-10 space-y-4">{checkoutSlip.ledger.map((entry) => <div key={entry.label} className="flex justify-between gap-6 border-b border-dashed border-black/20 pb-2"><dt><Label>{entry.label}</Label></dt><dd>{entry.value}</dd></div>)}</dl></>}</div>
      </>}
    </motion.article>
  </motion.div>
}
