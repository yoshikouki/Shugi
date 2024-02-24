import { useContext } from "react";

import { WebSocketContext } from "./websocket-context";

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
