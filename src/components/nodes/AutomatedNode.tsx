import { type Node, type NodeProps } from "@xyflow/react";
import BaseNode from "./BaseNode";
import type { AutomatedNodeData } from "../../types/workflow";

const AutomatedNode = (props: NodeProps<Node<AutomatedNodeData>>) => {
  const { data } = props;
  return (
    <BaseNode
      {...props}
      data={{
        ...data,
      }}
    />
  );
};

export default AutomatedNode;
