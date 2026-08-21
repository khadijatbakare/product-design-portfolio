"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface BookPreloaderProps {
  readonly onComplete: () => void;
}

export function BookPreloader({ onComplete }: BookPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      return;
    }
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 80) {
          window.clearInterval(timer);
          return 100;
        }
        return current + 20;
      });
    }, 150);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const complete = progress === 100;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121316] px-4 select-none"
      initial={{ opacity: 1, scale: 1 }}
      animate={
        complete ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }
      }
      transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (complete) onComplete();
      }}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${progress}% complete. Welcome to my little corner of the internet.`}
    >
      <div className="relative mb-8 flex h-64 w-14 flex-col items-center justify-between overflow-hidden rounded-[2px] border border-neutral-700/60 bg-[#1e2024] py-4 shadow-2xl">
        <motion.div
          className="absolute inset-0 z-0 origin-bottom bg-[#d4af37]/90"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: progress / 100 }}
          transition={{
            duration: reducedMotion ? 0.01 : 0.15,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        <span className="relative z-10 font-mono text-[8px] uppercase tracking-widest text-neutral-300 mix-blend-difference">
          Folio / 26
        </span>
        <div className="relative z-10 flex rotate-180 items-center justify-center [writing-mode:vertical-rl]">
          <span className="font-serif text-[11px] uppercase tracking-widest text-[#faf7f2] mix-blend-difference">
            Portfolio Index
          </span>
        </div>
        <span className="relative z-10 font-mono text-[8px] tracking-widest text-neutral-300 mix-blend-difference">
          VOL. 00
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: "easeOut" }}
        className="max-w-xs text-balance text-center font-serif text-lg leading-relaxed text-[#faf7f2] sm:max-w-md sm:text-xl"
      >
        Welcome to my little{" "}
        <span className="whitespace-nowrap">corner of</span> the internet.
      </motion.h2>

      <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        {progress}% loaded
      </span>
    </motion.div>
  );
}
