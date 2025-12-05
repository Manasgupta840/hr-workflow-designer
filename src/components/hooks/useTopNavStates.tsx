import { simulateWorkflow } from "../../api/client";
import { useWorkflowStore } from "../../state/workflowStore";
import { useState } from "react";

export const useTopNavStates = () => {
  const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>(false);
  const {
    currentWorkflowName,
    setCurrentWorkflowName,
    saveWorkflow,
    createNewWorkflow,
    rfInstance,
  } = useWorkflowStore();

  const saveCurrentWorkflow = async () => {
    const flow = rfInstance?.toObject();
    const response = await simulateWorkflow(flow);
    console.log(response);
    if (currentWorkflowName) {
      saveWorkflow();
    }
  };

  return {
    currentWorkflowName,
    isEditingEnabled,
    setIsEditingEnabled,
    setCurrentWorkflowName,
    saveCurrentWorkflow,
    createNewWorkflow,
  };
};
