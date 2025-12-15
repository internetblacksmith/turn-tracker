/**
 * Game state types for MTG Turn Tracker
 */

export interface Player {
  name: string;
  life: number;
}

export interface GameState {
  // Phase tracking (0-4 for the 5 MTG phases)
  currentPhaseIndex: number;
  // Sub-phase tracking (varies per phase, 0 if no sub-phases)
  currentSubPhaseIndex: number;
  // Turn counter (incremented each round)
  turns: number;
  // Player data (tuple of exactly 2 players for type safety)
  players: [Player, Player];
  // Active player (0 or 1, maps to array index)
  activePlayerIndex: 0 | 1;
}

export type PlayerIndex = 0 | 1;
export type PlayerNumber = 1 | 2;

/**
 * Convert between 0-1 player index and 1-2 player number
 */
export const indexToNumber = (index: PlayerIndex): PlayerNumber => (index + 1) as PlayerNumber;
export const numberToIndex = (number: PlayerNumber): PlayerIndex => (number - 1) as PlayerIndex;
