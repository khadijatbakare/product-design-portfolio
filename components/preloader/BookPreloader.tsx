"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface BookPreloaderProps {
  readonly onFinish: () => void;
}

const welcome = "Welcome to my little corner of the internet";

export function BookPreloader({ onFinish }: BookPreloaderProps) {
  const [complete, setComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const progress = window.setTimeout(
      () => setComplete(true),
      reducedMotion ? 80 : 800,
    );
    const reveal = window.setTimeout(
      () => setShowWelcome(true),
      reducedMotion ? 160 : 1080,
    );
    const finish = window.setTimeout(onFinish, reducedMotion ? 1450 : 3400);
    return () => {
      window.clearTimeout(progress);
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
    };
  }, [onFinish, reducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#181a1e] px-6 text-[#faf8f5]"
      exit={{ opacity: 0, scale: 1.015 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: "easeInOut" }}
      role="status"
      aria-live="polite"
      aria-label={showWelcome ? welcome : "Loading portfolio"}
    >
      <AnimatePresence mode="wait">
        {!showWelcome ? (
          <motion.div
            key="book-loader"
            className="relative h-64 w-14 overflow-hidden rounded-t-[3px] border border-white/10 bg-[#24272d] shadow-2xl"
            animate={
              complete
                ? { y: -30, opacity: 0, rotate: -5 }
                : { y: 0, opacity: 1, rotate: 0 }
            }
            exit={{ opacity: 0 }}
            transition={
              complete
                ? { duration: reducedMotion ? 0.01 : 0.3, ease: "easeIn" }
                : undefined
            }
          >
            <div className="absolute inset-[5px] overflow-hidden rounded-sm bg-[#111317]">
              <motion.div
                className="absolute inset-0 origin-bottom bg-[#d8ff55]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.8,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            </div>
            <span className="absolute inset-0 flex items-center justify-center rotate-180 font-mono text-[9px] uppercase tracking-[.2em] text-white/70 mix-blend-difference [writing-mode:vertical-rl]">
              Portfolio index
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            className="relative max-w-3xl text-center"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              aria-hidden="true"
              className="font-serif text-[clamp(2rem,6vw,4.8rem)] leading-[1.02] tracking-[-.025em]"
            >
              {welcome.split("").map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.24,
                    delay: reducedMotion ? 0 : index * 0.032,
                    ease: "easeOut",
                  }}
                >
                  {character === " " ? "\u00a0" : character}
                </motion.span>
              ))}
            </p>
            <motion.div
              aria-hidden="true"
              className="mx-auto mt-7 h-px max-w-40 origin-left bg-[#d8ff55]/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.65,
                delay: reducedMotion ? 0 : 1.45,
                ease: "easeOut",
              }}
            />
            <span className="sr-only">{welcome}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
