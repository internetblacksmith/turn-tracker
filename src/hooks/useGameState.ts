import { useState, useEffect } from "react";
import { z } from "zod";
import { DEFAULT_GAME_STATE, STORAGE_KEY } from "@/lib/constants";
import { GameState } from "@/types/game";

const PlayerSchema = z.object({
  name: z.string().min(1).max(50),
  life: z.number().int().min(0),
});

const GameStateSchema = z.object({
  currentPhaseIndex: z.number().int().min(0).max(4),
  currentSubPhaseIndex: z.number().int().min(0),
  turns: z.number().int().min(1),
  activePlayerIndex: z.union([z.literal(0), z.literal(1)]),
  players: z.tuple([PlayerSchema, PlayerSchema]),
});

function loadGameState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return GameStateSchema.parse(JSON.parse(saved));
    }
  } catch (error) {
    console.error("Failed to load game state:", error);
  }
  return DEFAULT_GAME_STATE;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(loadGameState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error("Failed to save game state:", error);
    }
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => {
      const newState = { ...prev, ...updates };
      try {
        GameStateSchema.parse(newState);
      } catch (error) {
        console.error("Invalid game state update:", error);
        return prev;
      }
      return newState;
    });
  };

  const resetGameState = () => {
    setGameState(DEFAULT_GAME_STATE);
  };

  return { gameState, updateGameState, resetGameState, isLoaded: true };
};
