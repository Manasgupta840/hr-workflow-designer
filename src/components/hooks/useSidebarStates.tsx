import { useCallback, useEffect, useState } from "react";
import { fileNamePrefix } from "../../constants/common.constants";
import { useWorkflowStore } from "../../state/workflowStore";

const useSidebarStates = () => {
  const {
    loadWorkflow,
    getSavedWorkflowsNames,
    currentWorkflowName,
    createNewWorkflow,
  } = useWorkflowStore();

  const getList = useCallback(() => {
    return getSavedWorkflowsNames().map((key) => ({
      id: key,
      name: key.replace(`-${fileNamePrefix}`, ""),
    }));
  }, [getSavedWorkflowsNames]);

  const [fileNamesList, setFileNamesList] = useState(() => getList());

  useEffect(() => {
    const handler = () => setFileNamesList(getList());
    globalThis.addEventListener("storage", handler);
    return () => globalThis.removeEventListener("storage", handler);
  }, [getList]);

  const handleLoadFile = (fileName: string) => {
    loadWorkflow(fileName);
  };

  const handleDeleteFile = (fileName: string) => {
    if (fileName === `${currentWorkflowName}-${fileNamePrefix}`) {
      createNewWorkflow();
    }
    localStorage.removeItem(fileName);
    globalThis.dispatchEvent(new Event("storage"));
  };

  return { fileNamesList, handleLoadFile, handleDeleteFile };
};

export default useSidebarStates;
