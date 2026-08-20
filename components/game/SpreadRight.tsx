import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import {
  MAPPING_TABLE,
  isFlipAvailable,
  type DifficultyPreset,
  type GameMode,
  type GameState,
  type Player,
  type PlayerScore,
  type UnoFlipCard,
} from "@/games/uno-flip";

export interface FlipCardControlProps {
  readonly card: UnoFlipCard;
  readonly available: boolean;
  readonly onTrigger: () => void;
}
export interface TurnIndicatorProps {
  readonly currentPlayer: Player;
  readonly thinking: boolean;
}
export interface ScoreboardProps {
  readonly mode: GameMode;
  readonly scores: Readonly<Record<Player, PlayerScore>>;
  readonly currentPlayer: Player;
  readonly pairCount: number;
}
export interface GameSetupProps {
  readonly mode: GameMode;
  readonly difficulty: DifficultyPreset;
  readonly onChange: (next: {
    mode: GameMode;
    difficulty: DifficultyPreset;
  }) => void;
  readonly locked: boolean;
}
export function TurnIndicator({ currentPlayer, thinking }: TurnIndicatorProps) {
  return (
    <p className="mt-4 font-mono text-[9px] uppercase tracking-widest">
      {currentPlayer === "human"
        ? "Your turn"
        : `The Librarian${thinking ? " is thinking…" : " plays"}`}
    </p>
  );
}
export function Scoreboard({
  mode,
  scores,
  currentPlayer,
  pairCount,
}: ScoreboardProps) {
  if (mode === "solo") return <div />;
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {(["human", "cpu"] as const).map((player) => (
        <div
          key={player}
          className={`border p-3 ${currentPlayer === player ? "border-black" : "border-black/15"}`}
        >
          <p className="font-mono text-[8px] uppercase">
            {player === "human" ? "You" : "The Librarian"}
          </p>
          <p className="mt-2 font-serif text-2xl">
            {scores[player].matches}/{pairCount}
          </p>
          <p className="text-[9px]">{scores[player].moves} moves</p>
        </div>
      ))}
    </div>
  );
}
export function GameSetup({
  mode,
  difficulty,
  onChange,
  locked,
}: GameSetupProps) {
  return (
    <fieldset
      disabled={locked}
      className="mt-5 grid grid-cols-2 gap-2 font-mono text-[8px] uppercase disabled:opacity-50"
    >
      <label className="grid gap-1">
        Mode
        <select
          value={mode}
          onChange={(event) =>
            onChange({ mode: event.target.value as GameMode, difficulty })
          }
          className="border border-black/20 bg-transparent px-2 py-1.5"
        >
          <option value="solo">Solo</option>
          <option value="versus">Versus</option>
        </select>
      </label>
      <label className="grid gap-1">
        Difficulty
        <select
          value={difficulty}
          onChange={(event) =>
            onChange({
              mode,
              difficulty: event.target.value as DifficultyPreset,
            })
          }
          className="border border-black/20 bg-transparent px-2 py-1.5"
        >
          <option value="casual">Casual</option>
          <option value="even">Even</option>
          <option value="sharp">Sharp</option>
          <option value="eidetic">Eidetic</option>
        </select>
      </label>
    </fieldset>
  );
}
export function FlipCardControl({
  card,
  available,
  onTrigger,
}: FlipCardControlProps) {
  return (
    <button
      type="button"
      disabled={!available}
      onClick={onTrigger}
      className="mt-7 rounded-xl border-2 border-[#7250ad] bg-[#7250ad] p-5 text-left text-white disabled:cursor-not-allowed disabled:opacity-45"
    >
      <p className="font-mono text-xs font-bold">{card.icon} FLIP</p>
      <p className="mt-3 text-sm leading-6">
        {available
          ? "Available once. Use it before or after revealing the first card."
          : "Unavailable for this turn."}
      </p>
    </button>
  );
}
export function MappingTable() {
  return (
    <section className="mt-7">
      <p className="font-mono text-[8px] uppercase tracking-widest">
        Light ↔ Dark
      </p>
      <div className="mt-3 max-h-36 space-y-2 overflow-y-auto">
        {MAPPING_TABLE.map((row) => (
          <div
            key={row.light}
            className="flex justify-between border-b border-dashed border-black/15 pb-1 font-mono text-[9px]"
          >
            <span>{row.light}</span>
            <span>→</span>
            <span>{row.dark}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export function WinPanel({ state }: { readonly state: GameState }) {
  if (state.status !== "complete") return null;
  const winner =
    state.mode === "versus"
      ? state.scores.human.matches > state.scores.cpu.matches
        ? "You beat The Librarian."
        : "The Librarian takes this one."
      : "Shelf cleared.";
  return (
    <motion.div
      className="mt-7 border border-black/20 bg-white/70 p-5 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="font-serif text-3xl">{winner}</p>
      <p className="mt-2 text-sm">All pairs matched in {state.moves} moves.</p>
    </motion.div>
  );
}
export function SpreadRight({
  state,
  onTriggerFlip,
  onReset,
  onSetupChange,
}: {
  readonly state: GameState;
  readonly onTriggerFlip: () => void;
  readonly onReset: () => void;
  readonly onSetupChange: (next: {
    mode: GameMode;
    difficulty: DifficultyPreset;
  }) => void;
}) {
  return (
    <aside className="flex flex-col bg-black/[.035] p-8 pt-20 md:p-10 md:pt-24">
      <p className="font-mono text-[9px] uppercase tracking-[.2em]">
        Game index / seeded {state.grid.seed}
      </p>
      <h2 id="uno-title" className="mt-5 font-serif text-5xl leading-none">
        UNO Flip
        <br />
        <em>Match.</em>
      </h2>
      {state.mode === "versus" && (
        <TurnIndicator
          currentPlayer={state.currentPlayer}
          thinking={
            state.currentPlayer === "cpu" &&
            (state.status === "idle" || state.status === "oneFlipped")
          }
        />
      )}
      <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-black/15 py-5">
        <div>
          <dt className="font-mono text-[8px] uppercase">Moves</dt>
          <dd className="font-serif text-3xl">{state.moves}</dd>
        </div>
        <div>
          <dt className="font-mono text-[8px] uppercase">Pairs</dt>
          <dd className="font-serif text-3xl">
            {state.matches}/{state.grid.pairCount}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[8px] uppercase">Side</dt>
          <dd className="mt-2 font-mono text-xs uppercase">
            {state.grid.side}
          </dd>
        </div>
      </dl>
      <Scoreboard
        mode={state.mode}
        scores={state.scores}
        currentPlayer={state.currentPlayer}
        pairCount={state.grid.pairCount}
      />
      <GameSetup
        mode={state.mode}
        difficulty={state.difficulty}
        locked={state.moves > 0 || state.selected.length > 0}
        onChange={onSetupChange}
      />
      <FlipCardControl
        card={state.grid.flipCard}
        available={isFlipAvailable(state)}
        onTrigger={onTriggerFlip}
      />
      <MappingTable />
      <WinPanel state={state} />
      <button
        onClick={onReset}
        className="mt-auto flex w-fit items-center gap-2 pt-8 font-mono text-[9px] uppercase tracking-widest"
      >
        <RotateCcw size={14} /> New seeded game
      </button>
    </aside>
  );
}
