"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, ImageIcon, Music2 } from "lucide-react";
import {
  libraryCopy,
  volumes,
  type ModalView,
  type ShelfCurioId,
} from "@/data/content";

export interface CornerBookshelfProps {
  readonly onOpen: (view: ModalView, volumeId?: string) => void;
  readonly onOpenGame: () => void;
  readonly onOpenCurio: (curio: ShelfCurioId) => void;
}

interface Hotspot {
  readonly id: string;
  readonly label: string;
  readonly meta: string;
  readonly className: string;
  readonly action: () => void;
}

export function CornerBookshelf({
  onOpen,
  onOpenGame,
  onOpenCurio,
}: CornerBookshelfProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [lagosTime, setLagosTime] = useState("--:--:--");

  useEffect(() => {
    const update = () =>
      setLagosTime(
        new Intl.DateTimeFormat("en-NG", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const volumeHotspots: readonly Hotspot[] = volumes.map((volume, index) => ({
    id: volume.id,
    label: `${volume.volume}: ${volume.spine}`,
    meta: `${volume.subtitle} · ${volume.readTime}`,
    className: [
      "left-[45%] top-[34%] h-[17%] w-[23%]",
      "left-[69%] top-[34%] h-[17%] w-[21%]",
      "left-[45%] top-[51%] h-[17%] w-[23%]",
      "left-[69%] top-[51%] h-[17%] w-[21%]",
    ][index],
    action: () => onOpen(volume.contents, volume.id),
  }));

  const hotspots: readonly Hotspot[] = [
    {
      id: "portrait",
      label: "Portrait of Khadijat",
      meta: "Turn over the frame",
      className: "left-[45%] top-[8%] h-[22%] w-[23%]",
      action: () => onOpenCurio("portrait"),
    },
    {
      id: "clock",
      label: "Lagos clock",
      meta: `${lagosTime} · West Africa Time`,
      className: "left-[69%] top-[8%] h-[22%] w-[21%]",
      action: () => undefined,
    },
    ...volumeHotspots,
    {
      id: "gamepad",
      label: "UNO Flip Memory Match",
      meta: "Pick up the controller · Play",
      className: "left-[45%] top-[68%] h-[14%] w-[23%]",
      action: onOpenGame,
    },
    {
      id: "listening",
      label: "Currently spinning",
      meta: "Open the Spotify turntable",
      className: "left-[69%] top-[68%] h-[14%] w-[21%]",
      action: () => onOpenCurio("listening"),
    },
    {
      id: "reading",
      label: "Books read this year",
      meta: "Open the reading ledger",
      className: "left-[45%] top-[83%] h-[14%] w-[23%]",
      action: () => onOpenCurio("reading"),
    },
  ];

  const active = hotspots.find((hotspot) => hotspot.id === hovered);

  return (
    <section
      className="relative mx-auto w-full max-w-4xl select-none"
      aria-label="Interactive portfolio bookshelf"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1 z-30 flex h-14 justify-center">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              className="h-fit rounded-md border border-white/15 bg-[#181a1e]/95 px-4 py-2 text-center text-stone-100 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-medium">{active.label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-stone-300">
                {active.meta}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mx-auto aspect-[704/908] w-full">
        <Image
          src="/assets/bookshelf.svg"
          alt="Illustrated corner bookshelf containing four portfolio volumes and personal objects"
          fill
          priority
          sizes="(min-width: 1024px) 896px, 100vw"
          className="bookshelf-asset object-contain"
        />
        {hotspots.map((hotspot) => (
          <motion.button
            key={hotspot.id}
            type="button"
            onClick={hotspot.action}
            onMouseEnter={() => setHovered(hotspot.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(hotspot.id)}
            onBlur={() => setHovered(null)}
            whileHover={{ y: -4 }}
            className={`${hotspot.className} absolute z-20 min-h-11 rounded-md border border-transparent bg-transparent focus-visible:border-current focus-visible:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            aria-label={`${hotspot.label}. ${hotspot.meta}`}
          />
        ))}
      </div>

      <nav
        aria-label="Bookshelf Easter eggs"
        className="-mt-2 flex w-full items-center justify-center gap-2 px-4 md:hidden"
      >
        <button
          type="button"
          onClick={onOpenGame}
          className="theme-toggle flex min-h-11 items-center gap-2 rounded-full border px-3 font-mono text-[10px] uppercase tracking-wider"
        >
          <Gamepad2 size={15} aria-hidden="true" /> Play
        </button>
        <button
          type="button"
          onClick={() => onOpenCurio("listening")}
          className="theme-toggle flex min-h-11 items-center gap-2 rounded-full border px-3 font-mono text-[10px] uppercase tracking-wider"
        >
          <Music2 size={15} aria-hidden="true" /> Listen
        </button>
        <button
          type="button"
          onClick={() => onOpenCurio("portrait")}
          className="theme-toggle flex min-h-11 items-center gap-2 rounded-full border px-3 font-mono text-[10px] uppercase tracking-wider"
        >
          <ImageIcon size={15} aria-hidden="true" /> Portrait
        </button>
      </nav>
      <p className="sr-only">{libraryCopy.instruction}</p>
    </section>
  );
}
