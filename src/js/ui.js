/**
 * ui.js
 * ---------------------------------------------------------
 * All DOM access lives here. gameLogic.js never touches the
 * document, and main.js never queries elements directly — it
 * always goes through this module. That keeps "what the game
 * does" and "how it's drawn" independently changeable.
 * ---------------------------------------------------------
 */

import { ICONS, NAMES, MAX_LOG_CHIPS } from "./config.js";

// Cache every element this module will touch, once, at load time.
const elements = {
  userScore: document.getElementById("userScore"),
  compScore: document.getElementById("compScore"),
  roundCount: document.getElementById("roundCount"),
  userIcon: document.getElementById("userIcon"),
  compIcon: document.getElementById("compIcon"),
  userFighter: document.getElementById("userFighter"),
  compFighter: document.getElementById("compFighter"),
  resultText: document.getElementById("resultText"),
  log: document.getElementById("log"),
  pickButtons: document.querySelectorAll(".pick"),
  resetBtn: document.getElementById("resetBtn"),
};

/** Enables or disables all choice buttons (prevents double-clicks mid-animation). */
export function setPicksDisabled(isDisabled) {
  elements.pickButtons.forEach((button) => {
    button.disabled = isDisabled;
  });
}

/** Attaches a click handler to every choice button. Handler receives the choice code. */
export function onPickSelected(handler) {
  elements.pickButtons.forEach((button) => {
    button.addEventListener("click", () => handler(button.dataset.choice));
  });
}

/** Attaches a click handler to the reset button. */
export function onResetClicked(handler) {
  elements.resetBtn.addEventListener("click", handler);
}

/** Draws both fighters' icons and replays the "pop" reveal animation. */
export function renderDuel(userChoice, compChoice) {
  // Remove previous state classes and force a reflow so the
  // "pop" animation can be re-triggered on consecutive rounds.
  elements.userFighter.classList.remove("win", "lose", "pop");
  elements.compFighter.classList.remove("win", "lose", "pop");
  void elements.userFighter.offsetWidth; // reflow hack

  elements.userIcon.innerHTML = ICONS[userChoice];
  elements.compIcon.innerHTML = ICONS[compChoice];

  elements.userFighter.classList.add("pop");
  elements.compFighter.classList.add("pop");
}

/** Applies the visual "winner glow" / "loser fade" to the correct fighter. */
export function renderOutcome(outcome) {
  if (outcome === "win") {
    elements.userFighter.classList.add("win");
    elements.compFighter.classList.add("lose");
  } else if (outcome === "lose") {
    elements.compFighter.classList.add("win");
    elements.userFighter.classList.add("lose");
  }
  // No class changes needed for "draw".
}

/** Updates the scoreboard numbers. */
export function renderScores({ userScore, compScore, rounds }) {
  elements.userScore.textContent = userScore;
  elements.compScore.textContent = compScore;
  elements.roundCount.textContent = rounds;
}

/** Writes the human-readable result sentence and colours it by outcome. */
export function renderResultText(outcome, userChoice, compChoice) {
  const you = NAMES[userChoice];
  const comp = NAMES[compChoice];

  const messages = {
    draw: `Draw — you both picked ${you}.`,
    win: `You win — ${you} beats ${comp}.`,
    lose: `Computer wins — ${comp} beats ${you}.`,
  };

  elements.resultText.textContent = messages[outcome];
  elements.resultText.className = `result ${outcome === "draw" ? "draw" : outcome === "win" ? "you" : "comp"}`;
}

/** Appends a small coloured chip to the round-history log, trimming old entries. */
export function addLogChip(outcome) {
  const chip = document.createElement("div");
  const chipLabel = { win: "W", lose: "L", draw: "D" }[outcome];

  chip.className = `chip ${outcome}`;
  chip.textContent = chipLabel;
  elements.log.appendChild(chip);

  if (elements.log.children.length > MAX_LOG_CHIPS) {
    elements.log.removeChild(elements.log.firstChild);
  }
}

/** Resets the entire board back to its initial, pre-game state. */
export function renderReset() {
  elements.userScore.textContent = "0";
  elements.compScore.textContent = "0";
  elements.roundCount.textContent = "0";
  elements.userIcon.innerHTML = "";
  elements.compIcon.innerHTML = "";
  elements.userFighter.classList.remove("win", "lose");
  elements.compFighter.classList.remove("win", "lose");
  elements.resultText.textContent = "Choose Snake, Water or Gun to start.";
  elements.resultText.className = "result";
  elements.log.innerHTML = "";
}
