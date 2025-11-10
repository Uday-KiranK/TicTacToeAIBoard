import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Trophy, Users } from "lucide-react";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import AIHelperPanel from "@/components/AIHelperPanel";
import RoomLobby from "@/components/RoomLobby";
import { useWebSocket } from "@/lib/useWebSocket";
import { useAlphaBeta } from "@/lib/useAlphaBeta";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [gameState, setGameState] = useState<"lobby" | "playing">("lobby");
  const [showAIHelper, setShowAIHelper] = useState(true);
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

  const handleNewGame = () => {
    createRoom();
    setGameState("lobby");
  };

  const handleBackToLobby = () => {
    setGameState("lobby");
  };

  const board = gameRoom?.board || Array(9).fill(null);
  const currentPlayer = gameRoom?.currentPlayer || "X";
  
  const { bestMove, bestScore, treeData } = useAlphaBeta(
    board,
    playerSymbol || currentPlayer,
    showAIHelper && gameRoom !== null
  );

  if (gameState === "lobby" || !gameRoom) {
    return <RoomLobby onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />;
  }

  const isGameFinished = gameRoom.status === "finished";
  const gameWinner = gameRoom.winner;

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
            currentPlayer={gameRoom.status === "playing" ? currentPlayer : undefined}
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

      <AlertDialog open={isGameFinished}>
        <AlertDialogContent data-testid="game-over-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-6 h-6 text-chart-2" />
              Game Over!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg pt-4">
              {gameWinner === "draw" ? (
                <span className="font-semibold">It's a draw!</span>
              ) : gameWinner === playerSymbol ? (
                <span className="font-semibold text-chart-2">Congratulations! You won!</span>
              ) : (
                <span className="font-semibold">Your opponent won this time.</span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleBackToLobby}
              data-testid="button-back-lobby"
            >
              <Users className="w-4 h-4 mr-2" />
              Back to Lobby
            </Button>
            <Button
              onClick={handleNewGame}
              data-testid="button-new-game"
            >
              New Game
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
