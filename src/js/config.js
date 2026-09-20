/**
 * config.js
 * ---------------------------------------------------------
 * Central configuration for the Snake–Water–Gun game.
 * Holds no logic and no DOM references — only static data.
 * Keeping this separate means a new choice (e.g. a 4th weapon)
 * only needs to be added in ONE place.
 * ---------------------------------------------------------
 */

// The three valid choice codes used throughout the app.
export const CHOICES = ["S", "W", "G"];

// Human-readable display names for each choice code.
export const NAMES = {
  S: "Snake",
  W: "Water",
  G: "Gun",
};

// Win table: BEATS[x] === y means "x beats y".
// S beats W (snake drinks water)
// W beats G (water jams the gun)
// G beats S (gun kills the snake)
export const BEATS = {
  S: "W",
  W: "G",
  G: "S",
};

// Inline SVG path data for each choice's icon, keyed by choice code.
// Centralising markup here keeps ui.js focused on rendering, not content.
export const ICONS = {
  S: `<path d="M10 30c0-8 6-16 14-16 6 0 8 5 8 9s-3 6-6 6-4-2-4-5" stroke="#c8e356" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="20" r="3.4" fill="#c8e356"/>
      <path d="M8 32c2 4 6 6 10 5" stroke="#c8e356" stroke-width="3" stroke-linecap="round"/>`,
  W: `<path d="M24 8c6 9 11 15.5 11 21.5A11 11 0 1 1 13 29.5C13 23.5 18 17 24 8Z" stroke="#4fa9e8" stroke-width="3" stroke-linejoin="round"/>`,
  G: `<path d="M8 26h18l4-5h6v5h4v6h-8l-3 5h-9v-6H8z" stroke="#d98c4a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M14 32v5" stroke="#d98c4a" stroke-width="3" stroke-linecap="round"/>`,
};

// Duration (ms) the "pop" reveal animation is allowed to play
// before the result text/scores are committed. Kept in config
// so ui.js and gameLogic.js never hard-code a "magic number".
export const REVEAL_DELAY_MS = 420;

// Maximum number of round-history chips kept on screen at once.
export const MAX_LOG_CHIPS = 20;
