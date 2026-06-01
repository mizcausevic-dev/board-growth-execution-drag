# Architecture

Board Growth Execution Drag is a static-friendly TypeScript executive-intelligence surface for showing where delivery friction, blocker accumulation, and decision latency are slowing the board-backed growth story.

## Routes

- `/`
- `/drag-lane`
- `/blocker-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample execution-drag items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores coordination latency, operating friction, decision lag, delivery reliability, and board visibility.
3. `src/services/verticalBriefService.ts` shapes the board-readable drag packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
