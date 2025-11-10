import { Button } from "@/components/ui/button";
import { X, Circle } from "lucide-react";

interface GameCellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  disabled?: boolean;
  isWinningCell?: boolean;
  currentPlayer?: "X" | "O";
}

export default function GameCell({ value, onClick, disabled, isWinningCell, currentPlayer }: GameCellProps) {
  const isActivePlayerSymbol = value && value === currentPlayer;
  
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
      {value === "X" && (
        <X 
          className={`w-12 h-12 ${isActivePlayerSymbol ? "text-primary opacity-100" : "text-primary/40"}`} 
          strokeWidth={isActivePlayerSymbol ? 4 : 3} 
        />
      )}
      {value === "O" && (
        <Circle 
          className={`w-12 h-12 ${isActivePlayerSymbol ? "text-chart-2 opacity-100" : "text-chart-2/40"}`} 
          strokeWidth={isActivePlayerSymbol ? 4 : 3} 
        />
      )}
    </Button>
  );
}
