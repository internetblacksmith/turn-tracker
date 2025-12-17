import { memo, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface NavigationControlsProps {
  onPrevStep: () => void;
  onNextStep: () => void;
  onPassTurn: () => void;
  onReset: () => void;
  disablePrev: boolean;
}

const NavigationControlsComponent = ({
  onPrevStep,
  onNextStep,
  onPassTurn,
  onReset,
  disablePrev,
}: NavigationControlsProps) => {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="mtg-outline"
          size="default"
          className="flex-1 h-12 lg:h-13"
          onClick={onPrevStep}
          disabled={disablePrev}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="mtg"
          size="default"
          className="flex-[2] h-12 lg:h-13 text-lg"
          onClick={onNextStep}
          aria-label="Next step"
        >
          Next
          <ChevronRight className="w-6 h-6" />
        </Button>
        <Button
          variant="mtg-outline"
          size="default"
          className="h-12 lg:h-13 px-4"
          onClick={onPassTurn}
          title="Pass Turn"
          aria-label="Pass turn to next player"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
        <Button
          variant="mtg-ghost"
          size="default"
          className="h-12 lg:h-13 px-4"
          onClick={() => setConfirmReset(true)}
          title="Reset Game"
          aria-label="Reset game to starting state"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle className="font-display">Reset Game?</DialogTitle>
          </DialogHeader>
          <p className="text-base text-muted-foreground italic">
            This will reset all phases, life totals, and the turn counter back to their starting values.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onReset();
                setConfirmReset(false);
              }}
            >
              Reset Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const NavigationControls = memo(NavigationControlsComponent);
