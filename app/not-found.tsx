"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

export default function NotFound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const audioRef = useRef<AudioContext | null>(null);
  const cleanupTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (cleanupTimer.current !== null)
        window.clearTimeout(cleanupTimer.current);
      if (audioRef.current && audioRef.current.state !== "closed")
        void audioRef.current.close();
    },
    [],
  );

  const playDisconnectSound = () => {
    if (isPlaying) return;
    const AudioContextClass =
      window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return;
    setIsPlaying(true);

    try {
      const audio = new AudioContextClass();
      audioRef.current = audio;
      const gain = audio.createGain();
      const oscillators = [480, 620].map((frequency) => {
        const oscillator = audio.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, audio.currentTime);
        oscillator.connect(gain);
        oscillator.start();
        oscillator.stop(audio.currentTime + 1.2);
        return oscillator;
      });

      gain.gain.setValueAtTime(0.045, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 1.2);
      gain.connect(audio.destination);

      cleanupTimer.current = window.setTimeout(() => {
        oscillators.forEach((oscillator) => oscillator.disconnect());
        gain.disconnect();
        void audio.close();
        audioRef.current = null;
        cleanupTimer.current = null;
        setIsPlaying(false);
      }, 1300);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <main className="theme-shell paper-texture relative flex min-h-screen select-none flex-col items-center justify-center p-6">
      <div className="absolute right-6 top-6 md:right-12 md:top-10">
        <ThemeToggle />
      </div>
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <button
          type="button"
          onClick={playDisconnectSound}
          className="group relative mb-10 h-36 w-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8"
          title="Click to check the line"
          aria-label={
            isPlaying
              ? "Disconnected telephone tone playing"
              : "Test the disconnected telephone line"
          }
        >
          <svg
            viewBox="0 0 160 140"
            className="h-full w-full fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
            aria-hidden="true"
          >
            <path
              d="M30 115 L45 65 L115 65 L130 115 Z"
              className="fill-[var(--room)]"
            />
            <line x1="25" y1="115" x2="135" y2="115" />
            <circle cx="80" cy="92" r="16" className="opacity-80" />
            <circle cx="80" cy="92" r="6" className="fill-current" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={angle}
                cx={80 + 11 * Math.cos((angle * Math.PI) / 180)}
                cy={92 + 11 * Math.sin((angle * Math.PI) / 180)}
                r="1.5"
                className="fill-current stroke-none opacity-40"
              />
            ))}
            <path d="M52 65 L52 56 M62 56 L42 56" />
            <path d="M108 65 L108 56 M118 56 L98 56" />
            <motion.g
              animate={
                isPlaying && !reducedMotion
                  ? { rotate: [-2, 2, -2, 0], y: [-1, 1, 0] }
                  : {}
              }
              transition={{ duration: 0.2, repeat: isPlaying ? 4 : 0 }}
            >
              <path
                d="M10 40 C10 32, 22 30, 26 38 L30 46 C32 50, 24 55, 18 52 Z"
                className="fill-[var(--room)]"
              />
              <path
                d="M48 68 C44 62, 54 52, 60 55 L68 62 C72 66, 64 74, 58 72 Z"
                className="fill-[var(--room)]"
              />
              <path d="M22 40 C34 46, 42 52, 56 64" strokeWidth="3" />
            </motion.g>
            <path
              d="M32 50 C24 65, 30 75, 20 85 C14 92, 25 100, 35 105"
              className="stroke-current stroke-[1] opacity-40"
            />
          </svg>
          <span
            className="theme-muted mt-1 block font-mono text-[10px] uppercase tracking-widest"
            aria-live="polite"
          >
            {isPlaying
              ? "Beep… Beep… (No signal)"
              : "Click receiver to test line"}
          </span>
        </button>

        <span className="theme-muted mb-2 font-mono text-xs uppercase tracking-widest">
          404 — Line disconnected
        </span>
        <h1 className="mb-3 font-serif text-3xl">
          This extension does not exist.
        </h1>
        <p className="theme-muted mb-8 max-w-sm font-serif text-sm leading-relaxed">
          The volume or page you were trying to reach has been misplaced, moved
          to another shelf, or borrowed indefinitely.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded bg-[var(--room-ink)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--room)] shadow-sm transition-opacity hover:opacity-80"
        >
          ← Return to the bookshelf
        </Link>
      </div>
    </main>
  );
}
