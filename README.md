# Khadijat Bakare — Product Design Portfolio

A narrative-driven portfolio for Khadijat Bakare, a product and founding designer specialising in design systems, product architecture, and end-to-end product flows.

The site is designed as a personal library. Four illustrated volumes open into project case studies, field notes, an about story, and an on-site résumé. An illustrated gamepad hidden on the shelf opens a deterministic UNO Flip memory game.

## Built with

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run typecheck
npm run build
```

## Content model

Portfolio copy and structured data live in [`data/content.ts`](./data/content.ts). It contains the volumes, projects, about story, résumé, and checkout-slip footer content.

The main UI is organised around:

```text
app/                    App Router pages and routes
components/shelf/       Interactive bookshelf navigation
components/modal/       Two-page portfolio spreads
components/footer/      Library checkout-card footer
components/game/        UNO Flip game interface
games/uno-flip/         Pure game types, mapping, deck, and reducer
public/assets/          Local visual assets
```

## UNO Flip easter egg

The shelf game is separated into pure logic and presentation. Its seeded deck is reproducible, matching uses stable `pairId` values, and the Light-to-Dark transformation preserves matches even when the board flips mid-turn.

It supports solo play and a deterministic computer opponent named The Librarian, with configurable memory retention and decay.

## Résumé

The résumé can be read inside the portfolio and downloaded as a generated PDF from `/resume.pdf`.

## Deployment

The project is configured for Vercel. Build it with:

```bash
npm run build
```

The Vercel output directory should remain unset so Next.js can manage its own build output.

## Contact

- [LinkedIn](https://www.linkedin.com/in/khadijatbakare/)
- [Medium](https://khadijatbakare.medium.com/)
- [GitHub](https://github.com/khadijatbakare)
- [Email](mailto:Bakarek008@gmail.com)
