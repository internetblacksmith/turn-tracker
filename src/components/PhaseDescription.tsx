import { memo } from "react";
import { cn } from "@/lib/utils";

interface PhaseDescriptionProps {
  description: string;
  activePlayer: 1 | 2;
}

const PhaseDescriptionComponent = ({
  description,
  activePlayer,
}: PhaseDescriptionProps) => {
  return (
    <div
      className={cn(
        "rounded-lg mb-2 md:mb-3",
        "p-2.5 md:p-3 lg:p-4",
        "scroll-bg"
      )}
    >
      <p className={cn(
        "leading-relaxed italic text-base",
        activePlayer === 1 ? "text-blue-300/70" : "text-red-300/70"
      )}>
        {description}
      </p>
    </div>
  );
};

export const PhaseDescription = memo(PhaseDescriptionComponent);
