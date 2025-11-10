import { useState } from "react";
import GameBoard from "../GameBoard";

export default function GameBoardExample() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));

  const handleCellClick = (index: number) => {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = board.filter(Boolean).length % 2 === 0 ? "X" : "O";
    setBoard(newBoard);
    console.log("Cell clicked:", index);
  };

  return (
    <div className="flex justify-center p-8">
      <GameBoard board={board} onCellClick={handleCellClick} />
    </div>
  );
}
