import { useCallback, useEffect, useState } from "react";
import { PHASES } from "@/lib/constants";
import { useGameState } from "@/hooks/useGameState";
import { LifeCounterPanel } from "./LifeCounterPanel";
import { PhaseHeader } from "./PhaseHeader";
import { PhaseList } from "./PhaseList";
import { PhaseDescription } from "./PhaseDescription";
import { NavigationControls } from "./NavigationControls";
import { SettingsButton } from "./SettingsButton";
import { SettingsModal } from "./SettingsModal";
import { DesktopLayout } from "./DesktopLayout";
import { cn } from "@/lib/utils";

const TurnTracker = () => {
  const { gameState, updateGameState, resetGameState, isLoaded } =
    useGameState();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    currentPhaseIndex,
    currentSubPhaseIndex,
    turns,
    activePlayerIndex,
    players,
  } = gameState;

  const activePlayer = (activePlayerIndex + 1) as 1 | 2;
  const player1Name = players[0].name;
  const player2Name = players[1].name;
  const player1Life = players[0].life;
  const player2Life = players[1].life;

  const nextStep = useCallback(() => {
    const phase = PHASES[currentPhaseIndex];
    if (
      phase.subPhases &&
      currentSubPhaseIndex < phase.subPhases.length - 1
    ) {
      updateGameState({ currentSubPhaseIndex: currentSubPhaseIndex + 1 });
    } else if (currentPhaseIndex < PHASES.length - 1) {
      updateGameState({
        currentPhaseIndex: currentPhaseIndex + 1,
        currentSubPhaseIndex: 0,
      });
    } else {
      updateGameState({
        turns: turns + 1,
        activePlayerIndex: activePlayerIndex === 0 ? 1 : 0,
        currentPhaseIndex: 0,
        currentSubPhaseIndex: 0,
      });
    }
  }, [currentPhaseIndex, currentSubPhaseIndex, turns, activePlayerIndex, updateGameState]);

  const prevStep = useCallback(() => {
    if (currentSubPhaseIndex > 0) {
      updateGameState({ currentSubPhaseIndex: currentSubPhaseIndex - 1 });
    } else if (currentPhaseIndex > 0) {
      const prevPhase = PHASES[currentPhaseIndex - 1];
      updateGameState({
        currentPhaseIndex: currentPhaseIndex - 1,
        currentSubPhaseIndex: prevPhase.subPhases
          ? prevPhase.subPhases.length - 1
          : 0,
      });
    }
  }, [currentPhaseIndex, currentSubPhaseIndex, updateGameState]);

  const goToPhase = (phaseIndex: number) => {
    updateGameState({
      currentPhaseIndex: phaseIndex,
      currentSubPhaseIndex: 0,
    });
  };

  const togglePlayer = () => {
    updateGameState({
      activePlayerIndex: activePlayerIndex === 0 ? 1 : 0,
    });
  };

  const passTurn = () => {
    updateGameState({
      turns: turns + 1,
      activePlayerIndex: activePlayerIndex === 0 ? 1 : 0,
      currentPhaseIndex: 0,
      currentSubPhaseIndex: 0,
    });
  };

  const handleLifeChange = (player: 1 | 2, newLife: number) => {
    if (player === 1) {
      updateGameState({
        players: [{ ...players[0], life: newLife }, players[1]],
      });
    } else {
      updateGameState({
        players: [players[0], { ...players[1], life: newLife }],
      });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-display text-muted-foreground">
        Loading...
      </div>
    );
  }

  const phase = PHASES[currentPhaseIndex];
  const currentStepName = phase.subPhases
    ? phase.subPhases[currentSubPhaseIndex].name
    : phase.shortName;
  const currentDescription = phase.subPhases
    ? phase.subPhases[currentSubPhaseIndex].description
    : phase.description;

  return (
    <div className="h-[100dvh] bg-background p-2 lg:p-4 flex flex-col lg:flex-row overflow-hidden gap-2 lg:gap-4">
      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        player1Name={player1Name}
        player2Name={player2Name}
        onPlayer1NameChange={(name) =>
          updateGameState({
            players: [{ ...players[0], name }, players[1]],
          })
        }
        onPlayer2NameChange={(name) =>
          updateGameState({
            players: [players[0], { ...players[1], name }],
          })
        }
        onSetStartingLife={(p1Life, p2Life) => {
          updateGameState({
            players: [
              { ...players[0], life: p1Life },
              { ...players[1], life: p2Life },
            ],
          });
        }}
      />

      {/* Mobile/Tablet Layout */}
      <div className="flex-1 flex flex-col lg:hidden overflow-hidden">
        {/* Top bar: Turn orb + Settings */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={togglePlayer}
            className={cn(
              "flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-200",
              "border",
              activePlayer === 1
                ? "border-blue-400/40 bg-blue-500/8 shadow-[0_0_10px_hsl(217_90%_60%_/_0.08)]"
                : "border-red-400/40 bg-red-500/8 shadow-[0_0_10px_hsl(0_90%_60%_/_0.08)]"
            )}
            aria-label="Toggle active player"
          >
            <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">Turn</span>
            <span
              className={cn(
                "font-display font-bold text-2xl leading-none tabular-nums",
                activePlayer === 1 ? "text-blue-400" : "text-red-400"
              )}
            >
              {turns}
            </span>
            <span
              className={cn(
                "text-[11px] font-display font-semibold px-1.5 py-0.5 rounded-full tracking-wider",
                activePlayer === 1
                  ? "bg-blue-500/15 text-blue-400 border border-blue-400/20"
                  : "bg-red-500/15 text-red-400 border border-red-400/20"
              )}
            >
              P{activePlayer}
            </span>
          </button>
          <SettingsButton onClick={() => setSettingsOpen(true)} />
        </div>

        {/* Life Counters */}
        <div className="flex gap-2 mb-2">
          <LifeCounterPanel
            playerName={player1Name}
            playerNumber={1}
            life={player1Life}
            isActive={activePlayer === 1}
            onLifeChange={(newLife) => handleLifeChange(1, newLife)}
          />
          <LifeCounterPanel
            playerName={player2Name}
            playerNumber={2}
            life={player2Life}
            isActive={activePlayer === 2}
            onLifeChange={(newLife) => handleLifeChange(2, newLife)}
          />
        </div>

        {/* Phase Header */}
        <PhaseHeader
          phase={phase}
          stepName={currentStepName}
          activePlayer={activePlayer}
        />

        {/* Phase List */}
        <PhaseList
          currentPhase={currentPhaseIndex}
          currentSubPhase={currentSubPhaseIndex}
          onPhaseSelect={goToPhase}
        />

        {/* Phase Description */}
        <PhaseDescription
          description={currentDescription}
          activePlayer={activePlayer}
        />

        {/* Navigation Controls */}
        <NavigationControls
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onPassTurn={passTurn}
          onReset={resetGameState}
          disablePrev={currentPhaseIndex === 0 && currentSubPhaseIndex === 0}
        />
      </div>

      {/* Settings Button - Desktop */}
      <SettingsButton
        onClick={() => setSettingsOpen(true)}
        visible="desktop"
      />

      {/* Desktop Layout */}
      <DesktopLayout
        gameState={{
          currentPhaseIndex,
          currentSubPhaseIndex,
          activePlayer,
          turns,
          player1Name,
          player2Name,
          player1Life,
          player2Life,
        }}
        phase={phase}
        currentStepName={currentStepName}
        currentDescription={currentDescription}
        handlers={{
          onPhaseSelect: goToPhase,
          onPlayerToggle: togglePlayer,
          onLifeChange: handleLifeChange,
          onPrevStep: prevStep,
          onNextStep: nextStep,
          onPassTurn: passTurn,
          onReset: resetGameState,
        }}
      />
    </div>
  );
};

export default TurnTracker;
