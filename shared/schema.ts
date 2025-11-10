import { z } from "zod";

export type BoardState = (string | null)[];

export interface GameRoom {
  id: string;
  players: {
    X: string | null;
    O: string | null;
  };
  board: BoardState;
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  status: "waiting" | "playing" | "finished";
}

export const wsMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("join"),
    roomId: z.string(),
  }),
  z.object({
    type: z.literal("move"),
    roomId: z.string(),
    cellIndex: z.number().min(0).max(8),
  }),
  z.object({
    type: z.literal("create"),
  }),
]);

export type WSMessage = z.infer<typeof wsMessageSchema>;

export interface WSResponse {
  type: "room_created" | "room_joined" | "game_state" | "error" | "player_joined" | "game_over";
  roomId?: string;
  playerSymbol?: "X" | "O";
  game?: GameRoom;
  error?: string;
  winner?: "X" | "O" | "draw";
}
