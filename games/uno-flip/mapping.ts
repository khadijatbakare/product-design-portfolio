import type {
  CardColor,
  CardFace,
  DarkAction,
  DarkColor,
  DarkWild,
  LightAction,
  LightColor,
  LightWild,
  Side,
  UnoFlipCard,
} from "./types";

export const LIGHT_TO_DARK_COLOR: Record<LightColor, DarkColor> = {
  red: "pink",
  green: "teal",
  yellow: "orange",
  blue: "purple",
};
export const DARK_TO_LIGHT_COLOR: Record<DarkColor, LightColor> = {
  pink: "red",
  teal: "green",
  orange: "yellow",
  purple: "blue",
};
export const LIGHT_TO_DARK_FACE: Record<
  LightAction | LightWild,
  DarkAction | DarkWild
> = {
  skip: "skip-everyone",
  reverse: "reverse",
  "draw-one": "draw-five",
  wild: "wild",
  "wild-draw-two": "wild-draw-color",
};
const DARK_TO_LIGHT_FACE: Record<
  DarkAction | DarkWild,
  LightAction | LightWild
> = {
  "skip-everyone": "skip",
  reverse: "reverse",
  "draw-five": "draw-one",
  wild: "wild",
  "wild-draw-color": "wild-draw-two",
};
const isNumber = (face: CardFace) => /^[0-9]$/.test(face);
const words: Record<string, string> = {
  "draw-one": "Draw One",
  "draw-five": "Draw Five",
  skip: "Skip",
  "skip-everyone": "Skip Everyone",
  reverse: "Reverse",
  wild: "Wild",
  "wild-draw-two": "Wild Draw Two",
  "wild-draw-color": "Wild Draw Color",
};
export function formatValue(
  color: CardColor,
  face: CardFace,
  side: Side,
): string {
  const colorName = color[0].toUpperCase() + color.slice(1);
  const faceName = isNumber(face) ? face : words[face];
  return `${side === "dark" ? "Dark Side " : ""}${colorName} ${faceName}`;
}
export function formatIcon(face: CardFace): string {
  if (isNumber(face)) return face;
  return (
    {
      "draw-one": "+1",
      "draw-five": "+5",
      skip: "⊘",
      "skip-everyone": "⊘⊘",
      reverse: "⇄",
      wild: "★",
      "wild-draw-two": "★2",
      "wild-draw-color": "★?",
    } as Record<string, string>
  )[face];
}
export function toDark(card: UnoFlipCard): UnoFlipCard {
  const color = LIGHT_TO_DARK_COLOR[card.color as LightColor];
  const face = isNumber(card.face)
    ? card.face
    : LIGHT_TO_DARK_FACE[card.face as LightAction | LightWild];
  return {
    ...card,
    side: "dark",
    color,
    face,
    value: card.isMatchable
      ? formatValue(color, face, "dark")
      : "Dark Side FLIP Card",
    icon: card.isMatchable ? formatIcon(face) : "⇄",
  };
}
export function toLight(card: UnoFlipCard): UnoFlipCard {
  const color = DARK_TO_LIGHT_COLOR[card.color as DarkColor];
  const face = isNumber(card.face)
    ? card.face
    : DARK_TO_LIGHT_FACE[card.face as DarkAction | DarkWild];
  return {
    ...card,
    side: "light",
    color,
    face,
    value: card.isMatchable ? formatValue(color, face, "light") : "FLIP Card",
    icon: card.isMatchable ? formatIcon(face) : "⇄",
  };
}
export const MAPPING_TABLE = [
  { light: "Red", dark: "Pink" },
  { light: "Green", dark: "Teal" },
  { light: "Yellow", dark: "Orange" },
  { light: "Blue", dark: "Purple" },
  { light: "Number 0–9", dark: "Same number" },
  { light: "Draw One", dark: "Draw Five" },
  { light: "Skip", dark: "Skip Everyone" },
  { light: "Reverse", dark: "Reverse" },
  { light: "Wild", dark: "Wild" },
  { light: "Wild Draw Two", dark: "Wild Draw Color" },
] as const;
