import { useWorkflowStore } from "../../state/workflowStore";
import type { WorkflowNodeData } from "../../types/workflow";

type SidebarItemProps = {
  label: string;
  type: WorkflowNodeData["type"];
  icon?: React.ReactNode;
};

const SidebarItem = ({ label, type, icon }: SidebarItemProps) => {
  const { onDragStart } = useWorkflowStore();

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className="flex items-center gap-3 bg-white py-2 px-3 rounded-md shadow-sm border border-gray-200 cursor-grab hover:bg-gray-100 active:cursor-grabbing transition-all"
    >
      {icon}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default SidebarItem;
