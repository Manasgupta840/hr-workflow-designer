import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import AppLayout from "./components/layout/AppLayout";

if (import.meta.env.DEV) {
  const { worker } = await import("./api/mock/browser");
  worker.start();
}

function App() {
  return (
    <ReactFlowProvider>
      <AppLayout />
    </ReactFlowProvider>
  );
}

export default App;
