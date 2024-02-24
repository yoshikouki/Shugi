import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <Button
          variant="default"
          onClick={() => setCount((count) => count + 1)}
        >
          {count}
        </Button>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default App;
