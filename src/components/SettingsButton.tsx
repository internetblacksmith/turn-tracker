import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsButtonProps {
  onClick: () => void;
  visible?: "mobile" | "desktop";
}

export const SettingsButton = ({
  onClick,
  visible,
}: SettingsButtonProps) => {
  return (
    <div
      className={cn(
        visible === "desktop" && "hidden lg:block absolute top-4 right-4 z-10",
        visible === "mobile" && "lg:hidden",
        !visible && ""
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="h-9 w-9 p-0"
        aria-label="Open settings"
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};
