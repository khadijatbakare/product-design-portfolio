"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  chooseCpuMove,
  initGame,
  reducer,
  REVEAL_MS,
  type DifficultyPreset,
  type GameMode,
  type GameOptions,
  type GameState,
} from "@/games/uno-flip";
import { SpreadLeft } from "./SpreadLeft";
import { SpreadRight } from "./SpreadRight";

export interface UnoFlipModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly columns?: number;
  readonly rows?: number;
  readonly seed?: number;
  readonly mode?: GameMode;
  readonly difficulty?: DifficultyPreset;
}
const randomSeed = () =>
  typeof crypto !== "undefined"
    ? crypto.getRandomValues(new Uint32Array(1))[0]
    : Date.now() >>> 0;
const serialize = (state: GameState) =>
  JSON.stringify(state, (_key, value) =>
    value instanceof Map
      ? { __map: [...value.entries()] }
      : value === Infinity
        ? "__Infinity"
        : value,
  );
const deserialize = (value: string) =>
  JSON.parse(value, (_key, item) =>
    item && typeof item === "object" && "__map" in item
      ? new Map(item.__map)
      : item === "__Infinity"
        ? Infinity
        : item,
  ) as GameState;

export function UnoFlipModal({
  open,
  onClose,
  columns = 4,
  rows = 4,
  seed,
  mode = "solo",
  difficulty = "even",
}: UnoFlipModalProps) {
  const [dealSeed] = useState(() => seed ?? randomSeed());
  const options: GameOptions = {
    columns,
    rows,
    seed: dealSeed,
    mode,
    difficulty,
  };
  const storageKey = `khadijat-uno-flip-${mode}-${difficulty}-${columns}x${rows}-v6`;
  const [state, dispatch] = useReducer(reducer, options, (initial) => {
    if (typeof window === "undefined") return initGame(initial);
    const saved = window.localStorage.getItem(storageKey);
    return saved ? deserialize(saved) : initGame(initial);
  });
  const reduced = useReducedMotion();
  const modalRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(storageKey, serialize(state));
  }, [state, storageKey]);
  useEffect(() => {
    if (state.status !== "twoFlipped") return;
    const ms = reduced
      ? state.lastOutcome === "mismatch"
        ? 300
        : 1
      : state.lastOutcome === "match"
        ? REVEAL_MS.match
        : REVEAL_MS.mismatch;
    const timer = window.setTimeout(() => dispatch({ type: "RESOLVE" }), ms);
    return () => window.clearTimeout(timer);
  }, [state.status, state.lastOutcome, reduced]);
  useEffect(() => {
    if (state.status !== "sideFlipping") return;
    const timer = window.setTimeout(
      () => dispatch({ type: "SIDE_FLIP_COMPLETE" }),
      reduced ? 1 : 700,
    );
    return () => window.clearTimeout(timer);
  }, [state.status, reduced]);
  useEffect(() => {
    if (
      state.mode !== "versus" ||
      state.currentPlayer !== "cpu" ||
      (state.status !== "idle" && state.status !== "oneFlipped")
    )
      return;
    const timer = window.setTimeout(
      () =>
        dispatch({ type: "FLIP_CARD", index: chooseCpuMove(state), by: "cpu" }),
      reduced ? 1 : state.cpu.config.thinkMs,
    );
    return () => window.clearTimeout(timer);
  }, [
    state.mode,
    state.currentPlayer,
    state.status,
    state.turn,
    state.selected.length,
    state.rngCursor,
    reduced,
  ]);
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const modal = modalRef.current;
    modal?.querySelector<HTMLElement>("button, a")?.focus();
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modal) return;
      const items = [
        ...modal.querySelectorAll<HTMLElement>(
          'button:not(:disabled), select:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", keys);
    return () => {
      window.removeEventListener("keydown", keys);
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  const cpuCell =
    state.currentPlayer === "cpu" && state.selected.length
      ? state.grid.cells[state.selected[state.selected.length - 1]]
      : null;
  const announcement =
    state.status === "twoFlipped"
      ? state.lastOutcome === "match"
        ? `Match — ${state.grid.cells[state.selected[0]].card.value}.`
        : "No match."
      : cpuCell
        ? `The Librarian turned row ${Math.floor(cpuCell.index / state.grid.columns) + 1} column ${(cpuCell.index % state.grid.columns) + 1}, ${cpuCell.card.value}.`
        : state.status === "complete"
          ? "Game complete."
          : state.mode === "versus"
            ? `${state.currentPlayer === "human" ? "Your" : "The Librarian’s"} turn.`
            : "";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-[#111217]/85 p-0 backdrop-blur-md sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="uno-title"
        >
          <motion.section
            ref={modalRef}
            className="open-book relative grid h-[100dvh] max-h-[100dvh] w-full max-w-6xl grid-cols-1 overflow-y-auto bg-[#FAF8F4] shadow-2xl sm:rounded-md md:h-[85vh] md:max-h-[85vh] md:grid-cols-[1.25fr_.75fr] md:overflow-hidden"
            initial={{ scale: 0.9, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
          >
            <nav className="absolute inset-x-0 top-0 z-20 flex justify-end border-b border-black/10 bg-[#FAF8F4]/95 px-5 py-3">
              <button
                onClick={onClose}
                className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"
              >
                <X size={14} /> Close Easter Egg
              </button>
            </nav>
            <SpreadLeft
              state={state}
              onFlip={(index) =>
                dispatch({ type: "FLIP_CARD", index, by: "human" })
              }
            />
            <SpreadRight
              state={state}
              onTriggerFlip={() => dispatch({ type: "TRIGGER_SIDE_FLIP" })}
              onReset={() => dispatch({ type: "RESET" })}
              onSetupChange={(next) => dispatch({ type: "RESET", ...next })}
            />
            <p className="sr-only" aria-live="polite">
              {announcement}
            </p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
