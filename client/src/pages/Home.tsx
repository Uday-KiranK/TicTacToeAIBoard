import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, BrainCircuit } from "lucide-react";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import AIHelperPanel from "@/components/AIHelperPanel";
import RoomLobby from "@/components/RoomLobby";
import { TreeNodeData } from "@/components/TreeNode";

function generateMockTreeData(board: (string | null)[]): TreeNodeData[][] {
  const emptyIndices = board
    .map((cell, idx) => (cell === null ? idx : -1))
    .filter((idx) => idx !== -1);

  if (emptyIndices.length === 0) return [];

  const rootNode: TreeNodeData = {
    board: [...board],
    alpha: -Infinity,
    beta: Infinity,
    score: null,
    nodeType: "MAX",
    isPruned: false,
    isCurrentNode: true,
  };

  const childNodes: TreeNodeData[] = emptyIndices.slice(0, 4).map((idx, i) => {
    const newBoard = [...board];
    newBoard[idx] = "X";
    return {
      board: newBoard,
      alpha: -Infinity,
      beta: i < 2 ? Infinity : 0,
      score: i === 0 ? 0 : i === 1 ? -1 : null,
      nodeType: "MIN" as const,
      isPruned: i >= 2,
      bestMove: i === 0,
    };
  });

  return [
    [rootNode],
    childNodes,
  ];
}

export default function Home() {
  const [gameState, setGameState] = useState<"lobby" | "playing">("lobby");
  const [roomId, setRoomId] = useState<string>("");
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [playerSymbol] = useState<"X" | "O">("X");
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
    setGameState("playing");
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    console.log("Created room:", newRoomId);
  };

  const handleJoinRoom = (id: string) => {
    setRoomId(id);
    setGameState("playing");
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    console.log("Joined room:", id);
  };

  const checkWinner = (boardState: (string | null)[]): "X" | "O" | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a] as "X" | "O";
      }
    }

    if (boardState.every((cell) => cell !== null)) {
      return "draw";
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || currentPlayer !== playerSymbol) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    console.log("Cell clicked:", index);
  };

  const treeData = generateMockTreeData(board);
  const bestMove = board.findIndex((cell) => cell === null);
  const bestScore = 0;

  if (gameState === "lobby") {
    return <RoomLobby onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <GameHeader
        roomId={roomId}
        currentPlayer={currentPlayer}
        playerSymbol={playerSymbol}
        gameStatus={winner ? "finished" : "playing"}
        winner={winner}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={winner !== null || currentPlayer !== playerSymbol}
          />

          <Button
            variant={showAIHelper ? "default" : "outline"}
            onClick={() => setShowAIHelper(!showAIHelper)}
            data-testid="button-toggle-ai"
            size="lg"
          >
            <BrainCircuit className="w-5 h-5 mr-2" />
            {showAIHelper ? "Hide" : "Show"} AI Helper
          </Button>
        </div>

        {showAIHelper && (
          <div className="w-1/2 border-l p-6 overflow-hidden">
            <AIHelperPanel
              isVisible={showAIHelper}
              bestMove={bestMove}
              bestScore={bestScore}
              treeData={treeData}
              currentBoard={board}
            />
          </div>
        )}
      </div>
    </div>
  );
}
