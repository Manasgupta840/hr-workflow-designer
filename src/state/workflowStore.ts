// state/workflowStore.ts
import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type XYPosition,
  type NodeChange,
  type EdgeChange,
  type Node,
  type NodeTypes,
  type ReactFlowInstance,
} from "@xyflow/react";
import { nanoid } from "nanoid";

import type { WorkflowNodeData } from "../types/workflow";
import TaskNode from "../components/nodes/TaskNode";
import ApprovalNode from "../components/nodes/ApprovalNode";
import StartNode from "../components/nodes/StartNode";
import type { DragEvent } from "react";
import EndNode from "../components/nodes/EndNode";
import AutomatedNode from "../components/nodes/AutomatedNode";
import { fileNamePrefix } from "../constants/common.constants";

interface WorkflowStore {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  nodeTypes: NodeTypes;

  // Node actions
  setNodes: (
    updater: (nodes: Node<WorkflowNodeData>[]) => Node<WorkflowNodeData>[]
  ) => void;
  addNode: (type: WorkflowNodeData["type"], position: XYPosition) => void;
  updateNodeData: (id: string, partial: Partial<WorkflowNodeData>) => void;
  deleteNode: (id: string) => void;
  getSelectedNode: () => Node<WorkflowNodeData> | undefined;

  //Edit Node actions
  toggleDrawer: (open: boolean) => void;
  isDrawerOpen: boolean;

  // Edge actions
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void;

  // Selection
  selectNode: (id: string | null) => void;

  // Canvas change handlers for React Flow
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  //Drag and drop handlers
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onDragStart: (
    event: DragEvent<HTMLDivElement>,
    nodeType: WorkflowNodeData["type"]
  ) => void;

  //save or load
  rfInstance: ReactFlowInstance<Node<WorkflowNodeData>, Edge> | null;
  setRfInstance: (
    instance: ReactFlowInstance<Node<WorkflowNodeData>, Edge>
  ) => void;

  //workFlow actions
  saveWorkflow: () => void;
  loadWorkflow: (fileName: string) => void;
  currentWorkflowName: string | null;
  setCurrentWorkflowName: (name: string | null) => void;
  getSavedWorkflowsNames: () => string[];
  createNewWorkflow: () => void;
}

const createInitialNodeData = (
  id: string,
  type: WorkflowNodeData["type"]
): WorkflowNodeData => {
  const common = {
    id,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    badge: "",
    badgeColor: "",
  };

  switch (type) {
    case "start":
      return { ...common, type: "start", meta: {} } as WorkflowNodeData;
    case "end":
      return { ...common, type: "end", meta: {} } as WorkflowNodeData;
    case "task":
      return { ...common, type: "task", customFields: {} } as WorkflowNodeData;
    case "approval":
      return {
        ...common,
        type: "approval",
        customFields: {},
      } as WorkflowNodeData;
    case "automated":
      return {
        ...common,
        type: "automated",
        customFields: {},
      } as WorkflowNodeData;
  }

  throw new Error(`Unhandled node type: ${type}`);
};

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  currentWorkflowName: "Untitled Workflow",
  nodeTypes: {
    start: StartNode,
    task: TaskNode,
    approval: ApprovalNode,
    end: EndNode,
    automated: AutomatedNode,
  },
  rfInstance: null,
  isDrawerOpen: false,
  toggleDrawer: (open: boolean) => set({ isDrawerOpen: open }),

  setRfInstance: (instance) => set({ rfInstance: instance }),

  setNodes: (updater) => set((state) => ({ nodes: updater(state.nodes) })),
  setEdges: (updater) => set((state) => ({ edges: updater(state.edges) })),

  setCurrentWorkflowName: (name) => set({ currentWorkflowName: name }),

  getSelectedNode: () => {
    const { selectedNodeId, nodes } = get();
    return nodes.find((node) => node.id === selectedNodeId);
  },

  addNode: (type, position) => {
    const id = nanoid();
    const nodeData: WorkflowNodeData = createInitialNodeData(id, type);
    const newNode: Node<WorkflowNodeData> = {
      id,
      type,
      position,
      data: nodeData,
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
      selectedNodeId: id,
    }));
  },

  updateNodeData: (id, partial) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: { ...n.data, ...partial } as WorkflowNodeData,
            }
          : n
      ),
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  selectNode: (id) => set({ selectedNodeId: id }),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes) as Node<WorkflowNodeData>[],
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onDragOver: (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },

  onDrop: (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData(
      "application/reactflow"
    ) as WorkflowNodeData["type"];

    // check if the dropped element is valid
    if (type === undefined || !type) {
      return;
    }

    const position = { x: event.clientX, y: event.clientY };
    const id = nanoid();

    const nodeData: WorkflowNodeData = createInitialNodeData(id, type);
    const newNode: Node<WorkflowNodeData> = {
      id,
      type,
      position,
      data: nodeData,
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
      selectedNodeId: id,
    }));
  },

  onDragStart: (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  },

  saveWorkflow: () => {
    const { rfInstance, currentWorkflowName } = get(); // access current state

    if (!rfInstance) return;
    const flowKey = `${currentWorkflowName}-${fileNamePrefix}`;
    const flow = rfInstance.toObject();

    localStorage.setItem(flowKey, JSON.stringify(flow));
    globalThis.dispatchEvent(new Event("storage"));
  },

  loadWorkflow: (currentWorkflowName: string) => {
    const { rfInstance, setCurrentWorkflowName } = get();

    if (!rfInstance) return;
    setCurrentWorkflowName(currentWorkflowName);
    const flowKey = `${currentWorkflowName}-${fileNamePrefix}`;
    const saved = localStorage.getItem(flowKey);
    if (!saved) return null;
    const restoreFlow = async () => {
      const flow = JSON.parse(saved);

      if (flow) {
        set(() => ({ nodes: flow.nodes || [], edges: flow.edges || [] }));
      }
    };

    restoreFlow();
  },

  getSavedWorkflowsNames: () => {
    return Object.keys(localStorage).filter((key) =>
      key.includes(fileNamePrefix)
    );
  },

  createNewWorkflow: () => {
    const { setCurrentWorkflowName } = get();
    setCurrentWorkflowName("Untitled Workflow");
    set(() => ({ nodes: [], edges: [] }));
  },
}));
