import { fileNamePrefix } from "../../constants/common.constants";
import { useWorkflowStore } from "../../state/workflowStore";

const useSidebarStates = () => {
  const { loadWorkflow } = useWorkflowStore();

  const fileNamesList = Object.keys(localStorage)
    .filter((key) => key.includes(fileNamePrefix))
    .map((key) => {
      return {
        id: key,
        name: key.replace(`-${fileNamePrefix}`, ""),
      };
    });

  const handleLoadFile = (fileName: string) => {
    loadWorkflow(fileName);
  };

  return { fileNamesList, handleLoadFile };
};

export default useSidebarStates;
