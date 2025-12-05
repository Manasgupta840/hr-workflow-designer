import { memo } from "react";
import { type NodeProps, type Node } from "@xyflow/react";
import BaseNode from "./BaseNode";
import type { WorkflowNodeData } from "../../types/workflow";

const ApprovalNode = (props: NodeProps<Node<WorkflowNodeData>>) => {
  const { data } = props;
  const badge = "Approval";
  const badgeColor = "bg-amber-50 text-amber-600";

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

export default memo(ApprovalNode);
