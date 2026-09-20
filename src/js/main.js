/**
 * main.js
 * ---------------------------------------------------------
 * Application entry point. This is the ONLY file that owns
 * mutable game state (userScore, compScore, rounds). It wires
 * gameLogic.js (rules) together with ui.js (rendering) but
 * contains no rules and no direct DOM queries of its own.
 * ---------------------------------------------------------
 */

import { REVEAL_DELAY_MS } from "./config.js";
import { getComputerChoice, resolveRound } from "./gameLogic.js";
import {
  setPicksDisabled,
  onPickSelected,
  onResetClicked,
  renderDuel,
  renderOutcome,
  renderScores,
  renderResultText,
  addLogChip,
  renderReset,
} from "./ui.js";

// ---- Mutable application state -----------------------------------------
const state = {
  userScore: 0,
  compScore: 0,
  rounds: 0,
};

/**
 * Runs a single round of the game for a given user choice:
 * 1. Locks the buttons so the player can't double-click mid-animation.
 * 2. Rolls the computer's choice and plays the reveal animation.
 * 3. After the animation delay, resolves the winner, updates state,
 *    and re-renders the scoreboard/result/log.
 * 4. Unlocks the buttons for the next round.
 */
function playRound(userChoice) {
  setPicksDisabled(true);

  const compChoice = getComputerChoice();
  renderDuel(userChoice, compChoice);

  state.rounds += 1;

  setTimeout(() => {
    const outcome = resolveRound(userChoice, compChoice);

    if (outcome === "win") {
      state.userScore += 1;
    } else if (outcome === "lose") {
      state.compScore += 1;
    }

    renderOutcome(outcome);
    renderScores(state);
    renderResultText(outcome, userChoice, compChoice);
    addLogChip(outcome);

    setPicksDisabled(false);
  }, REVEAL_DELAY_MS);
}

/** Resets in-memory state and the board back to their starting values. */
function resetGame() {
  state.userScore = 0;
  state.compScore = 0;
  state.rounds = 0;
  renderReset();
}

// ---- Wire up event listeners --------------------------------------------
onPickSelected(playRound);
onResetClicked(resetGame);
