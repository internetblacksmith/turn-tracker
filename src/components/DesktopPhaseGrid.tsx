import { memo } from "react";
import { cn } from "@/lib/utils";
import { PHASES } from "@/lib/constants";
import { PhaseIcon } from "./PhaseIcon";

interface DesktopPhaseGridProps {
  currentPhase: number;
  currentSubPhase: number;
  onPhaseSelect: (phaseIndex: number) => void;
}

const DesktopPhaseGridComponent = ({
  currentPhase,
  currentSubPhase,
  onPhaseSelect,
}: DesktopPhaseGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {PHASES.map((phase, index) => {
        const isActive = index === currentPhase;
        const isComplete = index < currentPhase;

        return (
          <button
            key={phase.name}
            onClick={() => onPhaseSelect(index)}
            className={cn(
              "flex flex-col items-center p-5 rounded-xl transition-all duration-200",
              "relative group",
              isActive && "card-frame glow-active border-primary/60",
              isComplete && "ornate-border bg-secondary/30 hover:bg-secondary/40",
              !isActive && !isComplete && "ornate-border bg-card/50 hover:bg-card/80 hover:border-primary/30"
            )}
            aria-current={isActive ? "true" : "false"}
            title={phase.name}
          >
            {/* Ornamental top line */}
            <div className="flex items-center gap-2 w-full mb-3">
              <div className={cn(
                "flex-1 h-px",
                isActive
                  ? "bg-gradient-to-r from-transparent to-primary/40"
                  : "bg-gradient-to-r from-transparent to-border/40"
              )} />
              <PhaseIcon
                phaseIndex={index}
                className={cn(
                  "w-6 h-6 shrink-0",
                  isActive && "text-primary",
                  isComplete && "text-muted-foreground",
                  !isActive && !isComplete && "text-foreground/40 group-hover:text-foreground/60"
                )}
              />
              <div className={cn(
                "flex-1 h-px",
                isActive
                  ? "bg-gradient-to-l from-transparent to-primary/40"
                  : "bg-gradient-to-l from-transparent to-border/40"
              )} />
            </div>

            {/* Phase name */}
            <p
              className={cn(
                "font-display font-bold text-center leading-tight text-xl mb-2",
                isActive && "text-primary text-glow",
                isComplete && "text-foreground/50",
                !isActive && !isComplete && "text-foreground/70 group-hover:text-foreground/90"
              )}
            >
              {phase.shortName}
            </p>

            {/* Sub-phase dots */}
            {phase.subPhases && (
              <div className="flex gap-1.5 justify-center items-center mb-2">
                {phase.subPhases.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      currentSubPhase === idx && isActive
                        ? "bg-primary w-2.5 h-2.5 shadow-[0_0_6px_hsl(43_90%_60%_/_0.5)]"
                        : isActive
                          ? "bg-primary/30 w-1.5 h-1.5"
                          : "bg-muted-foreground/20 w-1.5 h-1.5"
                    )}
                  />
                ))}
              </div>
            )}

            {/* Status badge */}
            {isActive && (
              <span className="text-xs font-display font-semibold text-primary bg-primary/15 px-2.5 py-0.5 rounded-full border border-primary/30 tracking-wider">
                CURRENT
              </span>
            )}
            {isComplete && (
              <span className="text-xs font-display font-semibold text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-full border border-border/30 tracking-wider">
                RESOLVED
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const DesktopPhaseGrid = memo(DesktopPhaseGridComponent);
