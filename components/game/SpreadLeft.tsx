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
    <main className="flex flex-col justify-center p-6 pt-20 md:p-10 md:pt-24">
      <CardGrid
        grid={state.grid}
        disabled={disabled}
        busy={cpuTurn}
        onFlip={onFlip}
      />
    </main>
  );
}
