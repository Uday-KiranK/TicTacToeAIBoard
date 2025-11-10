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
    <Card className={`px-4 py-2 flex items-center gap-3 ${isActive ? "border-2 border-primary" : ""}`}>
      <div className="flex items-center gap-2">
        {symbol === "X" ? (
          <X className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} strokeWidth={3} />
        ) : (
          <Circle className={`w-5 h-5 ${isActive ? "text-chart-2" : "text-muted-foreground"}`} strokeWidth={3} />
        )}
        <span className={`font-bold text-lg ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
          {symbol}
        </span>
      </div>
      {label && (
        <Badge variant={isActive ? "default" : "outline"} className="text-xs">
          {label}
        </Badge>
      )}
    </Card>
  );
}
