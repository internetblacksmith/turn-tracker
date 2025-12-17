import { Sunrise, Sparkles, Sword, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Sunrise, Sparkles, Sword, Sparkles, Moon];

export const PhaseIcon = ({
  phaseIndex,
  className,
}: {
  phaseIndex: number;
  className?: string;
}) => {
  const Icon = icons[phaseIndex];
  return Icon ? <Icon className={cn("w-5 h-5", className)} /> : null;
};
