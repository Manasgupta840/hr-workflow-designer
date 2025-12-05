import { memo, useState } from "react";
import {
  Position,
  Handle,
  type NodeProps,
  NodeResizer,
  type Node,
} from "@xyflow/react";
import type { BaseNodeData } from "../../types/workflow";
import { useWorkflowStore } from "../../state/workflowStore";

const BaseNode = ({ id, data, selected }: NodeProps<Node<BaseNodeData>>) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateNodeData } = useWorkflowStore();
  const handleDirection = data.handleDirection || [
    "left",
    "right",
    "top",
    "bottom",
  ];

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border px-3 py-2 min-w-[140px] text-xs relative ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={120}
        minHeight={40}
      />

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-gray-400"
        hidden={!handleDirection?.includes("left")}
        id="left"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400"
        hidden={!handleDirection?.includes("top")}
        id="top"
      />

      <div className="flex items-center justify-between mb-1">
        {isEditing ? (
          <input
            value={data.label}
            onBlur={() => setIsEditing(false)}
            onChange={(e) => updateNodeData(id, { label: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            className="text-xs border rounded px-1"
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={() => setIsEditing(true)}
            className="font-medium text-gray-800 cursor-pointer"
          >
            {data.label || "Untitled"}
          </div>
        )}

        <span
          className={`text-[9px] px-1.5 py-0.5 rounded-full
            ${data.badgeColor}`}
        >
          {data.badge}
        </span>
      </div>

      <Handle
        type="source"
        hidden={!handleDirection?.includes("right")}
        position={Position.Right}
        className="!bg-gray-400"
        id="right"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400"
        hidden={!handleDirection?.includes("bottom")}
        id="bottom"
      />
    </div>
  );
};

export default memo(BaseNode);
