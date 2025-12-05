import { Trash } from "lucide-react";

type SavedWorkflowItemProps = {
  name: string;
  onClick: () => void;
  onDelete: () => void;
};

const SavedWorkflowItem = ({
  name,
  onClick,
  onDelete,
}: SavedWorkflowItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 text-sm text-gray-700 overflow-hidden text-ellipsis rounded-md hover:bg-gray-200 transition-colors border border-transparent hover:border-gray-300"
      >
        {name}
      </button>
      <Trash onClick={onDelete} className="cursor-pointer" size={16} />
    </div>
  );
};

export default SavedWorkflowItem;
