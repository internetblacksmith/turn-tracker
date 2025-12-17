import { memo } from "react";
import { cn } from "@/lib/utils";
import { PHASES } from "@/lib/constants";
import { PhaseIcon } from "./PhaseIcon";

interface PhaseListProps {
  currentPhase: number;
  currentSubPhase: number;
  onPhaseSelect: (phaseIndex: number) => void;
}

const PhaseListComponent = ({
  currentPhase,
  currentSubPhase,
  onPhaseSelect,
}: PhaseListProps) => {
  return (
    <div className="flex-1 space-y-1.5 mb-2 overflow-y-auto">
      {PHASES.map((phase, index) => {
        const isActive = index === currentPhase;
        const isComplete = index < currentPhase;

        return (
          <button
            key={phase.name}
            onClick={() => onPhaseSelect(index)}
            className={cn(
              "w-full text-left p-2.5 rounded-lg transition-all duration-200",
              isActive && "card-frame glow-active border-primary/50",
              isComplete && "ornate-border bg-secondary/20",
              !isActive && !isComplete && "ornate-border bg-card/30"
            )}
            aria-current={isActive ? "true" : "false"}
          >
            <div className="flex items-center gap-2.5">
              <PhaseIcon
                phaseIndex={index}
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive && "text-primary",
                  isComplete && "text-muted-foreground/60",
                  !isActive && !isComplete && "text-foreground/30"
                )}
              />
              <span
                className={cn(
                  "font-display flex-1",
                  "text-base",
                  isActive && "text-primary text-glow font-semibold",
                  isComplete && "text-muted-foreground",
                  !isActive && !isComplete && "text-foreground/60"
                )}
              >
                {phase.shortName}
              </span>

              {/* Sub-phase dots inline */}
              {phase.subPhases && (
                <div className="flex gap-1 items-center">
                  {phase.subPhases.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-full transition-all duration-200",
                        isActive && currentSubPhase === idx
                          ? "bg-primary w-2 h-2 shadow-[0_0_4px_hsl(43_90%_60%_/_0.5)]"
                          : isActive
                            ? "bg-primary/25 w-1.5 h-1.5"
                            : "bg-muted-foreground/15 w-1.5 h-1.5"
                      )}
                    />
                  ))}
                </div>
              )}

              {isActive && (
                <span className="text-[11px] font-display font-semibold text-primary bg-primary/15 px-1.5 py-0.5 rounded tracking-wider">
                  NOW
                </span>
              )}
            </div>

            {/* Active sub-phase names */}
            {phase.subPhases && isActive && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-6.5">
                {phase.subPhases.map((sub, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded font-display",
                      currentSubPhase === idx
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-secondary/40 text-foreground/50"
                    )}
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const PhaseList = memo(PhaseListComponent);
