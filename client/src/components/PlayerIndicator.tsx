import { Badge } from "@/components/ui/badge";
import { X, Circle } from "lucide-react";

interface PlayerIndicatorProps {
  symbol: "X" | "O";
  isActive?: boolean;
  label?: string;
}

export default function PlayerIndicator({ symbol, isActive, label }: PlayerIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge
        variant={isActive ? "default" : "outline"}
        className="flex items-center gap-1.5 px-3 py-1.5"
        data-testid={`player-${symbol}`}
      >
        {symbol === "X" ? (
          <X className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <Circle className="w-4 h-4" strokeWidth={2.5} />
        )}
        <span className="font-semibold">{symbol}</span>
      </Badge>
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}
