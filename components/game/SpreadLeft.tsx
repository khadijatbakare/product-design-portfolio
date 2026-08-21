import { AnimatePresence, motion } from "framer-motion";
import type { GameState } from "@/games/uno-flip";
import { CardGrid } from "./CardGrid";
export function SpreadLeft({
  state,
  onFlip,
}: {
  readonly state: GameState;
  readonly onFlip: (index: number) => void;
}) {
  const cpuTurn = state.mode === "versus" && state.currentPlayer === "cpu";
  const disabled =
    cpuTurn || (state.status !== "idle" && state.status !== "oneFlipped");
  return (
    <main className="relative flex min-h-0 flex-col justify-center overflow-hidden p-6 pt-20 md:p-7 md:pt-16">
      <AnimatePresence>
        {cpuTurn && (
          <motion.p
            className="absolute top-14 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-black/15 bg-[#faf8f4]/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest shadow-sm"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            The Librarian is thinking…
          </motion.p>
        )}
      </AnimatePresence>
      <CardGrid
        grid={state.grid}
        disabled={disabled}
        busy={cpuTurn}
        onFlip={onFlip}
      />
    </main>
  );
}
