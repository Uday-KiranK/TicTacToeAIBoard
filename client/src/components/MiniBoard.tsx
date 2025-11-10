import { X, Circle } from "lucide-react";

interface MiniBoardProps {
  board: (string | null)[];
  size?: "xs" | "sm" | "md";
}

export default function MiniBoard({ board, size = "sm" }: MiniBoardProps) {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
  };

  const iconClasses = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
  };

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {board.map((cell, idx) => (
        <div
          key={idx}
          className={`${sizeClasses[size]} border border-border/30 rounded-sm flex items-center justify-center bg-background/50`}
        >
          {cell === "X" && <X className={`${iconClasses[size]} text-primary`} strokeWidth={2.5} />}
          {cell === "O" && <Circle className={`${iconClasses[size]} text-chart-2`} strokeWidth={2.5} />}
        </div>
      ))}
    </div>
  );
}
