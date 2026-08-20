"use client";
import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CardColor, GridCell } from "@/games/uno-flip";

export interface CardCellProps {
  readonly cell: GridCell;
  readonly disabled: boolean;
  readonly onFlip: (index: number) => void;
}
export const GridColumnsContext = createContext(1);
const colorMap: Record<CardColor, string> = {
  red: "bg-[#e53935] text-white",
  blue: "bg-[#1e88e5] text-white",
  green: "bg-[#43a047] text-white",
  yellow: "bg-[#fdd835] text-neutral-900",
  pink: "bg-[#d81b60] text-white",
  teal: "bg-[#00897b] text-white",
  orange: "bg-[#fb8c00] text-white",
  purple: "bg-[#8e24aa] text-white",
};

export function CardCell({ cell, disabled, onFlip }: CardCellProps) {
  const columns = useContext(GridColumnsContext);
  const reduced = useReducedMotion();
  const faceUp = cell.status !== "face-down";
  const card = cell.card;
  const row = Math.floor(cell.index / columns) + 1;
  const column = (cell.index % columns) + 1;
  return (
    <motion.button
      type="button"
      disabled={disabled || cell.status === "matched"}
      onClick={() => onFlip(cell.index)}
      className="relative aspect-[2/3] cursor-pointer rounded-md [perspective:1000px] disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      animate={
        reduced
          ? { opacity: faceUp ? 1 : 0.9 }
          : {
              rotateY: faceUp ? 180 : 0,
              opacity: cell.status === "matched" ? 0.38 : 1,
            }
      }
      transition={{ duration: reduced ? 0.01 : 0.3 }}
      style={{ transformStyle: "preserve-3d" }}
      aria-label={
        faceUp ? card.value : `Face-down card, row ${row} column ${column}`
      }
    >
      <span className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-white/80 bg-[#1a1a1e] shadow-md [backface-visibility:hidden]">
        <span className="grid h-[72%] w-[72%] -rotate-12 place-items-center rounded border border-neutral-600/50">
          <span className="font-mono text-[clamp(.45rem,1.2vw,.7rem)] font-bold uppercase tracking-widest text-neutral-300">
            UNO
          </span>
        </span>
      </span>
      <span
        className={`absolute inset-0 flex flex-col justify-between rounded-md border-2 border-white/80 p-[clamp(.25rem,.8vw,.45rem)] shadow-md ${colorMap[card.color]} ${reduced && !faceUp ? "opacity-0" : ""} [backface-visibility:hidden]`}
        style={{
          transform: reduced ? undefined : "rotateY(180deg)",
        }}
      >
        <span className="font-mono text-[clamp(.55rem,1.3vw,.8rem)] font-bold leading-none">
          {card.icon}
        </span>
        <span className="my-auto grid h-[58%] w-[70%] -rotate-12 place-items-center self-center rounded-[50%] bg-white/15">
          <span className="font-serif text-[clamp(.8rem,2.4vw,1.45rem)] font-black tracking-tight">
            {card.icon}
          </span>
        </span>
        <span className="self-end rotate-180 font-mono text-[clamp(.55rem,1.3vw,.8rem)] font-bold leading-none">
          {card.icon}
        </span>
      </span>
    </motion.button>
  );
}
