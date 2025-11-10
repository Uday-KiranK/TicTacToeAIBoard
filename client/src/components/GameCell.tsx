import { Button } from "@/components/ui/button";
import { X, Circle } from "lucide-react";

interface GameCellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  disabled?: boolean;
  isWinningCell?: boolean;
}

export default function GameCell({ value, onClick, disabled, isWinningCell }: GameCellProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      disabled={disabled || value !== null}
      data-testid={`cell-${value || "empty"}`}
      className={`w-24 h-24 text-4xl font-bold rounded-md ${
        isWinningCell ? "bg-primary/20 border-primary" : ""
      }`}
    >
      {value === "X" && <X className="w-12 h-12 text-primary" strokeWidth={3} />}
      {value === "O" && <Circle className="w-12 h-12 text-chart-2" strokeWidth={3} />}
    </Button>
  );
}
