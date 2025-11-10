import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, LogIn } from "lucide-react";
import { useState } from "react";

interface RoomLobbyProps {
  onCreateRoom: () => void;
  onJoinRoom: (roomId: string) => void;
}

export default function RoomLobby({ onCreateRoom, onJoinRoom }: RoomLobbyProps) {
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (roomId.trim()) {
      onJoinRoom(roomId.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Tic-Tac-Toe</h1>
          <p className="text-muted-foreground">
            Learn Alpha-Beta Pruning with AI visualization
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <Button
            onClick={onCreateRoom}
            className="w-full"
            size="lg"
            data-testid="button-create-room"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Game
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="room-id">Join Existing Game</Label>
              <Input
                id="room-id"
                placeholder="Enter room code"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                data-testid="input-room-id"
              />
            </div>
            <Button
              onClick={handleJoin}
              variant="secondary"
              className="w-full"
              disabled={!roomId.trim()}
              data-testid="button-join-room"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Join Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
