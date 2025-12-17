import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LIFE_TOTAL_PRESETS } from "@/lib/constants";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player1Name: string;
  player2Name: string;
  onPlayer1NameChange: (name: string) => void;
  onPlayer2NameChange: (name: string) => void;
  onSetStartingLife: (player1Life: number, player2Life: number) => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  player1Name,
  player2Name,
  onPlayer1NameChange,
  onPlayer2NameChange,
  onSetStartingLife,
}: SettingsModalProps) => {
  const [p1Name, setP1Name] = useState(player1Name);
  const [p2Name, setP2Name] = useState(player2Name);
  const [p1Error, setP1Error] = useState("");
  const [p2Error, setP2Error] = useState("");

  const validatePlayerName = (name: string): string => {
    if (!name.trim()) {
      return "Player name cannot be empty";
    }
    if (name.length > 50) {
      return "Player name must be 50 characters or less";
    }
    return "";
  };

  const handleP1NameChange = (value: string) => {
    setP1Name(value);
    setP1Error(validatePlayerName(value));
  };

  const handleP2NameChange = (value: string) => {
    setP2Name(value);
    setP2Error(validatePlayerName(value));
  };

  const handleSave = () => {
    const p1Err = validatePlayerName(p1Name);
    const p2Err = validatePlayerName(p2Name);

    if (p1Err || p2Err) {
      setP1Error(p1Err);
      setP2Error(p2Err);
      return;
    }

    onPlayer1NameChange(p1Name.trim());
    onPlayer2NameChange(p2Name.trim());
    onClose();
  };

  const handleSetLife = (life: number) => {
    onSetStartingLife(life, life);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-display">Game Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Player Names */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Player Names
            </h3>
            <div className="space-y-2">
              <Label htmlFor="player1-name" className="text-blue-400">Player 1</Label>
              <Input
                id="player1-name"
                value={p1Name}
                onChange={(e) => handleP1NameChange(e.target.value)}
                placeholder="Enter player 1 name"
                className={p1Error ? "border-red-500" : ""}
                aria-invalid={!!p1Error}
                aria-describedby={p1Error ? "p1-error" : undefined}
              />
              {p1Error && (
                <p id="p1-error" className="text-sm text-red-500">{p1Error}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="player2-name" className="text-red-400">Player 2</Label>
              <Input
                id="player2-name"
                value={p2Name}
                onChange={(e) => handleP2NameChange(e.target.value)}
                placeholder="Enter player 2 name"
                className={p2Error ? "border-red-500" : ""}
                aria-invalid={!!p2Error}
                aria-describedby={p2Error ? "p2-error" : undefined}
              />
              {p2Error && (
                <p id="p2-error" className="text-sm text-red-500">{p2Error}</p>
              )}
            </div>
          </div>

          {/* Starting Life Total Presets */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Starting Life Total
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {LIFE_TOTAL_PRESETS.map((life) => (
                <Button
                  key={life}
                  variant="mtg-outline"
                  onClick={() => handleSetLife(life)}
                  className="w-full font-display text-lg"
                >
                  {life}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="mtg" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
