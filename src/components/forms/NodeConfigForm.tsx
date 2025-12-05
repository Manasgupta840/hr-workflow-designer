import type { Node } from "@xyflow/react";
import { NodeTypes } from "../../constants/common.constants";
import StartNodeForm from "./StartNodeForm";
import TaskNodeForm from "./TaskNodeForm";
import type {
  ApprovalNodeData,
  AutomatedNodeData,
  EndNodeData,
  StartNodeData,
  TaskNodeData,
  WorkflowNodeData,
} from "../../types/workflow";
import EndNodeForm from "./EndNodeForm";
import ApprovalNodeForm from "./ApprovalNodeForm";
import AutomatedNodeForm from "./AutomatedNodeForm";

interface AutomatedNodeFormProps {
  node: Node<WorkflowNodeData>;
  onChange: (id: string, partial: Partial<WorkflowNodeData>) => void;
  onSuccess: () => void;
  selectedNodeType: NodeTypes;
}

const NodeConfigForm = (props: AutomatedNodeFormProps) => {
  const { node, selectedNodeType, ...rest } = props;
  switch (selectedNodeType) {
    case NodeTypes.start:
      return <StartNodeForm node={node as Node<StartNodeData>} {...rest} />;
    case NodeTypes.end:
      return <EndNodeForm node={node as Node<EndNodeData>} {...rest} />;
    case NodeTypes.task:
      return <TaskNodeForm node={node as Node<TaskNodeData>} {...rest} />;
    case NodeTypes.approval:
      return (
        <ApprovalNodeForm node={node as Node<ApprovalNodeData>} {...rest} />
      );
    case NodeTypes.automated:
      return (
        <AutomatedNodeForm node={node as Node<AutomatedNodeData>} {...rest} />
      );
    default:
      return null;
  }
};

export default NodeConfigForm;
