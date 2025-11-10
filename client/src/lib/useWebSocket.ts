import { useState, useEffect, useRef, useCallback } from "react";
import { WSMessage, WSResponse, GameRoom } from "@shared/schema";

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const response: WSResponse = JSON.parse(event.data);
        console.log("WebSocket message:", response);

        switch (response.type) {
          case "room_created":
          case "room_joined":
          case "player_joined":
          case "game_state":
          case "game_over":
            if (response.game) {
              setGameRoom(response.game);
            }
            if (response.playerSymbol) {
              setPlayerSymbol(response.playerSymbol);
            }
            break;
          case "error":
            console.error("WebSocket error:", response.error);
            break;
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
      setSocket(null);

      reconnectTimeout.current = setTimeout(() => {
        console.log("Attempting to reconnect...");
        connect();
      }, 3000);
    };

    setSocket(ws);
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback(
    (message: WSMessage) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not connected");
      }
    },
    [socket]
  );

  const createRoom = useCallback(() => {
    sendMessage({ type: "create" });
  }, [sendMessage]);

  const joinRoom = useCallback(
    (roomId: string) => {
      sendMessage({ type: "join", roomId });
    },
    [sendMessage]
  );

  const makeMove = useCallback(
    (roomId: string, cellIndex: number) => {
      sendMessage({ type: "move", roomId, cellIndex });
    },
    [sendMessage]
  );

  return {
    connected,
    gameRoom,
    playerSymbol,
    createRoom,
    joinRoom,
    makeMove,
  };
}
