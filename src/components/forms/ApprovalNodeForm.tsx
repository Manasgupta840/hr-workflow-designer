import { useForm, useFieldArray } from "react-hook-form";
import {
  Type,
  AlignLeft,
  User,
  Calendar,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import type { ApprovalNodeData, WorkflowNodeData } from "../../types/workflow";
import type { Node } from "@xyflow/react";
import { createPortal } from "react-dom";
import { Button } from "@mui/material";
import { editFormPortalId } from "../../constants/common.constants";
import Input from "../atoms/Input";

interface ApprovalNodeFormProps {
  node: Node<ApprovalNodeData>;
  onChange: (id: string, partial: Partial<WorkflowNodeData>) => void;
  onSuccess: () => void;
}

interface FormValues {
  label: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: { key: string; value: string }[];
}

const ApprovalNodeForm = ({
  node,
  onChange,
  onSuccess,
}: ApprovalNodeFormProps) => {
  const {
    register,
    control,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      label: node.data.label,
      description: node.data.description ?? "",
      assignee: node.data.assignee ?? "",
      dueDate: node.data.dueDate ?? "",
      customFields: Object.entries(node.data.customFields || {}).map(
        ([key, value]) => ({
          key,
          value,
        })
      ),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const formSubmitWrapper = document.getElementById(editFormPortalId);

  const onApprovalNodeSubmit = handleSubmit((data) => {
    const customFieldsRecord: Record<string, string> = data.customFields.reduce(
      (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
      {}
    );

    onChange(node.id, {
      label: data.label,
      description: data.description,
      assignee: data.assignee,
      dueDate: data.dueDate,
      customFields: customFieldsRecord,
    });
    onSuccess();
  });

  return (
    <form
      id="approval-node-form"
      className="space-y-4 text-sm text-gray-700"
      onSubmit={onApprovalNodeSubmit}
    >
      {formSubmitWrapper &&
        createPortal(
          <Button
            type="submit"
            form="approval-node-form"
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
          placeholder="Enter approval title"
          error={!!errors.label}
          helperText={errors.label?.message}
          label="Title"
          labelIcon={<Type size={16} className="text-blue-500" />}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 font-semibold text-gray-900">
          <AlignLeft size={16} className="text-blue-500" />
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Describe the approval request..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <Input
            {...register("assignee")}
            placeholder="Who is responsible?"
            error={!!errors.assignee}
            helperText={errors.assignee?.message}
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
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold text-gray-900">
            Custom Fields
          </span>
          <button
            type="button"
            onClick={() => append({ key: "", value: "" })}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
          >
            <Plus size={14} />
            Add Field
          </button>
        </div>

        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <Input
                {...register(`customFields.${index}.key` as const, {
                  required: true,
                })}
                placeholder="Key"
                error={!!errors.customFields?.[index]?.key}
                helperText={errors.customFields?.[index]?.key?.message}
                required
              />
              <Input
                {...register(`customFields.${index}.value` as const, {
                  required: true,
                })}
                placeholder="Value"
                error={!!errors.customFields?.[index]?.value}
                helperText={errors.customFields?.[index]?.value?.message}
                required
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {fields.length === 0 && (
            <div className="text-center py-4 text-gray-400 text-xs border-2 border-dashed border-gray-200 rounded-lg">
              No custom fields
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ApprovalNodeForm;
