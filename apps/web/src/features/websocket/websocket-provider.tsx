import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { WebSocketContext } from "./websocket-context";

type Props = {
  children: React.ReactNode;
};

export const WebSocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws");

    ws.addEventListener("open", (event) => {
      toast("Connected");
      console.log("WebSocket connected", event);
    });
    ws.addEventListener("message", (event) => {
      toast(event.data);
      console.log("WebSocket message", event);
    });

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
