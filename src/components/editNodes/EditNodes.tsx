import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { useWorkflowStore } from "../../state/workflowStore";
import { XIcon } from "lucide-react";
import { editFormPortalId, NodeTypes } from "../../constants/common.constants";
import NodeConfigForm from "../forms/NodeConfigForm";

const EditNodes = () => {
  const { toggleDrawer, isDrawerOpen, getSelectedNode, updateNodeData } =
    useWorkflowStore();

  const selectedNode = getSelectedNode();

  const onSuccess = () => {
    toggleDrawer(false);
  };
  if (!selectedNode) {
    return null;
  }

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      anchor="right"
    >
      <Box sx={{ width: 450 }}>
        <div className="flex items-center justify-between p-4">
          <Typography variant="h6">Edit Node</Typography>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleDrawer(false)}
              startIcon={<XIcon className="w-5 h-5" />}
            >
              Cancel
            </Button>
            <div id={editFormPortalId}></div>
          </div>
        </div>
        <Divider />

        <Box sx={{ padding: "8px" }}>
          <Typography variant="body2" color="textSecondary">
            * Required fields
          </Typography>
        </Box>

        <Box sx={{ padding: "16px" }}>
          <NodeConfigForm
            node={selectedNode}
            selectedNodeType={selectedNode.type as NodeTypes}
            onChange={updateNodeData}
            onSuccess={onSuccess}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default EditNodes;
