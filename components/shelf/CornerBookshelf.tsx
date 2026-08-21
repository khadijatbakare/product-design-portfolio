"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  libraryCopy,
  shelfCurios,
  volumes,
  type ModalView,
  type ShelfCurioId,
} from "@/data/content";

export interface CornerBookshelfProps {
  readonly onOpen: (view: ModalView, volumeId?: string) => void;
  readonly onOpenGame: () => void;
  readonly onOpenCurio: (curio: ShelfCurioId) => void;
}

const spineX = [136, 201, 414, 487];
const spineAngle = [1, -1, -1, 1];

const curioCopy: Record<ShelfCurioId, { title: string; instruction: string }> =
  {
    listening: {
      title: "Currently spinning",
      instruction: "Wind the gramophone",
    },
    portrait: {
      title: "A photograph of the author",
      instruction: "Turn over the frame",
    },
    reading: {
      title: "Books read this year",
      instruction: "Open the reading ledger",
    },
  };

export function CornerBookshelf({
  onOpen,
  onOpenGame,
  onOpenCurio,
}: CornerBookshelfProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openingVolume, setOpeningVolume] = useState<string | null>(null);
  const openingTimer = useRef<number | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const active = volumes.find((volume) => volume.id === hovered);
  const gamepadActive = hovered === "gamepad";
  const curio =
    hovered && hovered in curioCopy ? curioCopy[hovered as ShelfCurioId] : null;
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(
    () => () => {
      if (openingTimer.current !== null)
        window.clearTimeout(openingTimer.current);
    },
    [],
  );
  const lagos = now ? new Date(now.getTime() + 60 * 60 * 1000) : null;
  const hour = lagos ? lagos.getUTCHours() % 12 : 0;
  const minute = lagos?.getUTCMinutes() ?? 0;
  const second = lagos?.getUTCSeconds() ?? 0;
  const hourAngle = hour * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  const secondAngle = second * 6;
  const lagosLabel = now
    ? new Intl.DateTimeFormat("en-NG", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now)
    : "--:--:--";

  return (
    <section
      className="relative mx-auto flex min-h-[590px] w-full max-w-5xl flex-col items-center justify-end select-none"
      aria-label="Portfolio library"
    >
      <div className="absolute top-4 z-20 flex h-14 items-center justify-center">
        <AnimatePresence mode="wait">
          {hovered === "clock" ? (
            <motion.div
              key="clock"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              className="rounded-md border border-white/10 bg-[#181A1E]/95 px-4 py-2 text-center text-stone-100 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-medium">{lagosLabel}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                Lagos · West Africa Time
              </p>
            </motion.div>
          ) : curio ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              className="rounded-md border border-white/10 bg-[#181A1E]/95 px-4 py-2 text-center text-stone-100 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-medium">{curio.title}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                {curio.instruction} · Explore
              </p>
            </motion.div>
          ) : gamepadActive ? (
            <motion.div
              key="gamepad"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              className="rounded-md border border-white/10 bg-[#181A1E]/95 px-4 py-2 text-center text-stone-100 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-medium">UNO Flip Memory Match</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                Pick up the controller · Play
              </p>
            </motion.div>
          ) : active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              className="rounded-md border border-white/10 bg-[#181A1E]/95 px-4 py-2 text-center text-stone-100 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-medium">{active.subtitle}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                {active.readTime} · {libraryCopy.open}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <svg
        viewBox="0 0 680 520"
        className="library-shelf h-auto w-full overflow-visible drop-shadow-2xl"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="left-shelf">
            <stop stopColor="#343941" />
            <stop offset="1" stopColor="#25282e" />
          </linearGradient>
          <linearGradient id="right-shelf">
            <stop stopColor="#282c32" />
            <stop offset="1" stopColor="#1d1f23" />
          </linearGradient>
          <linearGradient id="wall-left">
            <stop stopColor="#ece8df" />
            <stop offset="1" stopColor="#ddd7cc" />
          </linearGradient>
          <linearGradient id="wall-right">
            <stop stopColor="#ded8cd" />
            <stop offset="1" stopColor="#f0ece4" />
          </linearGradient>
          <linearGradient id="spine-gradient">
            <stop stopColor="#000" stopOpacity=".5" />
            <stop offset=".18" stopColor="#fff" stopOpacity="0" />
            <stop offset=".82" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".6" />
          </linearGradient>
          <pattern
            id="spine-dots"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".7" fill="#fff" />
          </pattern>
          <pattern
            id="spine-coarse-dots"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="#1e0f0b" />
          </pattern>
        </defs>
        <path d="M35 20L340 52V500H35Z" fill="url(#wall-left)" opacity=".7" />
        <path
          d="M340 52L645 20V500H340Z"
          fill="url(#wall-right)"
          opacity=".7"
        />
        <line
          x1="340"
          y1="52"
          x2="340"
          y2="500"
          stroke="#bdb6aa"
          strokeWidth="2"
        />
        <polygon
          points="110,62 334,84 334,474 110,454"
          fill="url(#left-shelf)"
        />
        <polygon
          points="346,84 570,62 570,454 346,474"
          fill="url(#right-shelf)"
        />
        <polygon points="98,50 334,74 346,84 110,62" fill="#414650" />
        <polygon points="346,84 582,50 570,62 346,94" fill="#343840" />
        {[260, 390].map((y) => (
          <g key={y}>
            <polygon
              points={`110,${y} 334,${y + 20} 334,${y + 31} 110,${y + 11}`}
              fill="#202329"
              stroke="#454a53"
            />
            <polygon
              points={`346,${y + 20} 570,${y} 570,${y + 11} 346,${y + 31}`}
              fill="#1b1d21"
              stroke="#343840"
            />
          </g>
        ))}
        <rect
          x="330"
          y="75"
          width="22"
          height="402"
          fill="#111318"
          opacity=".45"
        />
        <motion.g
          tabIndex={-1}
          role="timer"
          aria-label={`Lagos time ${lagosLabel}`}
          onMouseEnter={() => setHovered("clock")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("clock")}
          onBlur={() => setHovered(null)}
          animate={{ y: hovered === "clock" ? -5 : 0 }}
          className="outline-none"
        >
          <path d="M518 142h54l-6 10h-42z" fill="#4b3524" stroke="#24180f" />
          <circle
            cx="545"
            cy="113"
            r="31"
            fill="#755438"
            stroke="#281b11"
            strokeWidth="3"
          />
          <circle cx="545" cy="113" r="24" fill="#e7dcc6" stroke="#b99c70" />
          {[0, 3, 6, 9].map((mark) => {
            const angle = (mark * 30 * Math.PI) / 180;
            return (
              <line
                key={mark}
                x1={545 + Math.sin(angle) * 18}
                y1={113 - Math.cos(angle) * 18}
                x2={545 + Math.sin(angle) * 21}
                y2={113 - Math.cos(angle) * 21}
                stroke="#4a392a"
                strokeWidth="1.5"
              />
            );
          })}
          <line
            x1="545"
            y1="113"
            x2="545"
            y2="99"
            stroke="#33261c"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${hourAngle} 545 113)`}
          />
          <line
            x1="545"
            y1="113"
            x2="545"
            y2="94"
            stroke="#33261c"
            strokeWidth="1.7"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} 545 113)`}
          />
          <line
            x1="545"
            y1="115"
            x2="545"
            y2="93"
            stroke="#9b2d22"
            strokeWidth=".8"
            transform={`rotate(${secondAngle} 545 113)`}
          />
          <circle cx="545" cy="113" r="2" fill="#33261c" />
        </motion.g>
        {volumes.map((volume, index) => {
          const width = volume.width;
          const height = volume.height;
          const x = spineX[index];
          const y = 390 - height;
          const angle = spineAngle[index];
          const isHovered = hovered === volume.id;
          const isOpening = openingVolume === volume.id;
          const open = () => {
            if (openingTimer.current !== null) return;
            setHovered(null);
            setOpeningVolume(volume.id);
            openingTimer.current = window.setTimeout(() => {
              onOpen(volume.contents, volume.id);
              setOpeningVolume(null);
              openingTimer.current = null;
            }, 180);
          };
          const fontFamily =
            volume.typography === "mono"
              ? "monospace"
              : volume.typography === "sans"
                ? "sans-serif"
                : "serif";
          return (
            <motion.g
              key={volume.id}
              tabIndex={-1}
              role="button"
              aria-label={`Open ${volume.volume}: ${volume.spine}`}
              onClick={open}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  open();
                }
              }}
              onMouseEnter={() => setHovered(volume.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(volume.id)}
              onBlur={() => setHovered(null)}
              animate={{ y: isOpening ? -28 : isHovered ? -14 : 0 }}
              transition={
                isOpening
                  ? { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
                  : { type: "spring", stiffness: 340, damping: 28 }
              }
              className={`cursor-pointer outline-none ${openingVolume && !isOpening ? "pointer-events-none" : ""}`}
            >
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx="2"
                fill={volume.color}
                stroke="#0e0f11"
                transform={`rotate(${angle} ${x} 390)`}
              />
              {volume.texture === "dots" && (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="url(#spine-dots)"
                  opacity=".22"
                />
              )}
              {volume.texture === "coarse-dots" && (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="url(#spine-coarse-dots)"
                  opacity=".25"
                />
              )}
              {volume.texture === "gradient" && (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="url(#spine-gradient)"
                  opacity=".55"
                />
              )}
              <rect
                x={x + 3}
                y={y - 3}
                width={width - 6}
                height="3"
                rx="1"
                fill="#f3eee5"
                opacity=".85"
              />
              <text
                x={x + width / 2}
                y={y + 16}
                fill={volume.textColor}
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {volume.volume}
              </text>
              <text
                x={x + width / 2}
                y={y + height / 2}
                fill={volume.textColor}
                fontSize={
                  volume.spine.length > 22
                    ? 7.5
                    : volume.typography === "sans"
                      ? 9
                      : 10
                }
                fontFamily={fontFamily}
                fontStyle={volume.typography === "italic" ? "italic" : "normal"}
                textAnchor="middle"
                transform={`rotate(-90 ${x + width / 2} ${y + height / 2})`}
              >
                {volume.spine}
              </text>
              {volume.accent === "lines" && (
                <g stroke={volume.textColor} opacity=".45">
                  <line
                    x1={x + 10}
                    x2={x + width - 10}
                    y1={y + 27}
                    y2={y + 27}
                  />
                  <line
                    x1={x + 10}
                    x2={x + width - 10}
                    y1={y + 31}
                    y2={y + 31}
                  />
                </g>
              )}
              {volume.accent === "numeral" && (
                <text
                  x={x + width / 2}
                  y={y + height - 14}
                  fill={volume.textColor}
                  fontFamily="serif"
                  fontSize="10"
                  textAnchor="middle"
                >
                  II
                </text>
              )}
              {volume.accent === "stitch" && (
                <line
                  x1={x + width - 8}
                  x2={x + width - 8}
                  y1={y + height - 28}
                  y2={y + height - 10}
                  stroke={volume.textColor}
                  strokeDasharray="3 3"
                />
              )}
              {volume.accent === "ribbon" && (
                <path
                  d={`M${x + width / 2 - 4} 390h8v18l-4-4-4 4z`}
                  fill="#8C2D19"
                />
              )}
            </motion.g>
          );
        })}
        <motion.g
          tabIndex={-1}
          role="button"
          aria-label="See what Khadijat is listening to"
          onClick={() => onOpenCurio("listening")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenCurio("listening");
            }
          }}
          onMouseEnter={() => setHovered("listening")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("listening")}
          onBlur={() => setHovered(null)}
          animate={{
            y: hovered === "listening" ? -9 : 0,
            rotate: hovered === "listening" ? -3 : 0,
          }}
          className="cursor-pointer outline-none"
        >
          <ellipse
            cx="298"
            cy="383"
            rx="31"
            ry="5"
            fill="#08090b"
            opacity=".28"
          />
          <rect
            x="274"
            y="352"
            width="45"
            height="30"
            rx="2"
            fill="#6a3f25"
            stroke="#25180f"
          />
          <circle cx="296" cy="366" r="10" fill="#bc914f" stroke="#3c2d1c" />
          <circle cx="296" cy="366" r="3" fill="#33241a" />
          <path
            d="M302 356c7-12 8-25 4-37"
            fill="none"
            stroke="#b58a4c"
            strokeWidth="3"
          />
          <path
            d="M305 322c9-17 25-23 36-19-3 15-16 28-34 29z"
            fill="#b88b4d"
            stroke="#3d2d1b"
          />
        </motion.g>
        <motion.g
          tabIndex={-1}
          role="button"
          aria-label="Open Khadijat's portrait"
          onClick={() => onOpenCurio("portrait")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenCurio("portrait");
            }
          }}
          onMouseEnter={() => setHovered("portrait")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("portrait")}
          onBlur={() => setHovered(null)}
          animate={{
            y: hovered === "portrait" ? -8 : 0,
            rotate: hovered === "portrait" ? 2 : -1,
          }}
          className="cursor-pointer outline-none"
        >
          <rect
            x="354"
            y="326"
            width="48"
            height="60"
            rx="1"
            fill="#6d4b2e"
            stroke="#271a10"
            strokeWidth="2"
          />
          <rect
            x="360"
            y="332"
            width="36"
            height="46"
            fill="#d6c7b2"
            stroke="#ae8f65"
          />
          <circle cx="378" cy="347" r="7" fill="#8f8171" />
          <path d="M366 371c2-13 22-13 24 0" fill="#8f8171" />
          <path d="M366 386l12-10 12 10" fill="#3b2a1c" opacity=".7" />
        </motion.g>
        <motion.g
          tabIndex={-1}
          role="button"
          aria-label="Open the books read this year counter"
          onClick={() => onOpenCurio("reading")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenCurio("reading");
            }
          }}
          onMouseEnter={() => setHovered("reading")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("reading")}
          onBlur={() => setHovered(null)}
          animate={{
            y: hovered === "reading" ? -8 : 0,
            rotate: hovered === "reading" ? -2 : 1,
          }}
          className="cursor-pointer outline-none"
        >
          <rect
            x="520"
            y="348"
            width="38"
            height="38"
            rx="2"
            fill="#d9c79f"
            stroke="#493b29"
          />
          <text
            x="539"
            y="359"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="5"
            fill="#493b29"
          >
            READ / {String(shelfCurios.reading.year).slice(-2)}
          </text>
          <text
            x="539"
            y="377"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="18"
            fill="#493b29"
          >
            {shelfCurios.reading.count}
          </text>
        </motion.g>
        <motion.g
          tabIndex={-1}
          role="button"
          aria-label="Play UNO Flip Memory Match"
          onClick={onOpenGame}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenGame();
            }
          }}
          onMouseEnter={() => setHovered("gamepad")}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered("gamepad")}
          onBlur={() => setHovered(null)}
          animate={{
            y: gamepadActive ? -12 : 0,
            rotate: gamepadActive ? -3 : -1,
          }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
          className="cursor-pointer outline-none"
        >
          <image
            href="/assets/gamepad-controller.svg"
            x="194"
            y="363"
            width="108"
            height="91"
            preserveAspectRatio="xMidYMid meet"
          />
        </motion.g>
        <polygon points="94,454 334,474 346,486 106,466" fill="#414650" />
        <polygon points="346,474 574,454 586,466 346,486" fill="#30343b" />
      </svg>
    </section>
  );
}
