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
          className="mx-auto grid max-h-full gap-2.5 md:h-full md:w-auto md:max-w-full"
          style={{
            gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${grid.rows}, minmax(0, 1fr))`,
            aspectRatio: `${grid.columns} / ${grid.rows * 1.5}`,
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
