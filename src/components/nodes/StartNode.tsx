import { type Node, type NodeProps } from "@xyflow/react";
import type { StartNodeData } from "../../types/workflow";
import BaseNode from "./BaseNode";

const StartNode = (props: NodeProps<Node<StartNodeData>>) => {
  const { data } = props;
  return (
    <BaseNode
      {...props}
      data={{
        ...data,
        handleDirection: ["bottom"],
      }}
    />
  );
};

export default StartNode;
