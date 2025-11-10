import { useState } from "react";
import GameHeader from "../GameHeader";

export default function GameHeaderExample() {
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  return (
    <div className="space-y-4">
      <GameHeader
        roomId="ABC123"
        currentPlayer={currentPlayer}
        playerSymbol="X"
        gameStatus="playing"
      />

      <div className="p-4">
        <button
          onClick={() => setCurrentPlayer(currentPlayer === "X" ? "O" : "X")}
          className="text-sm text-primary underline"
        >
          Toggle turn
        </button>
      </div>

      <GameHeader
        roomId="XYZ789"
        currentPlayer="X"
        playerSymbol="O"
        gameStatus="finished"
        winner="X"
      />
    </div>
  );
}
