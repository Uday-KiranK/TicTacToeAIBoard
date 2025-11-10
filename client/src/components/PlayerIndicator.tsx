import { Badge } from "@/components/ui/badge";
import { X, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlayerIndicatorProps {
  symbol: "X" | "O";
  isActive?: boolean;
  label?: string;
}

export default function PlayerIndicator({ symbol, isActive, label }: PlayerIndicatorProps) {
  return (
    <Card className={`px-4 py-2 flex items-center gap-2 ${isActive ? "border-2 border-primary" : ""}`} data-testid={`player-${symbol}`}>
      {symbol === "X" ? (
        <X className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={3} />
      ) : (
        <Circle className={`w-6 h-6 ${isActive ? "text-chart-2" : "text-muted-foreground"}`} strokeWidth={3} />
      )}
      {label && (
        <Badge variant={isActive ? "default" : "outline"} className="text-xs">
          {label}
        </Badge>
      )}
    </Card>
  );
}
