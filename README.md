# 🐍 Snake · Water · Gun

A polished, dependency-free browser implementation of the classic 3-way hand game **Snake–Water–Gun** (a regional variant of Rock–Paper–Scissors), played against the computer.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2015%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Frameworks](https://img.shields.io/badge/Dependencies-0-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📖 About

Snake drinks Water. Water jams the Gun. The Gun kills the Snake. Pick your weapon and see who wins the round.

This project takes a raw, monolithic script (global variables + `prompt()` / `alert()` / `confirm()` dialogs) and re-architects it into a modular, maintainable, production-style front-end app using vanilla **ES Modules** — no build tools, no frameworks, no dependencies required.

### ✨ Features

- Clean 3-choice gameplay (Snake / Water / Gun) with instant visual feedback
- Custom inline SVG icons — no external image requests
- Animated "duel" reveal with win/lose states
- Live scoreboard (You / Rounds / Computer)
- Round-by-round result history (win/lose/draw chips)
- Fully keyboard-accessible buttons with visible focus states
- Respects `prefers-reduced-motion` for accessibility
- Zero build step — open `index.html` and play

---

## 🗂️ Folder Structure

```
snake-water-gun/
├── index.html              # Markup only — no inline logic or styles
├── README.md                # This file
├── .gitignore
└── src/
    ├── css/
    │   └── style.css        # All visual styling & design tokens
    └── js/
        ├── config.js         # Static constants: choices, icons, win table
        ├── gameLogic.js      # Pure game rules (no DOM access — unit-testable)
        ├── ui.js             # All DOM reads/writes live here
        └── main.js           # Entry point — wires state + logic + UI together
```

### Why this structure?

| File           | Responsibility                                                                 |
|----------------|---------------------------------------------------------------------------------|
| `config.js`    | Single source of truth for game data (choices, icons, win rules, timings).      |
| `gameLogic.js` | Pure functions only — no `document`, no timers. Easy to unit test in isolation. |
| `ui.js`        | Owns every DOM element reference and every render/update operation.             |
| `main.js`      | Holds mutable state and orchestrates `gameLogic.js` + `ui.js`. No rules, no DOM queries of its own. |

This is a **Separation of Concerns** design: rules, rendering, and state/orchestration are each isolated, so any one of them can be changed, replaced, or tested without touching the others.

---

## 🚀 Installation & Execution

No build step, no `npm install`, no dependencies.

### Option 1 — Just open it
1. Download or clone the repository.
2. Double-click `index.html` (or open it in your browser).

> ⚠️ Because `index.html` loads JavaScript via `<script type="module">`, some browsers restrict ES Modules on the `file://` protocol. If icons/buttons don't respond, use Option 2 below.

### Option 2 — Run with a local server (recommended)

Using the VS Code **Live Server** extension:
1. Open the project folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

Using Python (already installed on most systems):
```bash
# From the project root
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Using Node.js:
```bash
npx serve .
```

---

## 🎮 How to Play

1. Click **Snake**, **Water**, or **Gun**.
2. The computer picks at random and both choices are revealed.
3. Snake beats Water · Water beats Gun · Gun beats Snake.
4. Your score, the computer's score, and total rounds update automatically.
5. Click **Reset match** at any time to start over.

---

## 🛣️ Future Improvements

- [ ] "Best of N" match mode with a final winner banner
- [ ] Sound effects on win/lose/draw
- [ ] Local two-player mode (no computer opponent)
- [ ] Persist scores across page reloads (`localStorage`)
- [ ] Unit tests for `gameLogic.js` (Jest/Vitest)
- [ ] Light/dark theme toggle

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
