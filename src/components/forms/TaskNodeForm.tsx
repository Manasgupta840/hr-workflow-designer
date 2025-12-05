import { useForm } from "react-hook-form";
import { Type, AlignLeft, User, Calendar, Check } from "lucide-react";
import type { TaskNodeData, WorkflowNodeData } from "../../types/workflow";
import type { Node } from "@xyflow/react";
import { createPortal } from "react-dom";
import { Button } from "@mui/material";
import { editFormPortalId } from "../../constants/common.constants";
import Input from "../atoms/Input";

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
        <Input
          {...register("label", { required: true })}
          error={!!errors.label}
          helperText={errors.label?.message}
          placeholder="Enter task title"
          label="Title"
          labelIcon={<Type size={16} className="text-blue-500" />}
          required
        />
      </div>

      <div className="space-y-1">
        <Input
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description?.message}
          placeholder="Describe the task..."
          label="Description"
          labelIcon={<AlignLeft size={16} className="text-blue-500" />}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <Input
            {...register("assignee", { required: true })}
            error={!!errors.assignee}
            helperText={errors.assignee?.message}
            placeholder="Who is responsible?"
            label="Assignee"
            labelIcon={<User size={16} className="text-blue-500" />}
            required
          />
        </div>

        <div className="space-y-1">
          <Input
            type="date"
            {...register("dueDate")}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
            label="Due Date"
            labelIcon={<Calendar size={16} className="text-blue-500" />}
          />
        </div>
      </div>
    </form>
  );
};

export default TaskNodeForm;
