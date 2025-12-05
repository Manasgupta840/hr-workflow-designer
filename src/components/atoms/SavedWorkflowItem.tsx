type SavedWorkflowItemProps = {
  name: string;
  onClick: () => void;
};

const SavedWorkflowItem = ({ name, onClick }: SavedWorkflowItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 transition-colors border border-transparent hover:border-gray-300"
    >
      {name}
    </button>
  );
};

export default SavedWorkflowItem;
