"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { GameGrid } from "@/games/uno-flip";
import { CardCell, GridColumnsContext } from "./CardCell";

export function CardGrid({
  grid,
  disabled,
  onFlip,
  busy = false,
}: {
  readonly grid: GameGrid;
  readonly disabled: boolean;
  readonly onFlip: (index: number) => void;
  readonly busy?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <GridColumnsContext.Provider value={grid.columns}>
      <AnimatePresence mode="wait">
        <motion.div
          key={grid.side}
          aria-busy={busy}
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
            perspective: 1000,
          }}
          initial={
            reduced
              ? { opacity: 0 }
              : { rotateY: -90, filter: "brightness(2) saturate(1.8)" }
          }
          animate={
            reduced
              ? { opacity: 1 }
              : { rotateY: 0, filter: "brightness(1) saturate(1)" }
          }
          exit={
            reduced
              ? { opacity: 0 }
              : { rotateY: 90, filter: "brightness(2) saturate(1.8)" }
          }
          transition={{ duration: reduced ? 0.01 : 0.5 }}
        >
          {grid.cells.map((cell) => (
            <CardCell
              key={cell.card.id}
              cell={cell}
              disabled={disabled}
              onFlip={onFlip}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </GridColumnsContext.Provider>
  );
}
