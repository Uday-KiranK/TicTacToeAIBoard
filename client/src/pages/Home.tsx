import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import AIHelperPanel from "@/components/AIHelperPanel";
import RoomLobby from "@/components/RoomLobby";
import { useWebSocket } from "@/lib/useWebSocket";
import { useAlphaBeta } from "@/lib/useAlphaBeta";

export default function Home() {
  const [gameState, setGameState] = useState<"lobby" | "playing">("lobby");
  const [showAIHelper, setShowAIHelper] = useState(false);
  const { connected, gameRoom, playerSymbol, createRoom, joinRoom, makeMove } = useWebSocket();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    if (roomParam && connected) {
      joinRoom(roomParam);
      setGameState("playing");
    }
  }, [connected, joinRoom]);

  useEffect(() => {
    if (gameRoom) {
      setGameState("playing");
    }
  }, [gameRoom]);

  const handleCreateRoom = () => {
    createRoom();
  };

  const handleJoinRoom = (id: string) => {
    joinRoom(id);
  };

  const handleCellClick = (index: number) => {
    if (!gameRoom || !playerSymbol) return;
    if (gameRoom.board[index] !== null) return;
    if (gameRoom.status !== "playing") return;
    if (gameRoom.currentPlayer !== playerSymbol) return;

    makeMove(gameRoom.id, index);
  };

  const board = gameRoom?.board || Array(9).fill(null);
  const currentPlayer = gameRoom?.currentPlayer || "X";
  
  const { bestMove, bestScore, treeData } = useAlphaBeta(
    board,
    playerSymbol || currentPlayer
  );

  if (gameState === "lobby" || !gameRoom) {
    return <RoomLobby onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <GameHeader
        roomId={gameRoom.id}
        currentPlayer={currentPlayer}
        playerSymbol={playerSymbol}
        gameStatus={gameRoom.status}
        winner={gameRoom.winner}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={gameRoom.status !== "playing" || currentPlayer !== playerSymbol}
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
