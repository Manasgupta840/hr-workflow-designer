import { useWorkflowStore } from "../../state/workflowStore";
import { useState } from "react";

export const useTopNavStates = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>(false);
  const { currentWorkflowName, setCurrentWorkflowName, saveWorkflow } =
    useWorkflowStore();

  return {
    currentWorkflowName,
    isEditingEnabled,
    setIsEditingEnabled,
    setCurrentWorkflowName,
    saveWorkflow,
  };
};
