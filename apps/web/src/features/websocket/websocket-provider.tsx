import React, { useEffect, useState } from "react";

import { WebSocketContext } from "./websocket-context";

type Props = {
  children: React.ReactNode;
};

export const WebSocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
