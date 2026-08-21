"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VintageGramophoneProps {
  readonly trackName?: string;
  readonly artistName?: string;
  readonly albumArt?: string;
  readonly trackNumber?: string;
  readonly liveOnSpotify?: boolean;
}

export function VintageGramophone({
  trackName = "Between records",
  artistName = "The next track has not been filed yet.",
  albumArt,
  trackNumber,
  liveOnSpotify = false,
}: VintageGramophoneProps) {
  const [decorativePlaying, setDecorativePlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const isSpinning = liveOnSpotify || decorativePlaying;

  return (
    <div className="flex flex-col items-center justify-center bg-[#faf8f5]/55 p-3 text-[#2d2a26] select-none">
      <button
        type="button"
        aria-pressed={isSpinning}
        aria-label={
          liveOnSpotify
            ? "Record spinning with the current Spotify track"
            : `${decorativePlaying ? "Pause" : "Spin"} the decorative gramophone`
        }
        className="group relative h-44 w-36 cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        onClick={() => {
          if (!liveOnSpotify) setDecorativePlaying((playing) => !playing);
        }}
      >
        <svg
          viewBox="0 0 180 220"
          className="h-full w-full fill-none stroke-[#2d2a26] stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
          aria-hidden="true"
        >
          <rect
            x="25"
            y="170"
            width="130"
            height="28"
            rx="2"
            className="fill-[#faf8f5]"
          />
          <line
            x1="25"
            y1="178"
            x2="155"
            y2="178"
            className="stroke-[#2d2a26]/20 stroke-[1]"
          />
          <circle cx="90" cy="188" r="2" className="fill-[#2d2a26]" />
          <ellipse
            cx="90"
            cy="155"
            rx="60"
            ry="16"
            className="fill-[#faf8f5]"
          />

          <motion.g
            animate={{ rotate: isSpinning && !reducedMotion ? 360 : 0 }}
            transition={{
              repeat: isSpinning && !reducedMotion ? Infinity : 0,
              duration: 8,
              ease: "linear",
            }}
            style={{ transformOrigin: "90px 155px" }}
          >
            <ellipse
              cx="90"
              cy="155"
              rx="52"
              ry="14"
              className="stroke-[#2d2a26]/40"
            />
            <ellipse
              cx="90"
              cy="155"
              rx="38"
              ry="10"
              className="stroke-[#2d2a26]/20 stroke-[1]"
            />
            <ellipse
              cx="90"
              cy="155"
              rx="16"
              ry="4.5"
              className="fill-[#c5a059] stroke-[#c5a059]"
            />
            <circle cx="90" cy="155" r="1.5" className="fill-[#faf8f5]" />
          </motion.g>

          <path d="M142 165C145 145 128 140 116 148" />
          <circle cx="116" cy="148" r="2.5" className="fill-[#2d2a26]" />
          <path
            d="M48 165C40 135 42 105 75 80"
            className="stroke-[#c5a059] stroke-[2]"
          />
          <g className="stroke-[#c5a059]">
            <path d="M75 80C95 65 108 45 120 30C130 18 148 18 158 35C168 52 155 78 132 86C110 94 90 88 75 80Z" />
            <ellipse
              cx="140"
              cy="48"
              rx="20"
              ry="26"
              transform="rotate(-25 140 48)"
            />
            <path
              d="M75 80Q105 58 122 30"
              className="stroke-[#c5a059]/40 stroke-[1]"
            />
            <path
              d="M75 80Q115 68 144 38"
              className="stroke-[#c5a059]/40 stroke-[1]"
            />
            <path
              d="M75 80Q118 78 152 56"
              className="stroke-[#c5a059]/40 stroke-[1]"
            />
          </g>

          {isSpinning && !reducedMotion && (
            <motion.path
              d="M152 25C164 36 164 52 152 64"
              className="stroke-[#c5a059]/60 stroke-[1.2]"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], x: [0, 6] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
            />
          )}
        </svg>
        {albumArt && (
          <span className="pointer-events-none absolute left-1/2 top-[70.45%] flex h-[9px] w-[27px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[50%] border border-black/20 bg-[#c5a059] shadow-inner">
            <motion.span
              className="block h-8 w-8 shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${JSON.stringify(albumArt)})` }}
              animate={{ rotate: isSpinning && !reducedMotion ? 360 : 0 }}
              transition={{
                repeat: isSpinning && !reducedMotion ? Infinity : 0,
                duration: 8,
                ease: "linear",
              }}
            />
          </span>
        )}
      </button>

      <div
        className="mt-2 flex flex-col items-center gap-1 text-center"
        aria-live="polite"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#625b52]">
          {isSpinning ? "Record spinning" : "Turntable paused"}
        </span>
        <span className="font-mono text-[10px] leading-4 text-[#2d2a26]">
          {trackNumber ? `TRACK ${trackNumber} — ` : ""}
          {trackName} • {artistName}
        </span>
        {liveOnSpotify && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#36795a]">
            Live on Spotify
          </span>
        )}
      </div>
    </div>
  );
}
