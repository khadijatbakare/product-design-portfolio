import { createRng, generateGrid } from "./deck";
import { toDark } from "./mapping";
import type {
  CpuConfig,
  CpuMemory,
  DifficultyPreset,
  GameEvent,
  GameOptions,
  GameState,
  Player,
} from "./types";

export const REVEAL_MS = { match: 520, mismatch: 900 } as const;
export const DIFFICULTY_PRESETS: Record<DifficultyPreset, CpuConfig> = {
  casual: { retention: 0.35, decay: 4, thinkMs: 850, remapsOnFlip: false },
  even: { retention: 0.55, decay: 6, thinkMs: 800, remapsOnFlip: false },
  sharp: { retention: 0.8, decay: 12, thinkMs: 750, remapsOnFlip: true },
  eidetic: { retention: 1, decay: Infinity, thinkMs: 700, remapsOnFlip: true },
};
const emptyMemory = (): CpuMemory => ({
  seen: new Map(),
  recordedOn: new Map(),
});

export function initGame(options: GameOptions): GameState {
  const mode = options.mode ?? "solo";
  const difficulty = options.difficulty ?? "even";
  return {
    status: "idle",
    grid: generateGrid(options),
    selected: [],
    lastOutcome: null,
    moves: 0,
    matches: 0,
    sideFlipUsed: false,
    resumeTo: "idle",
    mode,
    currentPlayer: "human",
    scores: { human: { matches: 0, moves: 0 }, cpu: { matches: 0, moves: 0 } },
    turn: 0,
    cpu: { config: DIFFICULTY_PRESETS[difficulty], memory: emptyMemory() },
    flipOwner: "human",
    rngCursor: 0,
    difficulty,
  };
}

export function isFlipAvailable(state: GameState): boolean {
  return (
    state.grid.side === "light" &&
    !state.sideFlipUsed &&
    (state.status === "idle" || state.status === "oneFlipped") &&
    (state.mode === "solo" ||
      state.currentPlayer === "human" ||
      state.flipOwner === "contested")
  );
}
const other = (player: Player): Player =>
  player === "human" ? "cpu" : "human";
const liveMemory = (state: GameState) =>
  [...state.cpu.memory.seen.entries()].filter(
    ([index]) =>
      state.grid.cells[index]?.status === "face-down" &&
      state.turn - (state.cpu.memory.recordedOn.get(index) ?? 0) <=
        state.cpu.config.decay,
  );
const pick = (items: readonly number[], state: GameState) =>
  items[
    Math.floor(createRng(state.grid.seed ^ state.rngCursor)() * items.length)
  ];

export function chooseCpuMove(state: GameState): number {
  const live = state.grid.cells
    .filter((cell) => cell.status === "face-down")
    .map((cell) => cell.index);
  const known = liveMemory(state);
  if (state.selected.length === 0) {
    const groups = new Map<string, number[]>();
    known.forEach(([index, pair]) =>
      groups.set(pair, [...(groups.get(pair) ?? []), index]),
    );
    const pair = [...groups.values()].find((indices) => indices.length > 1);
    if (pair) return pair[0];
  } else {
    const first = state.grid.cells[state.selected[0]];
    const partner = known.find(
      ([index, pair]) => index !== first.index && pair === first.card.pairId,
    );
    if (partner) return partner[0];
  }
  const unexplored = live.filter((index) => !state.cpu.memory.seen.has(index));
  return pick(unexplored.length ? unexplored : live, state);
}

function recordReveal(
  state: GameState,
  index: number,
  cursor: number,
): CpuMemory {
  const seen = new Map(state.cpu.memory.seen);
  const recordedOn = new Map(state.cpu.memory.recordedOn);
  if (createRng(state.grid.seed ^ cursor)() < state.cpu.config.retention) {
    seen.set(index, state.grid.cells[index].card.pairId);
    recordedOn.set(index, state.turn);
  }
  return { seen, recordedOn };
}
function forgetUnmatched(state: GameState): CpuMemory {
  const seen = new Map<number, string>();
  const recordedOn = new Map<number, number>();
  state.grid.cells
    .filter((cell) => cell.status === "matched")
    .forEach((cell) => {
      seen.set(cell.index, cell.card.pairId);
      recordedOn.set(cell.index, state.turn);
    });
  return { seen, recordedOn };
}

export function reducer(state: GameState, event: GameEvent): GameState {
  if (event.type === "RESET")
    return initGame({
      columns: state.grid.columns,
      rows: state.grid.rows,
      seed: event.seed ?? state.grid.seed + 1,
      mode: event.mode ?? state.mode,
      difficulty: event.difficulty ?? state.difficulty,
    });
  if (state.status === "complete") return state;
  if (event.type === "TRIGGER_SIDE_FLIP") {
    if (!isFlipAvailable(state)) return state;
    const resumeTo = state.status === "oneFlipped" ? "oneFlipped" : "idle";
    const memory = state.cpu.config.remapsOnFlip
      ? state.cpu.memory
      : forgetUnmatched(state);
    return {
      ...state,
      status: "sideFlipping",
      resumeTo,
      sideFlipUsed: true,
      cpu: { ...state.cpu, memory },
      grid: {
        ...state.grid,
        side: "dark",
        cells: state.grid.cells.map((cell) => ({
          ...cell,
          card: toDark(cell.card),
        })),
        flipCard: toDark(state.grid.flipCard),
      },
    };
  }
  if (event.type === "SIDE_FLIP_COMPLETE")
    return state.status === "sideFlipping"
      ? { ...state, status: state.resumeTo }
      : state;
  if (event.type === "FLIP_CARD") {
    if (state.status !== "idle" && state.status !== "oneFlipped") return state;
    const by = event.by ?? "human";
    if (state.mode === "versus" && by !== state.currentPlayer) return state;
    const cell = state.grid.cells[event.index];
    if (!cell || cell.status !== "face-down" || !cell.card.isMatchable)
      return state;
    const choiceCost = by === "cpu" ? 1 : 0;
    const memory = recordReveal(
      state,
      event.index,
      state.rngCursor + choiceCost,
    );
    const rngCursor = state.rngCursor + choiceCost + 1;
    const cells = state.grid.cells.map((item) =>
      item.index === event.index
        ? { ...item, status: "face-up" as const }
        : item,
    );
    if (state.status === "idle")
      return {
        ...state,
        status: "oneFlipped",
        selected: [event.index],
        grid: { ...state.grid, cells },
        cpu: { ...state.cpu, memory },
        rngCursor,
      };
    const outcome =
      state.grid.cells[state.selected[0]].card.pairId === cell.card.pairId
        ? "match"
        : "mismatch";
    const scores = {
      ...state.scores,
      [by]: { ...state.scores[by], moves: state.scores[by].moves + 1 },
    };
    return {
      ...state,
      status: "twoFlipped",
      selected: [...state.selected, event.index],
      lastOutcome: outcome,
      moves: state.moves + 1,
      grid: { ...state.grid, cells },
      cpu: { ...state.cpu, memory },
      scores,
      rngCursor,
    };
  }
  if (
    event.type === "RESOLVE" &&
    state.status === "twoFlipped" &&
    state.lastOutcome
  ) {
    const selected = new Set(state.selected);
    const match = state.lastOutcome === "match";
    const cells = state.grid.cells.map((cell) =>
      selected.has(cell.index)
        ? {
            ...cell,
            status: match ? ("matched" as const) : ("face-down" as const),
          }
        : cell,
    );
    const matches = state.matches + (match ? 1 : 0);
    const player = state.currentPlayer;
    const scores = match
      ? {
          ...state.scores,
          [player]: {
            ...state.scores[player],
            matches: state.scores[player].matches + 1,
          },
        }
      : state.scores;
    const turn = state.turn + (match ? 0 : 1);
    const currentPlayer = match ? player : other(player);
    const status = matches === state.grid.pairCount ? "complete" : "idle";
    return {
      ...state,
      status,
      grid: { ...state.grid, cells },
      selected: [],
      lastOutcome: null,
      matches,
      scores,
      turn,
      currentPlayer,
      resumeTo: status,
    };
  }
  return state;
}
