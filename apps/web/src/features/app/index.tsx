import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import Discussion from "../discussion";
import { WebSocketProvider } from "../websocket/websocket-provider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <WebSocketProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel className="p-4 min-w-96">
          <Discussion />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="p-4">
          <Button
            variant="default"
            onClick={() => setCount((count) => count + 1)}
          >
            {count}
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </WebSocketProvider>
  );
}

export default App;
