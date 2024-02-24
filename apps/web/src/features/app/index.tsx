import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/sonner";
import Config from "../config";
import Discussion from "../discussion";
import { WebSocketProvider } from "../websocket/websocket-provider";

function App() {
  return (
    <WebSocketProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel className="p-4 min-w-96">
          <Discussion />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="p-4">
          <Config />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Toaster />
    </WebSocketProvider>
  );
}

export default App;
