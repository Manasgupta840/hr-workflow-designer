import { useForm } from "react-hook-form";
import { MessageSquare, Flag, Check } from "lucide-react";
import type { EndNodeData, WorkflowNodeData } from "../../types/workflow";
import type { Node } from "@xyflow/react";
import { createPortal } from "react-dom";
import { Button, Switch } from "@mui/material";
import { editFormPortalId } from "../../constants/common.constants";

interface EndNodeFormProps {
  node: Node<EndNodeData>;
  onChange: (id: string, partial: Partial<WorkflowNodeData>) => void;
  onSuccess: () => void;
}

const EndNodeForm = ({ node, onChange, onSuccess }: EndNodeFormProps) => {
  const {
    register,
    formState: { isDirty },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      endMessage: node.data.endMessage ?? "",
      summaryFlag: node.data.summaryFlag ?? false,
    },
  });

  const formSubmitWrapper = document.getElementById(editFormPortalId);
  const summaryFlag = watch("summaryFlag");

  const onEndNodeSubmit = handleSubmit((data) => {
    onChange(node.id, data);
    onSuccess();
  });

  return (
    <form
      id="end-node-form"
      className="space-y-4 text-sm text-gray-700"
      onSubmit={onEndNodeSubmit}
    >
      {formSubmitWrapper &&
        createPortal(
          <Button
            type="submit"
            form="end-node-form"
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
          <MessageSquare size={16} className="text-blue-500" />
          End Message
        </label>
        <textarea
          {...register("endMessage")}
          rows={3}
          placeholder="Enter a closing message..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
        />
      </div>

      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
        <label className="flex items-center gap-2 font-semibold text-gray-900">
          <Flag size={16} className="text-blue-500" />
          Show Summary
        </label>
        <Switch
          checked={summaryFlag}
          onChange={(e) =>
            setValue("summaryFlag", e.target.checked, { shouldDirty: true })
          }
          color="primary"
          size="small"
        />
      </div>
    </form>
  );
};

export default EndNodeForm;
