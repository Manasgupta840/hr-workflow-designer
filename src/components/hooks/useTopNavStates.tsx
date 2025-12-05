import { useWorkflowStore } from "../../state/workflowStore";
import { useState } from "react";

export const useTopNavStates = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>(false);
  const {
    currentWorkflowName,
    setCurrentWorkflowName,
    saveWorkflow,
    createNewWorkflow,
  } = useWorkflowStore();

  return {
    currentWorkflowName,
    isEditingEnabled,
    setIsEditingEnabled,
    setCurrentWorkflowName,
    saveWorkflow,
    createNewWorkflow,
  };
};
