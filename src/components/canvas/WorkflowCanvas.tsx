import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  type ColorMode,
  applyEdgeChanges,
  type Connection,
  addEdge,
  Panel,
  MiniMap,
  type EdgeChange,
  type Edge,
  type NodeChange,
  type Node,
} from "@xyflow/react";
import "reactflow/dist/style.css";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEventHandler,
} from "react";
import { useWorkflowStore } from "../../state/workflowStore";
import type { WorkflowNodeData } from "../../types/workflow";

export const WorkflowCanvas = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectNode,
    nodeTypes,
    onDragOver,
    onDrop,
    setRfInstance,
    rfInstance,
  } = useWorkflowStore();

  const [colorMode, setColorMode] = useState<ColorMode>("dark");

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  useEffect(() => {
    if (rfInstance) {
      rfInstance.fitView();
    }
  }, [rfInstance]);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<WorkflowNodeData>>[]) =>
      setNodes((nds: Node<WorkflowNodeData>[]) => {
        const updatedNodes = applyNodeChanges(changes, nds);
        return updatedNodes;
      }),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (conn: Connection) => setEdges((eds: Edge[]) => addEdge({ ...conn }, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={(_, node) => selectNode(node.id)}
      fitView
      onInit={setRfInstance}
      colorMode={colorMode}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Background />
      <MiniMap />
      <Controls />
      <Panel position="top-right">
        <div className="inline flex gap-2">
          <select
            className="p-1 rounded"
            onChange={onChange}
            data-testid="colormode-select"
          >
            <option value="dark">dark</option>
            <option value="light">light</option>
            <option value="system">system</option>
          </select>
        </div>
      </Panel>
    </ReactFlow>
  );
};
