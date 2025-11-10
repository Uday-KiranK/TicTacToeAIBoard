import { Card } from "@/components/ui/card";
import GameCell from "./GameCell";

export type BoardState = (string | null)[];

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[];
  currentPlayer?: "X" | "O";
}

export default function GameBoard({ board, onCellClick, disabled, winningLine, currentPlayer }: GameBoardProps) {
  return (
    <Card className="p-6">
      {currentPlayer && (
        <div className="text-center mb-4 text-sm font-medium text-muted-foreground" data-testid="turn-indicator">
          Current Turn: <span className="font-bold text-foreground">{currentPlayer}</span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2" data-testid="game-board">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell as "X" | "O" | null}
            onClick={() => onCellClick(index)}
            disabled={disabled}
            isWinningCell={winningLine?.includes(index)}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
    </Card>
  );
}
