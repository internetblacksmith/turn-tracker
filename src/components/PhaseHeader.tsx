import { memo } from "react";
import { cn } from "@/lib/utils";
import { Phase, PHASES } from "@/lib/constants";
import { PhaseIcon } from "./PhaseIcon";

interface PhaseHeaderProps {
  phase: Phase;
  stepName: string;
  activePlayer: 1 | 2;
}

const PhaseHeaderComponent = ({
  phase,
  stepName,
  activePlayer,
}: PhaseHeaderProps) => {
  const phaseIndex = PHASES.indexOf(phase);

  return (
    <div className="card-frame rounded-lg p-3 mb-2">
      <div className="flex items-center gap-2 mb-1.5">
        <PhaseIcon
          phaseIndex={phaseIndex}
          className={cn(
            "w-5 h-5",
            activePlayer === 1 ? "text-blue-400/60" : "text-red-400/60"
          )}
        />
        <p className="text-muted-foreground text-xs uppercase tracking-widest font-display">
          {phase.name}
        </p>
      </div>
      <p
        className={cn(
          "font-display text-2xl font-bold leading-tight truncate",
          activePlayer === 1 ? "text-blue-400" : "text-red-400"
        )}
      >
        {stepName}
      </p>
    </div>
  );
};

export const PhaseHeader = memo(PhaseHeaderComponent);
