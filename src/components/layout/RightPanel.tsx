import { useWorkflowStore } from "../../state/workflowStore";
import NodeConfigForm from "../forms/NodeConfigForm";

const RightPanel = () => {
  const { selectedNodeId, updateNodeData } = useWorkflowStore();

  if (!selectedNodeId) {
    return (
      <aside className="w-80 border-l bg-white p-4 text-sm text-slate-500">
        Select a node to edit its configuration.
      </aside>
    );
  }

  return (
    <aside className="w-80 border-l bg-white flex flex-col">
      <header className="px-4 py-3 border-b text-sm font-semibold">
        {selectedNode.data.label}
      </header>
      <div className="flex-1 overflow-auto p-4">
        <NodeConfigForm node={selectedNode} onChange={updateNodeData} />
      </div>
      <footer className="p-3 border-t text-right text-xs text-slate-400">
        Changes auto-save to the canvas
      </footer>
    </aside>
  );
};

export default RightPanel;
