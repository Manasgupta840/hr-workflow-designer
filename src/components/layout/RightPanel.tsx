import { useWorkflowStore } from "../../state/workflowStore";
import EditNodes from "../editNodes/EditNodes";

const RightPanel = () => {
  const { isDrawerOpen } = useWorkflowStore();

  if (!isDrawerOpen) {
    return null;
  }

  return <EditNodes />;
};

export default RightPanel;
