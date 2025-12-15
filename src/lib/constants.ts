import { GameState } from "@/types/game";

export interface SubPhase {
  name: string;
  description: string;
}

export interface Phase {
  name: string;
  shortName: string;
  description: string;
  subPhases?: SubPhase[];
}

export const PHASES: Phase[] = [
  {
    name: "Beginning Phase",
    shortName: "Beginning",
    description: "Prepare for your turn",
    subPhases: [
      { name: "Untap", description: "Untap all your tapped permanents. No player receives priority during this step." },
      { name: "Upkeep", description: "'At the beginning of upkeep' abilities trigger. Both players may cast instants and activate abilities." },
      { name: "Draw", description: "Draw a card. (Skip on first turn for the starting player.)" },
    ],
  },
  {
    name: "First Main Phase",
    shortName: "Main 1",
    description: "Play lands, cast creatures, sorceries, and other spells.",
  },
  {
    name: "Combat Phase",
    shortName: "Combat",
    description: "Attack with your creatures",
    subPhases: [
      { name: "Begin Combat", description: "Last chance to cast instants or activate abilities before attackers are declared." },
      { name: "Attackers", description: "Active player declares which creatures are attacking and what they target." },
      { name: "Blockers", description: "Defending player declares which creatures block each attacker." },
      { name: "Damage", description: "Combat damage is dealt simultaneously. First strike and double strike create a separate earlier damage step." },
      { name: "End Combat", description: "Last chance to cast spells or activate abilities before combat ends." },
    ],
  },
  {
    name: "Second Main Phase",
    shortName: "Main 2",
    description: "Play lands (if you haven't), cast more spells after combat.",
  },
  {
    name: "Ending Phase",
    shortName: "End",
    description: "Wrap up your turn",
    subPhases: [
      { name: "End Step", description: "'At the beginning of the end step' abilities trigger. Last chance to act before cleanup." },
      { name: "Cleanup", description: "Discard down to maximum hand size (7). All damage is removed and 'until end of turn' effects expire." },
    ],
  },
];

export const LIFE_TOTAL_PRESETS = [20, 25, 30, 40] as const;

export const DEFAULT_GAME_STATE: GameState = {
  currentPhaseIndex: 0,
  currentSubPhaseIndex: 0,
  turns: 1,
  players: [
    { name: "Player 1", life: 20 },
    { name: "Player 2", life: 20 },
  ],
  activePlayerIndex: 0,
} as const;

export const STORAGE_KEY = "mtg-turn-tracker-game-state";
