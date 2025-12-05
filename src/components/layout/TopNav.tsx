import { Button } from "@mui/material";
import { useTopNavStates } from "../hooks/useTopNavStates";
import { PlusIcon } from "lucide-react";

const TopNav = () => {
  const {
    currentWorkflowName,
    isEditingEnabled,
    setIsEditingEnabled,
    setCurrentWorkflowName,
    saveCurrentWorkflow,
    createNewWorkflow,
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
      <div className="flex gap-2">
        <Button
          variant="contained"
          size="small"
          onClick={createNewWorkflow}
          className="px-4 py-1 bg-blue-500 text-white rounded"
          startIcon={<PlusIcon className="w-5 h-5" />}
        >
          <span>New Workflow</span>
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={saveCurrentWorkflow}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          <span>Save Workflow</span>
        </Button>
      </div>
    </header>
  );
};

export default TopNav;
