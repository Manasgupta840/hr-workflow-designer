import { useForm } from "react-hook-form";
import { Type, AlignLeft, User, Calendar, Check } from "lucide-react";
import type { TaskNodeData, WorkflowNodeData } from "../../types/workflow";
import type { Node } from "@xyflow/react";
import { createPortal } from "react-dom";
import { Button, TextField } from "@mui/material";
import { editFormPortalId } from "../../constants/common.constants";

interface TaskNodeFormProps {
  node: Node<TaskNodeData>;
  onChange: (id: string, partial: Partial<WorkflowNodeData>) => void;
  onSuccess: () => void;
}

const TaskNodeForm = ({ node, onChange, onSuccess }: TaskNodeFormProps) => {
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      label: node.data.label,
      description: node.data.description ?? "",
      assignee: node.data.assignee ?? "",
      dueDate: node.data.dueDate ?? "",
    },
  });

  const formSubmitWrapper = document.getElementById(editFormPortalId);

  const onTaskNodeSubmit = handleSubmit((data) => {
    onChange(node.id, data);
    onSuccess();
  });

  return (
    <form
      id="task-node-form"
      className="space-y-4 text-sm text-gray-700"
      onSubmit={onTaskNodeSubmit}
    >
      {formSubmitWrapper &&
        createPortal(
          <Button
            type="submit"
            form="task-node-form"
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
          <Type size={16} className="text-blue-500" />
          <div>
            Title
            <span className="text-red-500">*</span>
          </div>
        </label>
        <TextField
          {...register("label", { required: true })}
          error={!!errors.label}
          helperText={errors.label?.message}
          placeholder="Enter task title"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 font-semibold text-gray-900">
          <AlignLeft size={16} className="text-blue-500" />
          <div>
            Description
            <span className="text-red-500">*</span>
          </div>
        </label>
        <TextField
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description?.message}
          placeholder="Describe the task..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-semibold text-gray-900">
            <User size={16} className="text-blue-500" />
            <div>
              Assignee
              <span className="text-red-500">*</span>
            </div>
          </label>
          <TextField
            {...register("assignee", { required: true })}
            error={!!errors.assignee}
            helperText={errors.assignee?.message}
            placeholder="Who is responsible?"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="flex items-center gap-2 font-semibold text-gray-900">
            <Calendar size={16} className="text-blue-500" />
            <div>Due Date</div>
          </label>
          <TextField
            type="date"
            {...register("dueDate")}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>
      </div>
    </form>
  );
};

export default TaskNodeForm;
