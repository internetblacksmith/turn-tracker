import { Phase, PHASES } from "@/lib/constants";
import { DesktopPhaseGrid } from "./DesktopPhaseGrid";
import { LifeCounterPanel } from "./LifeCounterPanel";
import { PhaseDescription } from "./PhaseDescription";
import { NavigationControls } from "./NavigationControls";
import { PhaseIcon } from "./PhaseIcon";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

interface DesktopLayoutProps {
  gameState: {
    currentPhaseIndex: number;
    currentSubPhaseIndex: number;
    activePlayer: 1 | 2;
    turns: number;
    player1Name: string;
    player2Name: string;
    player1Life: number;
    player2Life: number;
  };
  phase: Phase;
  currentStepName: string;
  currentDescription: string;
  handlers: {
    onPhaseSelect: (phaseIndex: number) => void;
    onPlayerToggle: () => void;
    onLifeChange: (player: 1 | 2, newLife: number) => void;
    onPrevStep: () => void;
    onNextStep: () => void;
    onPassTurn: () => void;
    onReset: () => void;
  };
}

export const DesktopLayout = ({
  gameState,
  phase,
  currentStepName,
  currentDescription,
  handlers,
}: DesktopLayoutProps) => {
  const {
    currentPhaseIndex,
    currentSubPhaseIndex,
    activePlayer,
    turns,
    player1Name,
    player2Name,
    player1Life,
    player2Life,
  } = gameState;
  const {
    onPhaseSelect,
    onPlayerToggle,
    onLifeChange,
    onPrevStep,
    onNextStep,
    onPassTurn,
    onReset,
  } = handlers;

  return (
    <div className="hidden lg:flex flex-col h-full w-full gap-4 p-3">
      {/* Header: Life Counters flanking Turn Orb */}
      <div className="flex items-center gap-5 card-frame rounded-xl p-4">
        <LifeCounterPanel
          playerName={player1Name}
          playerNumber={1}
          life={player1Life}
          isActive={activePlayer === 1}
          onLifeChange={(newLife) => onLifeChange(1, newLife)}
        />

        {/* Turn Counter Orb */}
        <button
          onClick={onPlayerToggle}
          className={cn(
            "flex flex-col items-center justify-center shrink-0",
            "w-24 h-24 rounded-full transition-all duration-300",
            "border-2",
            activePlayer === 1
              ? "border-blue-400/50 bg-blue-500/8 shadow-[0_0_20px_hsl(217_90%_60%_/_0.12)]"
              : "border-red-400/50 bg-red-500/8 shadow-[0_0_20px_hsl(0_90%_60%_/_0.12)]",
            "hover:brightness-125"
          )}
          aria-label="Toggle active player"
          title="Click to switch active player"
        >
          <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest">
            Turn
          </span>
          <div
            className={cn(
              "font-display font-bold leading-none text-4xl tabular-nums",
              activePlayer === 1 ? "text-blue-400" : "text-red-400"
            )}
          >
            {turns}
          </div>
        </button>

        <LifeCounterPanel
          playerName={player2Name}
          playerNumber={2}
          life={player2Life}
          isActive={activePlayer === 2}
          onLifeChange={(newLife) => onLifeChange(2, newLife)}
        />
      </div>

      {/* Main Content: Two-column layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left: Phase Grid */}
        <div className="flex-[3] flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-3">
            {/* Ornamental header */}
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            <h2 className="font-display text-base text-muted-foreground font-semibold uppercase tracking-widest">
              Phases
            </h2>
            <div className="text-xs text-muted-foreground/70 font-display tabular-nums">
              {currentPhaseIndex + 1}/{PHASES.length}
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
          </div>

          <div className="flex-1 overflow-y-auto p-1">
            <DesktopPhaseGrid
              currentPhase={currentPhaseIndex}
              currentSubPhase={currentSubPhaseIndex}
              onPhaseSelect={onPhaseSelect}
            />
          </div>
        </div>

        {/* Right: Phase Detail + Controls */}
        <div className="flex-[2] flex flex-col gap-4 min-h-0">
          {/* Phase Detail Card */}
          <div
            className={cn(
              "flex-1 rounded-xl p-5 flex flex-col gap-3",
              "card-frame",
              activePlayer === 1
                ? "border-blue-500/20"
                : "border-red-500/20"
            )}
          >
            {/* Phase name with icon */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PhaseIcon
                  phaseIndex={currentPhaseIndex}
                  className={cn(
                    "w-5 h-5",
                    activePlayer === 1 ? "text-blue-400/50" : "text-red-400/50"
                  )}
                />
                <p className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground">
                  Current Phase
                </p>
              </div>
              <h3
                className={cn(
                  "font-display text-2xl font-bold",
                  activePlayer === 1 ? "text-blue-400" : "text-red-400"
                )}
              >
                {phase.name}
              </h3>
            </div>

            {/* Ornamental divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            {/* Step name */}
            <div>
              <p className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Current Step
              </p>
              <p className="font-display text-3xl font-bold text-foreground leading-tight">
                {currentStepName}
              </p>
            </div>

            {/* Description */}
            <div className="flex-1">
              <PhaseDescription
                description={currentDescription}
                activePlayer={activePlayer}
              />
            </div>
          </div>

          {/* Controls */}
          <NavigationControls
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            onPassTurn={onPassTurn}
            onReset={onReset}
            disablePrev={currentPhaseIndex === 0 && currentSubPhaseIndex === 0}
          />
        </div>
      </div>

      {/* Keyboard Hints */}
      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground/60 py-1">
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-card/80 border border-border/40 font-mono text-[11px]">←</kbd>{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-card/80 border border-border/40 font-mono text-[11px]">→</kbd>{" "}
          Navigate
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-card/80 border border-border/40 font-mono text-[11px]">Space</kbd>{" "}
          Next step
        </span>
      </div>

      <Footer />
    </div>
  );
};
