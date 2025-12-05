import { useTopNavStates } from "../hooks/useTopNavStates";

const TopNav = () => {
  const {
    currentWorkflowName,
    isEditingEnabled,
    setIsEditingEnabled,
    setCurrentWorkflowName,
    saveWorkflow,
  } = useTopNavStates();
  return (
    <header className="h-12 border-b-2 border-gray-200 px-4 pr-8 flex items-center justify-between">
      <div className="inline flex gap-1">
        <div className="font-semibold">HR Workflow Designer</div>/
        {isEditingEnabled ? (
          <input
            type="text"
            value={currentWorkflowName ?? ""}
            onChange={(e) => setCurrentWorkflowName(e.target.value)}
            onBlur={() => setIsEditingEnabled(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingEnabled(false)}
          />
        ) : (
          <div
            className="cursor-pointer font-medium text-gray-600"
            onDoubleClick={() => setIsEditingEnabled(true)}
          >
            {currentWorkflowName}
          </div>
        )}
      </div>
      <button
        onClick={saveWorkflow}
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        <span>Save</span>
      </button>
    </header>
  );
};

export default TopNav;
