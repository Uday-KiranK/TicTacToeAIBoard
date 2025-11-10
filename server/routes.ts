import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { wsMessageSchema, type WSResponse } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  const clients = new Map<string, WebSocket>();

  wss.on("connection", (ws: WebSocket) => {
    const clientId = Math.random().toString(36).substring(7);
    clients.set(clientId, ws);

    console.log(`Client ${clientId} connected`);

    ws.on("message", (data: string) => {
      try {
        const message = JSON.parse(data.toString());
        const parsed = wsMessageSchema.parse(message);

        switch (parsed.type) {
          case "create": {
            const room = storage.createRoom();
            const result = storage.joinRoom(room.id, clientId);
            if (result) {
              const response: WSResponse = {
                type: "room_created",
                roomId: room.id,
                playerSymbol: result.symbol,
                game: result.room,
              };
              ws.send(JSON.stringify(response));
            }
            break;
          }

          case "join": {
            const result = storage.joinRoom(parsed.roomId, clientId);
            if (result) {
              const response: WSResponse = {
                type: "room_joined",
                roomId: parsed.roomId,
                playerSymbol: result.symbol,
                game: result.room,
              };
              ws.send(JSON.stringify(response));

              if (result.room.status === "playing") {
                broadcastToRoom(parsed.roomId, {
                  type: "player_joined",
                  game: result.room,
                });
              }
            } else {
              ws.send(
                JSON.stringify({
                  type: "error",
                  error: "Room not found or full",
                })
              );
            }
            break;
          }

          case "move": {
            const room = storage.makeMove(parsed.roomId, clientId, parsed.cellIndex);
            if (room) {
              const response: WSResponse = {
                type: "game_state",
                game: room,
              };
              broadcastToRoom(parsed.roomId, response);

              if (room.status === "finished") {
                broadcastToRoom(parsed.roomId, {
                  type: "game_over",
                  winner: room.winner!,
                  game: room,
                });
              }
            }
            break;
          }
        }
      } catch (error) {
        console.error("WebSocket error:", error);
        ws.send(
          JSON.stringify({
            type: "error",
            error: "Invalid message",
          })
        );
      }
    });

    ws.on("close", () => {
      clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    });
  });

  function broadcastToRoom(roomId: string, message: WSResponse) {
    const room = storage.getRoom(roomId);
    if (!room) return;

    const playerIds = [room.players.X, room.players.O].filter(Boolean) as string[];

    clients.forEach((client, clientId) => {
      if (playerIds.includes(clientId) && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  return httpServer;
}
