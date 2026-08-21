"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { shelfCurios, type ShelfCurioId } from "@/data/content";
import { useDialogFocus } from "@/components/hooks/useDialogFocus";

export interface ShelfCurioModalProps {
  readonly active: ShelfCurioId | null;
  readonly onClose: () => void;
}

export function ShelfCurioModal({ active, onClose }: ShelfCurioModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  useDialogFocus(dialogRef, onClose, Boolean(active));
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-[#111217]/75 p-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="curio-title"
          onClick={onClose}
        >
          <motion.article
            ref={dialogRef}
            className="relative w-full max-w-md border border-black/15 bg-[#f8f1e5] p-8 shadow-2xl"
            initial={{ y: 28, rotate: -2, scale: 0.94 }}
            animate={{ y: 0, rotate: active === "portrait" ? 1 : -1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.98,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              autoFocus
              onClick={onClose}
              className="absolute right-4 top-4"
              aria-label="Close easter egg"
            >
              <X size={17} />
            </button>
            {active === "listening" && (
              <>
                <p className="font-mono text-[9px] uppercase tracking-widest">
                  Now spinning
                </p>
                <h2
                  id="curio-title"
                  className="mt-7 font-serif text-5xl leading-none"
                >
                  {shelfCurios.listening.track ?? "Between records."}
                </h2>
                <p className="mt-4 text-black/55">
                  {shelfCurios.listening.artist ??
                    "The next track has not been filed yet."}
                </p>
                {shelfCurios.listening.spotifyUrl && (
                  <a
                    href={shelfCurios.listening.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 flex w-fit items-center gap-2 border-b border-black pb-1 font-mono text-[9px] uppercase tracking-widest"
                  >
                    Listen on Spotify <ExternalLink size={13} />
                  </a>
                )}
              </>
            )}
            {active === "portrait" && (
              <>
                <p className="font-mono text-[9px] uppercase tracking-widest">
                  The author / undated
                </p>
                <div className="mt-6 border-[12px] border-[#60452d] bg-[#d9cbb8] p-2 shadow-inner">
                  {shelfCurios.portrait ? (
                    <Image
                      src={shelfCurios.portrait.src}
                      alt={shelfCurios.portrait.alt}
                      width={shelfCurios.portrait.width}
                      height={shelfCurios.portrait.height}
                      className="aspect-[4/5] w-full object-cover sepia-[.18]"
                    />
                  ) : (
                    <div className="grid aspect-[4/5] place-items-center bg-[#c8baa7] font-serif text-7xl text-black/35">
                      KB
                    </div>
                  )}
                </div>
                <h2
                  id="curio-title"
                  className="mt-6 text-center font-serif text-3xl"
                >
                  Khadijat Bakare
                </h2>
              </>
            )}
            {active === "reading" && (
              <>
                <p className="font-mono text-[9px] uppercase tracking-widest">
                  Reading ledger / {shelfCurios.reading.year}
                </p>
                <div className="mt-7 border-y-4 border-double border-black/30 py-7 text-center">
                  <p className="font-serif text-8xl leading-none">
                    {shelfCurios.reading.count}
                  </p>
                  <h2
                    id="curio-title"
                    className="mt-3 font-mono text-[10px] uppercase tracking-[.2em]"
                  >
                    Books read so far
                  </h2>
                </div>
                {shelfCurios.reading.goal && (
                  <p className="mt-5 text-center text-sm text-black/55">
                    {shelfCurios.reading.count} of {shelfCurios.reading.goal}{" "}
                    this year
                  </p>
                )}
                {shelfCurios.reading.titles.length > 0 && (
                  <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm">
                    {shelfCurios.reading.titles.map((title) => (
                      <li key={title}>{title}</li>
                    ))}
                  </ol>
                )}
              </>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
