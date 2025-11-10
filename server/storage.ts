import { GameRoom, BoardState } from "@shared/schema";
import { randomBytes } from "crypto";

export interface IStorage {
  createRoom(): GameRoom;
  getRoom(id: string): GameRoom | undefined;
  joinRoom(roomId: string, playerId: string): { room: GameRoom; symbol: "X" | "O" } | null;
  makeMove(roomId: string, playerId: string, cellIndex: number): GameRoom | null;
  getAllRooms(): GameRoom[];
}

export class MemStorage implements IStorage {
  private rooms: Map<string, GameRoom>;
  private playerRooms: Map<string, string>;

  constructor() {
    this.rooms = new Map();
    this.playerRooms = new Map();
  }

  createRoom(): GameRoom {
    const id = randomBytes(3).toString("hex").toUpperCase();
    const room: GameRoom = {
      id,
      players: {
        X: null,
        O: null,
      },
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      status: "waiting",
    };
    this.rooms.set(id, room);
    return room;
  }

  getRoom(id: string): GameRoom | undefined {
    return this.rooms.get(id);
  }

  joinRoom(roomId: string, playerId: string): { room: GameRoom; symbol: "X" | "O" } | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const existingSymbol = this.getPlayerSymbol(roomId, playerId);
    if (existingSymbol) {
      return { room, symbol: existingSymbol };
    }

    if (!room.players.X) {
      room.players.X = playerId;
      this.playerRooms.set(playerId, roomId);
      if (room.players.O) {
        room.status = "playing";
      }
      return { room, symbol: "X" };
    } else if (!room.players.O) {
      room.players.O = playerId;
      this.playerRooms.set(playerId, roomId);
      room.status = "playing";
      return { room, symbol: "O" };
    }

    return null;
  }

  private getPlayerSymbol(roomId: string, playerId: string): "X" | "O" | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    if (room.players.X === playerId) return "X";
    if (room.players.O === playerId) return "O";
    return null;
  }

  private checkWinner(board: BoardState): "X" | "O" | "draw" | null {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as "X" | "O";
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "draw";
    }

    return null;
  }

  makeMove(roomId: string, playerId: string, cellIndex: number): GameRoom | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    if (room.status !== "playing") return null;
    if (room.board[cellIndex] !== null) return null;

    const playerSymbol = this.getPlayerSymbol(roomId, playerId);
    if (!playerSymbol || playerSymbol !== room.currentPlayer) return null;

    room.board[cellIndex] = playerSymbol;

    const winner = this.checkWinner(room.board);
    if (winner) {
      room.winner = winner;
      room.status = "finished";
    } else {
      room.currentPlayer = room.currentPlayer === "X" ? "O" : "X";
    }

    return room;
  }

  getAllRooms(): GameRoom[] {
    return Array.from(this.rooms.values());
  }
}

export const storage = new MemStorage();
