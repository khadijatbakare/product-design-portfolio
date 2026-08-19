import type { CardFace, DarkColor, DarkFace, LightColor, UnoFlipCard } from './types'

export const colorMapping: Record<LightColor, DarkColor> = { red: 'pink', yellow: 'orange', green: 'teal', blue: 'purple' }
export const faceMapping: Record<string, DarkFace> = { '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9', skip:'skip-everyone', reverse:'reverse', 'draw-one':'draw-five', wild:'wild', 'wild-draw-two':'wild-draw-color' }
const reverseColors: Record<DarkColor, LightColor> = { pink: 'red', orange: 'yellow', teal: 'green', purple: 'blue' }
const reverseFaces: Record<string, CardFace> = { '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9', 'skip-everyone':'skip', reverse:'reverse', 'draw-five':'draw-one', wild:'wild', 'wild-draw-color':'wild-draw-two' }
const iconFor = (face: CardFace) => face === 'reverse' ? '⇄' : face.includes('skip') ? '⊘' : face === 'draw-one' ? '+1' : face === 'draw-five' ? '+5' : String(face)
const label = (side: 'light'|'dark', color: string, face: CardFace) => `${side === 'dark' ? 'Dark Side ' : ''}${color[0].toUpperCase()}${color.slice(1)} ${face.replaceAll('-', ' ')}`
export const toDark = (card: UnoFlipCard): UnoFlipCard => { const color = colorMapping[card.color as LightColor]; const face = faceMapping[card.face]; return { ...card, side: 'dark', color, face, icon: iconFor(face), value: label('dark', color, face) } }
export const toLight = (card: UnoFlipCard): UnoFlipCard => { const color = reverseColors[card.color as DarkColor]; const face = reverseFaces[card.face]; return { ...card, side: 'light', color, face, icon: iconFor(face), value: label('light', color, face) } }
