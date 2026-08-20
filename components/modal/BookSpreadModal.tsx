"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Mail, X } from "lucide-react";
import {
  aboutMe,
  checkoutSlip,
  libraryCopy,
  playground,
  projects,
  resume,
  siteIdentity,
  volumes,
  type Hobby,
  type ModalView,
  type PlaygroundPiece,
  type Project,
} from "@/data/content";
import { useDialogFocus } from "@/components/hooks/useDialogFocus";
import { StudyDesk } from "@/components/modal/StudyDesk";

interface Props {
  readonly activeModal: ModalView;
  readonly selectedProject: string | null;
  readonly onClose: () => void;
  readonly onSelectProject: (slug: string | null) => void;
  readonly onOpenVolume: (view: ModalView) => void;
}

const folioOrder = ["work", "notes", "resume", "playground"] as const;

function FolioNext({
  current,
  onOpen,
}: {
  readonly current: ModalView;
  readonly onOpen: (view: ModalView) => void;
}) {
  const normalized =
    current === "about" || current === "contact" ? "resume" : current;
  const index = folioOrder.indexOf(normalized);
  const nextView = folioOrder[(index + 1) % folioOrder.length];
  const nextVolume = volumes.find((item) => item.contents === nextView);
  if (!nextVolume) return null;
  return (
    <button
      type="button"
      onClick={() => onOpen(nextView)}
      className="mt-12 ml-auto block border-b border-black/35 pb-1 text-right font-mono text-[9px] uppercase tracking-widest hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <span className="block text-black/45">
        Series progression — book{" "}
        {index + 2 > folioOrder.length ? 1 : index + 2} of {folioOrder.length}
      </span>
      <span className="mt-1 block text-[11px]">{nextVolume.spine} ↗</span>
    </button>
  );
}

function Label({ children }: { readonly children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] uppercase tracking-[.18em] text-black/55">
      {children}
    </p>
  );
}

const hobbySpan: Record<Hobby["span"], string> = {
  square: "min-h-64",
  tall: "min-h-96 md:row-span-2",
  wide: "min-h-64 sm:col-span-2",
};

const playgroundSpan: Record<PlaygroundPiece["span"], string> = {
  square: "aspect-square",
  tall: "min-h-96 md:row-span-2",
  wide: "min-h-64 sm:col-span-2",
};

function WorkIndex({
  onSelectProject,
  onOpenVolume,
}: {
  readonly onSelectProject: (slug: string) => void;
  readonly onOpenVolume: (view: ModalView) => void;
}) {
  return (
    <div className="grid min-h-[620px] md:grid-cols-2">
      <section className="relative overflow-hidden p-10 pt-24 md:p-16 md:pt-28">
        <Label>Vol. 01 / Project index</Label>
        <h2
          id="modal-title"
          className="mt-8 font-serif text-[clamp(2.8rem,8vw,4.5rem)] leading-[.9]"
        >
          Selected work,
          <br />
          <em>filed loosely.</em>
        </h2>
        <p className="mt-8 max-w-md text-lg leading-8 text-black/60">
          Design systems, product architecture, and zero-to-one work. Pull an
          entry to turn the page.
        </p>
        <div className="absolute bottom-12 left-12 hidden -rotate-3 border border-black/15 bg-[#f0e2bd] px-5 py-4 shadow-sm md:block">
          <p className="font-mono text-[9px] uppercase tracking-widest">
            Filed by outcome, not discipline
          </p>
        </div>
      </section>
      <section className="grid content-center gap-7 bg-white/35 p-8 pt-24 md:p-12 md:pt-24">
        {projects.map((project, index) => {
          const visual = project.visualAssets[0];
          return (
            <motion.button
              key={project.slug}
              type="button"
              onClick={() => onSelectProject(project.slug)}
              whileHover={{ rotate: 0, y: -5 }}
              whileFocus={{ rotate: 0, y: -5 }}
              className={`${index % 2 ? "rotate-1" : "-rotate-1"} group grid grid-cols-[112px_1fr] gap-5 border border-black/15 bg-[#fffdf8] p-3 text-left shadow-[0_10px_28px_rgba(45,36,25,.12)] outline-none focus-visible:ring-2 focus-visible:ring-black`}
            >
              <span
                className="relative block min-h-28 overflow-hidden"
                style={{ background: visual?.media.placeholder }}
              >
                {visual && (
                  <Image
                    src={visual.media.src}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-2 top-2 bg-[#fff6d8] px-2 py-1 font-mono text-[8px] uppercase tracking-widest shadow">
                  0{index + 1}
                </span>
              </span>
              <span className="py-2 pr-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-black/50">
                  {project.category} · {project.timeline}
                </span>
                <span className="mt-3 block font-serif text-2xl leading-7">
                  {project.title}
                </span>
                <span className="mt-3 block text-xs leading-5 text-black/55">
                  {project.summary}
                </span>
                <span className="mt-4 block font-mono text-[8px] uppercase tracking-widest">
                  Open entry →
                </span>
              </span>
            </motion.button>
          );
        })}
        <FolioNext current="work" onOpen={onOpenVolume} />
      </section>
    </div>
  );
}

function WorkArgument({ project }: { readonly project: Project }) {
  return (
    <div className="p-8 pt-20 md:py-24 md:pl-12 md:pr-16">
      <Label>
        {project.category} · {project.role} · {project.timeline}
      </Label>
      <h2
        id="modal-title"
        className="mt-7 font-serif text-4xl leading-[.95] md:text-6xl"
      >
        {project.title}
      </h2>
      <p className="mt-5 font-mono text-[9px] uppercase tracking-widest text-black/50">
        {project.team} · {project.platform}
      </p>
      <p className="mt-8 border-y border-black/15 py-6 text-lg leading-8">
        {project.summary}
      </p>
      <div className="mt-8 grid gap-7">
        <section>
          <Label>Context / problem</Label>
          <div className="mt-3 space-y-3 leading-7">
            {project.problem.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section>
          <Label>Constraints</Label>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            {project.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <Label>Solution</Label>
          <ul className="mt-3 space-y-3 leading-7">
            {project.solution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <Label>System decisions</Label>
          {project.systemDecisions.map((item) => (
            <article
              key={item.id}
              className="mt-4 border-l-2 border-black/25 pl-4"
            >
              <h3 className="font-serif text-2xl">{item.decision}</h3>
              <p className="mt-2 text-sm leading-6">
                <strong>Rationale:</strong> {item.rationale}
              </p>
              <p className="mt-1 text-sm leading-6">
                <strong>Trade-off:</strong> {item.tradeoff}
              </p>
            </article>
          ))}
        </section>
        {project.metrics.length > 0 && (
          <section className="border-y border-black/15 py-6">
            <Label>Metrics</Label>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <article key={metric.label}>
                  <p className="font-serif text-5xl">{metric.value}</p>
                  <p className="mt-1 text-sm">{metric.label}</p>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-black/45">
                    Source: {metric.source} ·{" "}
                    {metric.verified ? "verified" : "pending verification"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function WorkEvidence({
  project,
  onSelectProject,
  onOpenVolume,
}: {
  readonly project: Project;
  readonly onSelectProject: (slug: string) => void;
  readonly onOpenVolume: (view: ModalView) => void;
}) {
  const volumeProjects = projects;
  const index = Math.max(
    0,
    volumeProjects.findIndex((item) => item.slug === project.slug),
  );
  const previous =
    volumeProjects[(index - 1 + volumeProjects.length) % volumeProjects.length];
  const next = volumeProjects[(index + 1) % volumeProjects.length];
  return (
    <div className="relative bg-white/35 p-8 pb-24 pt-20 md:pb-24 md:pl-16 md:pr-12 md:pt-24">
      <Label>Evidence / annotated plates</Label>
      <div className="mt-6 space-y-8">
        {project.visualAssets.map((asset) => (
          <figure key={asset.id}>
            <div
              className="overflow-hidden border border-neutral-200/80 shadow-[0_8px_24px_rgba(62,50,36,.08)]"
              style={{ background: asset.media.placeholder }}
            >
              <Image
                src={asset.media.src}
                alt={asset.media.alt}
                width={asset.media.width}
                height={asset.media.height}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-4 text-xs leading-5">
              <span>{asset.caption}</span>
              {asset.spec && (
                <span className="max-w-[45%] text-right font-mono text-[8px] uppercase tracking-widest text-black/50">
                  {asset.spec}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <section className="mt-10">
        <Label>Reflection</Label>
        <p className="mt-4 font-serif text-2xl leading-9">
          {project.reflection}
        </p>
      </section>
      {volumeProjects.length > 1 && (
        <div className="mt-10 flex gap-3">
          <button
            className="rounded-full border p-3"
            onClick={() => onSelectProject(previous.slug)}
            aria-label="Previous project"
          >
            <ChevronLeft />
          </button>
          <button
            className="rounded-full border p-3"
            onClick={() => onSelectProject(next.slug)}
            aria-label="Next project"
          >
            <ChevronRight />
          </button>
        </div>
      )}
      <FolioNext current="work" onOpen={onOpenVolume} />
    </div>
  );
}

export function BookSpreadModal({
  activeModal,
  selectedProject,
  onClose,
  onSelectProject,
  onOpenVolume,
}: Props) {
  const dialogRef = useRef<HTMLElement>(null);
  useDialogFocus(dialogRef, onClose);
  const project = projects.find((item) => item.slug === selectedProject);
  const isAbout = activeModal === "about";
  const volume =
    activeModal === "work"
      ? volumes.find((item) => item.contents === "work")
      : volumes.find(
          (item) => item.contents === (isAbout ? "resume" : activeModal),
        );
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-0 backdrop-blur-md sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.98,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.article
        ref={dialogRef}
        className="open-book relative grid h-[100dvh] max-h-[100dvh] w-full max-w-6xl grid-cols-1 overflow-y-auto overscroll-contain shadow-2xl sm:h-auto sm:max-h-[92vh] sm:min-h-[620px] sm:rounded-md md:grid-cols-2"
        initial={{ scale: 0.92, y: 28 }}
        animate={{ scale: 1, y: 0 }}
        exit={{
          opacity: 0,
          scale: 0.98,
          y: 8,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <nav
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-black/10 bg-[#FAF8F4]/95 px-5 py-3 backdrop-blur"
          aria-label="Book controls"
        >
          <button
            autoFocus
            onClick={() =>
              activeModal === "work" && selectedProject
                ? onSelectProject(null)
                : onClose()
            }
            className="font-mono text-[9px] uppercase tracking-widest"
          >
            ←{" "}
            {activeModal === "work" && selectedProject
              ? "Project index"
              : libraryCopy.back}
          </button>
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download="Khadijat-Bakare-Resume.pdf"
              className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest sm:flex"
            >
              <Download size={13} /> Download résumé
            </a>
            <button
              onClick={onClose}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"
              aria-label="Close book"
            >
              <X size={14} /> Close
            </button>
          </div>
        </nav>
        {activeModal === "work" ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project?.slug ?? "work-index"}
              className="col-span-2 grid md:grid-cols-2"
              initial={{
                opacity: 0,
                rotateY: -18,
                x: 70,
                transformOrigin: "left center",
              }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{
                opacity: 0,
                rotateY: 14,
                x: -45,
                transformOrigin: "right center",
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1400 }}
            >
              {project ? (
                <>
                  <WorkArgument project={project} />
                  <WorkEvidence
                    project={project}
                    onSelectProject={(slug) => onSelectProject(slug)}
                    onOpenVolume={onOpenVolume}
                  />
                </>
              ) : (
                <div className="col-span-2">
                  <WorkIndex
                    onSelectProject={(slug) => onSelectProject(slug)}
                    onOpenVolume={onOpenVolume}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <div className="p-10 pt-20 md:p-16 md:pt-24">
              <Label>
                {activeModal === "resume" || isAbout
                  ? aboutMe.kicker
                  : `${activeModal} / Library volume`}
              </Label>
              <h2
                id="modal-title"
                className="mt-10 font-serif text-5xl leading-none md:text-7xl"
              >
                {activeModal === "resume" || isAbout
                  ? aboutMe.headline.map((line) => (
                      <span
                        key={line}
                        className={`block ${line === aboutMe.emphasis ? "italic" : ""}`}
                      >
                        {line}
                      </span>
                    ))
                  : (volume?.heading ??
                    "Let’s make sense of something together.")}
              </h2>
              {volume && (
                <p className="mt-8 max-w-md text-lg leading-8 text-black/65">
                  {activeModal === "resume" || isAbout
                    ? aboutMe.intro
                    : volume.description}
                </p>
              )}
              {isAbout && (
                <div className="mt-10 space-y-5 text-base leading-7">
                  {aboutMe.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <section className="border-t border-black/15 pt-6">
                    <Label>Education</Label>
                    {resume.education.map((entry) => (
                      <div key={entry.id} className="mt-3">
                        <p className="font-medium">{entry.qualification}</p>
                        <p className="text-sm text-black/55">
                          {entry.school} · {entry.period}
                        </p>
                      </div>
                    ))}
                  </section>
                </div>
              )}
              {activeModal === "contact" && (
                <p className="mt-10 max-w-sm text-lg leading-8">
                  {checkoutSlip.availability.label}. If there is a thoughtful
                  product problem to untangle, I’d like to hear about it.
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center bg-white/35 p-10 pt-20 md:p-16 md:pt-24">
              {activeModal === "notes" && (
                <div>
                  <StudyDesk />
                  <div className="mt-10 grid auto-rows-min gap-5 sm:grid-cols-2">
                    {aboutMe.hobbies.map((hobby, index) => (
                      <article
                        key={hobby.id}
                        className={`${hobbySpan[hobby.span]} ${index % 3 === 0 ? "-rotate-1" : "rotate-1"} scrapbook-tile relative flex flex-col justify-end overflow-hidden border border-black/15 p-5`}
                        style={{ backgroundColor: hobby.media.placeholder }}
                        aria-label={hobby.media.alt}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/10" />
                        <div className="relative text-white">
                          <Label>
                            0{index + 1} / {hobby.label}
                          </Label>
                          <h3 className="mt-4 font-serif text-3xl">
                            {hobby.headline}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-white/85">
                            {hobby.caption}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
              {activeModal === "playground" && (
                <div className="grid auto-rows-min gap-5 sm:grid-cols-2">
                  {playground.length ? (
                    playground.map((piece, index) => (
                      <figure
                        key={piece.id}
                        className={`${playgroundSpan[piece.span]} ${index % 2 ? "rotate-1" : "-rotate-1"} relative overflow-hidden border border-black/15 bg-white p-3 shadow-md`}
                      >
                        <div
                          className="relative h-full min-h-56 overflow-hidden"
                          style={{ background: piece.media.placeholder }}
                        >
                          <Image
                            src={piece.media.src}
                            alt={piece.media.alt}
                            fill
                            sizes="(min-width: 768px) 35vw, 80vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="p-3 pb-1">
                          <Label>0{index + 1} / Visual study</Label>
                          <h3 className="mt-2 font-serif text-2xl">
                            {piece.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-black/55">
                            {piece.note}
                          </p>
                        </figcaption>
                      </figure>
                    ))
                  ) : (
                    <div className="col-span-2 rotate-1 border border-dashed border-black/25 bg-[#fffdf8] p-10 shadow-sm">
                      <Label>Drawer open / awaiting first study</Label>
                      <p className="mt-5 font-serif text-4xl leading-tight">
                        Loose screens belong here, without being forced into a
                        case study.
                      </p>
                      <p className="mt-5 max-w-md leading-7 text-black/55">
                        Add a title, a short note, and an image to the
                        playground collection when a visual is ready to keep.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {isAbout && (
                <div className="space-y-8">
                  <div>
                    <Label>Working principles</Label>
                    <h3 className="mt-3 font-serif text-4xl">
                      How I approach the work.
                    </h3>
                  </div>
                  {aboutMe.principles.map((principle, index) => (
                    <article
                      key={principle.id}
                      className={`${index % 2 ? "rotate-1" : "-rotate-1"} border border-black/15 bg-[#fffdf8] p-6 shadow-sm`}
                    >
                      <Label>0{index + 1}</Label>
                      <h3 className="mt-3 font-serif text-3xl">
                        {principle.title}
                      </h3>
                      <p className="mt-3 leading-7 text-black/60">
                        {principle.body}
                      </p>
                    </article>
                  ))}
                </div>
              )}
              {activeModal === "resume" && (
                <>
                  <div>
                    <Label>{resume.label}</Label>
                    <h3 className="mt-3 font-serif text-4xl">
                      {resume.headline}
                    </h3>
                    <p className="mt-4 leading-7 text-black/65">
                      {resume.summary}
                    </p>
                  </div>
                  <div className="mt-10 space-y-8">
                    {resume.experience.map((entry) => (
                      <article key={entry.id}>
                        <Label>
                          {entry.period} · {entry.location}
                        </Label>
                        <h3 className="mt-2 font-serif text-3xl">
                          {entry.role}
                        </h3>
                        <p className="mt-1 text-sm">{entry.company}</p>
                        <p className="mt-4 leading-7">{entry.summary}</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                          {entry.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                  <div className="mt-10 border-t border-black/15 pt-8">
                    <Label>Core skills</Label>
                    <p className="mt-3 text-sm leading-6">
                      {resume.coreSkills.join(" · ")}
                    </p>
                  </div>
                  <div className="mt-8">
                    <Label>Design-system depth</Label>
                    <div className="mt-4 space-y-4">
                      {resume.designSystemSkills.map((skill) => (
                        <article
                          key={skill.id}
                          className="grid grid-cols-[1fr_auto] gap-x-4"
                        >
                          <p className="font-medium">{skill.label}</p>
                          <span className="font-mono text-[8px] uppercase tracking-widest">
                            {skill.proficiency}
                          </span>
                          <p className="col-span-2 mt-1 text-sm leading-6 text-black/55">
                            {skill.note}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8">
                    <Label>Tools</Label>
                    <p className="mt-3 text-sm leading-6">
                      {resume.tools.join(" · ")}
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="mt-10 flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper"
                  >
                    <Download size={16} /> {resume.downloadLabel}
                  </button>
                </>
              )}
              {activeModal === "contact" && (
                <>
                  <a
                    href={`mailto:${siteIdentity.email}`}
                    className="flex items-center gap-3 text-xl underline underline-offset-8"
                  >
                    <Mail /> {siteIdentity.email}
                  </a>
                  <dl className="mt-10 space-y-4">
                    {checkoutSlip.ledger.map((entry) => (
                      <div
                        key={entry.label}
                        className="flex justify-between gap-6 border-b border-dashed border-black/20 pb-2"
                      >
                        <dt>
                          <Label>{entry.label}</Label>
                        </dt>
                        <dd>{entry.stamp}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
              <FolioNext current={activeModal} onOpen={onOpenVolume} />
            </div>
          </>
        )}
      </motion.article>
    </motion.div>
  );
}
