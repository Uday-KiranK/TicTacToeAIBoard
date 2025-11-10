import { Card } from "@/components/ui/card";
import GameCell from "./GameCell";

export type BoardState = (string | null)[];

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[];
}

export default function GameBoard({ board, onCellClick, disabled, winningLine }: GameBoardProps) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-3 gap-2" data-testid="game-board">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell as "X" | "O" | null}
            onClick={() => onCellClick(index)}
            disabled={disabled}
            isWinningCell={winningLine?.includes(index)}
          />
        ))}
      </div>
    </Card>
  );
}
