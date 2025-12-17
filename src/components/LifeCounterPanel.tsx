import { memo } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHoldToRepeat } from "@/hooks/useHoldToRepeat";

interface LifeCounterPanelProps {
  playerName: string;
  playerNumber: 1 | 2;
  life: number;
  isActive: boolean;
  onLifeChange: (newLife: number) => void;
}

const playerStyles = {
  1: {
    border: "border-blue-500/60",
    borderActive: "border-blue-400",
    bg: "bg-blue-500/8",
    bgActive: "bg-blue-500/12",
    text: "text-blue-400",
    glow: "shadow-[0_0_12px_hsl(217_90%_60%_/_0.15)]",
    buttonBg: "hover:bg-blue-500/15 active:bg-blue-500/25",
  },
  2: {
    border: "border-red-500/60",
    borderActive: "border-red-400",
    bg: "bg-red-500/8",
    bgActive: "bg-red-500/12",
    text: "text-red-400",
    glow: "shadow-[0_0_12px_hsl(0_90%_60%_/_0.15)]",
    buttonBg: "hover:bg-red-500/15 active:bg-red-500/25",
  },
} as const;

const LifeCounterPanelComponent = ({
  playerName,
  playerNumber,
  life,
  isActive,
  onLifeChange,
}: LifeCounterPanelProps) => {
  const colors = playerStyles[playerNumber];
  const minusHold = useHoldToRepeat(() => onLifeChange(life - 1));
  const plusHold = useHoldToRepeat(() => onLifeChange(life + 1));

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-2 rounded-lg border transition-all duration-200",
        "flex-1 min-w-0",
        isActive
          ? `${colors.borderActive} ${colors.bgActive} ${colors.glow}`
          : `${colors.border} ${colors.bg}`
      )}
    >
      <button
        {...minusHold}
        className={cn(
          "flex items-center justify-center rounded-md select-none touch-none transition-colors",
          "h-11 w-11 shrink-0 border border-border/30",
          colors.text,
          colors.buttonBg
        )}
        aria-label={`Decrease ${playerName} life`}
      >
        <Minus className="h-5 w-5" />
      </button>
      <div className="text-center flex-1 min-w-0">
        <div className={cn(
          "font-display font-medium text-xs uppercase tracking-wider truncate mb-0.5",
          isActive ? colors.text : "text-muted-foreground"
        )}>
          {playerName}
        </div>
        <div className={cn(
          "font-display font-bold leading-none text-4xl tabular-nums",
          colors.text
        )}>
          {life}
        </div>
      </div>
      <button
        {...plusHold}
        className={cn(
          "flex items-center justify-center rounded-md select-none touch-none transition-colors",
          "h-11 w-11 shrink-0 border border-border/30",
          colors.text,
          colors.buttonBg
        )}
        aria-label={`Increase ${playerName} life`}
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};

export const LifeCounterPanel = memo(LifeCounterPanelComponent);
