import { useForm } from "react-hook-form";
import { Zap, Settings, Check } from "lucide-react";
import type { AutomatedNodeData, WorkflowNodeData } from "../../types/workflow";
import type { Node } from "@xyflow/react";
import { createPortal } from "react-dom";
import { Button } from "@mui/material";
import { editFormPortalId } from "../../constants/common.constants";
import { useEffect } from "react";

interface AutomatedNodeFormProps {
  node: Node<AutomatedNodeData>;
  onChange: (id: string, partial: Partial<WorkflowNodeData>) => void;
  onSuccess: () => void;
}

const MOCK_ACTIONS = [
  {
    id: "send-email",
    label: "Send Email",
    params: [
      { key: "recipient", label: "Recipient Email" },
      { key: "subject", label: "Subject" },
    ],
  },
  {
    id: "update-db",
    label: "Update Database",
    params: [
      { key: "table", label: "Table Name" },
      { key: "recordId", label: "Record ID" },
    ],
  },
  {
    id: "webhook",
    label: "Trigger Webhook",
    params: [{ key: "url", label: "Webhook URL" }],
  },
];

const AutomatedNodeForm = ({
  node,
  onChange,
  onSuccess,
}: AutomatedNodeFormProps) => {
  const {
    register,
    formState: { isDirty },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      label: node.data.label,
      action: node.data.action ?? "",
      actionParams: node.data.actionParams ?? {},
    },
  });

  const formSubmitWrapper = document.getElementById(editFormPortalId);
  const selectedActionId = watch("action");
  const selectedAction = MOCK_ACTIONS.find((a) => a.id === selectedActionId);

  // Reset params when action changes
  useEffect(() => {
    if (selectedActionId && selectedActionId !== node.data.action) {
      // Only reset if it's a new selection, not initial load
      // Actually, react-hook-form handles default values, so we might not need to force reset unless we want to clear params on change.
      // For now, let's keep params if they match keys, or just let user edit.
      // A cleaner way is to just let the inputs be controlled by the new action's params.
    }
  }, [selectedActionId, node.data.action]);

  const onAutomationNodeSubmit = handleSubmit((data) => {
    onChange(node.id, data);
    onSuccess();
  });

  return (
    <form
      id="automation-node-form"
      className="space-y-4 text-sm text-gray-700"
      onSubmit={onAutomationNodeSubmit}
    >
      {formSubmitWrapper &&
        createPortal(
          <Button
            type="submit"
            form="automation-node-form"
            disabled={!isDirty}
            variant="contained"
            size="small"
            startIcon={<Check className="w-5 h-5" />}
          >
            Save
          </Button>,
          formSubmitWrapper
        )}

      <div className="space-y-1">
        <label className="flex items-center gap-2 font-semibold text-gray-900">
          <Zap size={16} className="text-blue-500" />
          Title
        </label>
        <input
          {...register("label", { required: true })}
          placeholder="Enter automation title"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 font-semibold text-gray-900">
          <Settings size={16} className="text-blue-500" />
          Action
        </label>
        <select
          {...register("action", { required: true })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
        >
          <option value="" disabled>
            Select an action...
          </option>
          {MOCK_ACTIONS.map((action) => (
            <option key={action.id} value={action.id}>
              {action.label}
            </option>
          ))}
        </select>
      </div>

      {selectedAction && (
        <div className="space-y-3 border-t border-gray-200 pt-3 mt-3">
          <h4 className="font-medium text-gray-900">Action Parameters</h4>
          {selectedAction.params.map((param) => (
            <div key={param.key} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                {param.label}
              </label>
              <input
                {...register(`actionParams.${param.key}` as const, {
                  required: true,
                })}
                placeholder={`Enter ${param.label.toLowerCase()}`}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default AutomatedNodeForm;
