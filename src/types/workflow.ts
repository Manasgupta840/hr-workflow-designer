export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface BaseNodeData {
  id: string;
  label: string;
  badge: string;
  badgeColor: string;
  type?: NodeType;
  [key: string]: unknown;
  handleDirection?: ("left" | "right" | "top" | "bottom")[];
}

export interface StartNodeData extends BaseNodeData {
  type: "start";
  meta: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  type: "task";
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  type: "approval";
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields: Record<string, string>;
}

export interface AutomatedNodeData extends BaseNodeData {
  type: "automated";
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  type: "end";
  meta: Record<string, string>;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;
