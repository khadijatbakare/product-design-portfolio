"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VintageGramophoneProps {
  readonly trackName?: string;
  readonly artistName?: string;
}

export function VintageGramophone({
  trackName = "Between records",
  artistName = "The next track has not been filed yet.",
}: VintageGramophoneProps) {
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <div className="select-none text-center">
      <button
        type="button"
        aria-pressed={playing}
        aria-label={`${playing ? "Pause" : "Spin"} the decorative gramophone`}
        onClick={() => setPlaying((value) => !value)}
        className="mx-auto block h-44 w-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <svg
          viewBox="0 0 200 240"
          className="h-full w-full overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="horn-brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5D77F" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#7B5804" />
            </linearGradient>
            <radialGradient id="bell-shadow">
              <stop offset="0%" stopColor="#2A1B0A" />
              <stop offset="70%" stopColor="#5B3A11" />
              <stop offset="100%" stopColor="#D4AF37" />
            </radialGradient>
            <radialGradient id="vinyl-grooves">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="15%" stopColor="#18181B" />
              <stop offset="48%" stopColor="#27272A" />
              <stop offset="78%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#27272A" />
            </radialGradient>
          </defs>
          <rect
            x="35"
            y="180"
            width="130"
            height="40"
            rx="3"
            fill="#2E1A11"
            stroke="#1C100A"
            strokeWidth="1.5"
          />
          <polygon
            points="30,180 170,180 162,172 38,172"
            fill="#4A2E1B"
            stroke="#1C100A"
          />
          <rect
            x="72"
            y="195"
            width="56"
            height="12"
            rx="1"
            fill="#D4AF37"
            opacity=".82"
          />
          <text
            x="100"
            y="204"
            textAnchor="middle"
            fill="#2E1A11"
            fontSize="6"
            fontFamily="serif"
            letterSpacing=".6"
          >
            FOLIO RADIO
          </text>
          <g transform="translate(100 160)">
            <ellipse rx="55" ry="16" fill="#09090B" stroke="#27272A" />
            <motion.g
              animate={{ rotate: playing && !reducedMotion ? 360 : 0 }}
              transition={{
                repeat: playing && !reducedMotion ? Infinity : 0,
                duration: 8,
                ease: "linear",
              }}
            >
              <ellipse rx="52" ry="15" fill="url(#vinyl-grooves)" />
              <ellipse rx="40" ry="11" stroke="rgba(255,255,255,.1)" />
              <ellipse rx="28" ry="8" stroke="rgba(255,255,255,.1)" />
              <ellipse rx="16" ry="5" fill="#8C2D19" />
              <circle r="2" fill="#FAF7F2" />
            </motion.g>
          </g>
          <path
            d="M140 172C145 155 125 150 110 156"
            stroke="#A8A29E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="110" cy="156" r="4.5" fill="#78716C" stroke="#44403C" />
          <line
            x1="110"
            y1="156"
            x2="106"
            y2="162"
            stroke="#E7E5E4"
            strokeWidth="1.5"
          />
          <path
            d="M55 174C45 150 48 110 80 85"
            stroke="url(#horn-brass)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M80 85C105 65 120 40 135 25C145 15 165 15 175 35C185 55 170 85 145 95C120 105 95 95 80 85Z"
            fill="url(#horn-brass)"
            stroke="#7B5804"
          />
          <ellipse
            cx="152"
            cy="52"
            rx="24"
            ry="32"
            transform="rotate(-25 152 52)"
            fill="url(#bell-shadow)"
            stroke="#B8860B"
            strokeWidth="1.5"
          />
          {[
            "M80 85Q115 60 135 26",
            "M80 85Q125 70 158 35",
            "M80 85Q130 80 170 56",
            "M80 85Q120 90 156 80",
          ].map((d) => (
            <path
              key={d}
              d={d}
              stroke="#F5D77F"
              strokeWidth=".75"
              opacity=".6"
            />
          ))}
          {playing && !reducedMotion && (
            <motion.path
              d="M170 30C185 45 185 65 170 80"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: [0, 0.8, 0], x: [0, 8] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
            />
          )}
        </svg>
      </button>
      <div className="mt-1 flex items-center justify-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${playing ? "animate-pulse bg-emerald-700" : "bg-stone-400"}`}
        />
        <span className="font-mono text-[8px] uppercase tracking-widest text-stone-500">
          {playing ? "Record spinning" : "Turntable paused"}
        </span>
      </div>
      <p className="mt-2 font-serif text-sm font-medium">{trackName}</p>
      <p className="font-mono text-[9px] text-black/50">{artistName}</p>
    </div>
  );
}
