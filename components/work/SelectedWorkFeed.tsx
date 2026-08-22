"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/content";

interface SelectedWorkFeedProps {
  readonly onOpenProject: (slug: string) => void;
}

function CatalogCard({
  project,
  index,
  total,
  onOpen,
}: {
  readonly project: Project;
  readonly index: number;
  readonly total: number;
  readonly onOpen: (slug: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, 0.76]);
  const preview = project.visualAssets[0];
  const verifiedMetrics = project.metrics.filter((metric) => metric.verified);

  return (
    <article
      ref={sectionRef}
      className="relative min-h-[92vh]"
      aria-labelledby={`project-${project.slug}-title`}
    >
      <motion.div
        className="sticky top-20 overflow-hidden border border-[#dcd5c9] bg-[#faf7f2] text-[#23201d] shadow-[0_18px_55px_rgba(45,36,25,.12)] md:top-24"
        style={{
          scale: reducedMotion ? 1 : scale,
          opacity: reducedMotion ? 1 : opacity,
          zIndex: index + 1,
        }}
      >
        <div className="grid min-h-[72vh] md:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col p-6 sm:p-9 md:p-12">
            <div className="flex items-center justify-between border-b border-[#dcd5c9] pb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#625b52]">
              <span>
                [{String(index + 1).padStart(2, "0")}] / {String(total).padStart(2, "0")}
              </span>
              <span>{project.category}</span>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[.16em] text-[#625b52]">
              Selected work · {project.timeline}
            </p>
            <h2
              id={`project-${project.slug}-title`}
              className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] sm:text-5xl"
            >
              {project.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/65">
              {project.summary}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-y border-[#dcd5c9] py-6">
              {verifiedMetrics.length > 0 ? (
                verifiedMetrics.slice(0, 4).map((metric) => (
                  <div key={metric.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-[#625b52]">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-serif text-2xl">{metric.value}</dd>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-[#625b52]">Role</dt>
                    <dd className="mt-1 text-sm leading-6">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-[#625b52]">Platform</dt>
                    <dd className="mt-1 text-sm leading-6">{project.platform}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-[#625b52]">Timeline</dt>
                    <dd className="mt-1 text-sm leading-6">{project.timeline}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-[#625b52]">Decisions documented</dt>
                    <dd className="mt-1 font-serif text-2xl">{project.systemDecisions.length}</dd>
                  </div>
                </>
              )}
            </dl>

            <a
              href={`#case-study-${project.slug}`}
              onClick={(event) => {
                event.preventDefault();
                onOpen(project.slug);
              }}
              className="mt-8 flex min-h-11 w-fit items-center gap-2 border-b border-[#23201d] font-mono text-[10px] uppercase tracking-[.14em]"
            >
              Read case study <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div
            className="relative min-h-72 border-t border-[#dcd5c9] md:min-h-full md:border-l md:border-t-0"
            style={{ background: preview?.media.placeholder ?? "#e8e1d5" }}
          >
            {preview && (
              <Image
                src={preview.media.src}
                alt={preview.media.alt}
                fill
                sizes="(min-width: 768px) 48vw, 100vw"
                className="object-cover p-5 sm:p-8"
              />
            )}
            <div className="absolute inset-x-5 bottom-5 border border-[#dcd5c9] bg-[#faf7f2]/95 p-4 backdrop-blur sm:inset-x-8 sm:bottom-8">
              <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#625b52]">
                {preview?.spec ?? "Project preview"}
              </p>
              <p className="mt-2 font-serif text-sm leading-6">
                {preview?.caption ?? project.summary}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function SelectedWorkFeed({ onOpenProject }: SelectedWorkFeedProps) {
  return (
    <section
      id="selected-work"
      className="scroll-mt-20 border-t border-current/10 px-4 pb-24 pt-20 md:px-12 md:pt-28"
      aria-labelledby="selected-work-heading"
    >
      <header className="mx-auto mb-14 max-w-7xl md:mb-20">
        <p className="font-mono text-[10px] uppercase tracking-[.18em]">
          Selected work / archival index
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_22rem] md:items-end">
          <h2
            id="selected-work-heading"
            className="max-w-3xl font-serif text-5xl leading-none md:text-7xl"
          >
            Projects filed by the decisions that shaped them.
          </h2>
          <p className="theme-muted leading-7">
            Each folio pairs the argument with its evidence: context, constraints, system decisions, trade-offs, and what shipped.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <CatalogCard
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            onOpen={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
}
