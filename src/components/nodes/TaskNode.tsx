import { memo } from "react";
import { type NodeProps, type Node } from "@xyflow/react";
import BaseNode from "./BaseNode";
import type { WorkflowNodeData } from "../../types/workflow";

const TaskNode = (props: NodeProps<Node<WorkflowNodeData>>) => {
  const { data } = props;
  const badge = "Task";
  const badgeColor = "bg-indigo-50 text-indigo-600";

  return (
    <BaseNode
      {...props}
      data={{
        ...data,
        badge,
        badgeColor,
      }}
    />
  );
};

export default memo(TaskNode);
