"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { projects, type Project } from "@/data/content";

interface SelectedWorkFeedProps {
  readonly onOpenProject: (slug: string) => void;
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  readonly project: Project;
  readonly index: number;
  readonly total: number;
  readonly progress: MotionValue<number>;
  readonly onOpen: (slug: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const start = total > 1 ? index / total : 0;
  const targetScale = index === total - 1 ? 1 : 0.96;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const opacity = useTransform(progress, [start, 1], [1, index === total - 1 ? 1 : 0.78]);
  const preview = project.visualAssets[0];
  const verifiedMetric = project.metrics.find((metric) => metric.verified);
  const tags = [project.category, project.platform, `${project.systemDecisions.length} decisions`];

  return (
    <article
      className="sticky mb-12 flex min-h-[72vh] items-center justify-center px-4 sm:mb-16"
      style={{ top: `calc(5rem + ${index * 24}px)`, zIndex: index + 1 }}
      aria-labelledby={`selected-${project.slug}-title`}
    >
      <motion.div
        style={{
          scale: reducedMotion ? 1 : scale,
          opacity: reducedMotion ? 1 : opacity,
        }}
        className="relative flex w-full max-w-4xl origin-top flex-col items-start justify-between gap-8 rounded-[4px] border border-[#d5cec2] bg-[#faf7f2] p-6 text-[#23201d] shadow-[0_12px_40px_rgba(0,0,0,.08)] sm:p-10 md:flex-row"
      >
        <div className="flex min-w-0 flex-1 flex-col justify-between space-y-7 self-stretch">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#625b52]">
                [{String(index + 1).padStart(2, "0")}] / {String(total).padStart(2, "0")}
              </span>
              <span className="text-[#a49b8e]" aria-hidden="true">•</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c2d19]">
                {project.role}
              </span>
            </div>
            <h3
              id={`selected-${project.slug}-title`}
              className="font-serif text-3xl font-medium leading-snug tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-sm leading-7 text-[#57534e] sm:text-base">
              {project.summary}
            </p>
          </div>

          <div className="border-l-2 border-[#b38a2c] py-1 pl-3">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-[#625b52]">
              {verifiedMetric ? "Verified outcome" : "Project marker"}
            </span>
            <p className="mt-1 font-mono text-xs leading-5">
              {verifiedMetric
                ? `${verifiedMetric.value} — ${verifiedMetric.label}`
                : `${project.timeline} · ${project.team}`}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e8e2d8] pt-4">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[2px] bg-[#efeae1] px-2 py-1 font-mono text-[10px] text-[#57534e]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`#case-study-${project.slug}`}
              onClick={(event) => {
                event.preventDefault();
                onOpen(project.slug);
              }}
              className="inline-flex min-h-11 items-center font-mono text-xs font-medium uppercase tracking-wider text-[#8c2d19] underline-offset-4 hover:underline"
            >
              Read case study ↗
            </a>
          </div>
        </div>

        <figure
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-[#d5cec2] bg-[#eae4d9] shadow-inner md:w-[42%]"
          style={{ background: preview?.media.placeholder ?? "#eae4d9" }}
        >
          {preview ? (
            <Image
              src={preview.media.src}
              alt={preview.media.alt}
              fill
              sizes="(min-width: 768px) 370px, 90vw"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-widest text-[#625b52]">
              Folio preview forthcoming
            </div>
          )}
          {preview && (
            <figcaption className="absolute inset-x-3 bottom-3 z-10 border border-[#d5cec2] bg-[#faf7f2]/95 p-3 font-mono text-[10px] leading-5 text-[#57534e] backdrop-blur">
              {preview.spec ?? preview.caption}
            </figcaption>
          )}
        </figure>
      </motion.div>
    </article>
  );
}

export function SelectedWorkFeed({ onOpenProject }: SelectedWorkFeedProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="selected-work"
      ref={containerRef}
      className="relative scroll-mt-20 bg-[#faf8f5] pb-32 pt-20"
      aria-labelledby="selected-work-heading"
    >
      <header className="mx-auto mb-12 flex max-w-4xl flex-col items-start justify-between gap-4 border-b border-[#e3dcce] px-4 pb-4 sm:flex-row sm:items-end sm:gap-6">
        <div>
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#625b52]">
            Section 01 // Index
          </span>
          <h2
            id="selected-work-heading"
            className="font-serif text-3xl tracking-tight text-[#23201d]"
          >
            Selected Works &amp; Systems
          </h2>
        </div>
        <span className="shrink-0 font-mono text-xs text-[#625b52]">
          [ {projects.length} Case Studies ]
        </span>
      </header>

      <div className="w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            onOpen={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
}
