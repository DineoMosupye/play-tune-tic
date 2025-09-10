# Play-Tune Tic — A Modern Tic Tac Toe Game

A sleek, responsive Tic Tac Toe built with React, TypeScript, Tailwind CSS, and shadcn/ui. Enjoy subtle animations, neon-glow visuals, satisfying sound effects via the Web Audio API, and multiple theme styles.

- Live routes:
  - Home: /
  - Game: /game

## Features

- Local 2‑player mode (X vs O)
- Smart win/draw detection and highlight of winning line
- Scoreboard with wins for X, O, and draws
- Sound effects for moves, wins, draws, resets, and buttons
- Three themes (neon, classic, minimal) with persistence via localStorage
- Responsive layout with animated UI and shadcn/ui components

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui + Radix UI primitives
- React Router (routing)
- TanStack Query (ready for data fetching patterns)
- Lucide React (icons)

## Getting Started

Prerequisites:
- Node.js (v18+ recommended) and npm

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

Lint:
```bash
npm run lint
```

Optional development build (faster, with dev mode):
```bash
npm run build:dev
```

## Project Structure

```
play-tune-tic/
├─ index.html
├─ public/
│  ├─ favicon.ico
│  ├─ placeholder.svg
│  └─ robots.txt
├─ src/
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ contexts/
│  │  ├─ GameContext.tsx        # Game state, reducer, winner/draw logic, scores
│  │  └─ ThemeContext.tsx       # Theme handling (neon/classic/minimal)
│  ├─ hooks/
│  │  ├─ useModal.ts
│  │  ├─ useSound.ts            # Web Audio API sound effects
│  │  └─ use-mobile.tsx
│  ├─ components/
│  │  ├─ GameBoard.tsx          # Board rendering and cell interactions
│  │  ├─ GameStatus.tsx         # Current player / win / draw messages
│  │  ├─ ScoreBoard.tsx         # Scores for X, O, and draws
│  │  └─ ui/                    # shadcn/ui components
│  ├─ pages/
│  │  ├─ Home.tsx               # Landing page with instructions modal
│  │  ├─ Game.tsx               # Main game screen
│  │  └─ NotFound.tsx
│  └─ lib/
│     └─ utils.ts               # cn() helper
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

## How to Play

- Player X starts.
- Click any empty cell to place your mark.
- First to get 3 in a row (row, column, or diagonal) wins.
- If the board fills without a winner, it’s a draw.
- Use the buttons on the Game page to:
  - New Game: clear the board and continue the match
  - Reset Scores: zero out X, O, and draw tallies
  - Theme: cycle through neon → classic → minimal

## Theming

- Theme is persisted in localStorage under key: tic-tac-toe-theme
- Available themes: neon, classic, minimal
- The HTML root class is updated automatically; styles are defined in src/index.css via CSS variables and Tailwind utilities.
- To add a new theme:
  - Extend variables under a new class in src/index.css
  - Update the themes array in src/contexts/ThemeContext.tsx

## Sound Effects

- Implemented using the Web Audio API in src/hooks/useSound.ts
- Sound types: move, win, draw, reset, button
- If you need quieter sounds, lower the volume parameter in playBeep calls inside useSound.

Note: Some browsers require a user gesture before audio can play. Interacting with the page (click or tap) initializes audio reliably.

## Routing

- App entry: src/App.tsx
- Routes: 
  - / → Home
  - /game → Game
  - * → Not Found

## Deployment

- Static build via Vite:
  - Run npm run build to generate the dist/ folder
  - Deploy dist/ to any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Contributing

- Fork the repo and create a feature branch
- Keep PRs focused and include a clear description
- Run npm run lint before opening a PR

## Acknowledgements

- shadcn/ui and Radix UI for accessible and composable UI primitives
- Lucide for icons
- Tailwind CSS for utility-first styling

## License
