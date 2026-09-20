/**
 * gameLogic.js
 * ---------------------------------------------------------
 * Pure game rules for Snake–Water–Gun.
 * This module has ZERO knowledge of the DOM, timers, or the
 * page. That separation means every function here can be
 * unit-tested in isolation (e.g. with Jest) without a browser.
 * ---------------------------------------------------------
 */

import { CHOICES, BEATS } from "./config.js";

/**
 * Randomly selects the computer's move.
 * @returns {"S"|"W"|"G"} one of the three valid choice codes.
 */
export function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

/**
 * Validates that a value is one of the accepted choice codes.
 * @param {string} choice
 * @returns {boolean}
 */
export function isValidChoice(choice) {
  return CHOICES.includes(choice);
}

/**
 * Determines the outcome of a single round.
 * @param {"S"|"W"|"G"} userChoice
 * @param {"S"|"W"|"G"} compChoice
 * @returns {"win"|"lose"|"draw"} outcome from the user's perspective.
 */
export function resolveRound(userChoice, compChoice) {
  if (userChoice === compChoice) {
    return "draw";
  }
  return BEATS[userChoice] === compChoice ? "win" : "lose";
}
