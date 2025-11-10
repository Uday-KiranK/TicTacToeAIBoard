import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import PlayerIndicator from "./PlayerIndicator";
import { useState } from "react";

interface GameHeaderProps {
  roomId: string;
  currentPlayer: "X" | "O";
  playerSymbol: "X" | "O" | null;
  gameStatus: "waiting" | "playing" | "finished";
  winner?: "X" | "O" | "draw" | null;
}

export default function GameHeader({
  roomId,
  currentPlayer,
  playerSymbol,
  gameStatus,
  winner,
}: GameHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}?room=${roomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-b bg-card p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Tic-Tac-Toe</h1>
          <Badge variant="outline" className="font-mono text-xs">
            Room: {roomId}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            data-testid="button-copy-room"
            className="h-8 w-8"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-6">
          {gameStatus === "finished" && winner && (
            <Badge className="text-sm">
              {winner === "draw" ? "Draw!" : `${winner} Wins!`}
            </Badge>
          )}

          {gameStatus === "playing" && (
            <div className="text-sm font-medium">
              {currentPlayer === playerSymbol ? "Your turn" : "Opponent's turn"}
            </div>
          )}

          <div className="flex items-center gap-2">
            <PlayerIndicator
              symbol="X"
              isActive={gameStatus === "playing" && currentPlayer === "X"}
              label={playerSymbol === "X" ? "You" : ""}
            />
            <PlayerIndicator
              symbol="O"
              isActive={gameStatus === "playing" && currentPlayer === "O"}
              label={playerSymbol === "O" ? "You" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
