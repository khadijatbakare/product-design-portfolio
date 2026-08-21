"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const welcome = "Welcome to my little corner of the internet.";
const welcomeWords = welcome.split(" ").map((word, wordIndex, words) => ({
  word,
  start: words
    .slice(0, wordIndex)
    .reduce((count, previous) => count + previous.length + 1, 0),
}));

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
          className="absolute inset-0 z-0 origin-bottom bg-[#d8ff55]/90"
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

      <h2 className="max-w-xs text-balance text-center font-serif text-lg leading-relaxed text-[#faf7f2] sm:max-w-md sm:text-xl">
        <span className="sr-only">{welcome}</span>
        <span aria-hidden="true">
          {welcomeWords.map(({ word, start }, wordIndex) => (
            <span
              key={word}
              className={`inline-block whitespace-nowrap ${wordIndex < welcomeWords.length - 1 ? "mr-[.25em]" : ""}`}
            >
              {word.split("").map((character, characterIndex) => (
                <motion.span
                  key={`${character}-${characterIndex}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.12,
                    delay: reducedMotion ? 0 : (start + characterIndex) * 0.014,
                    ease: "easeOut",
                  }}
                >
                  {character}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      </h2>
    </motion.div>
  );
}
