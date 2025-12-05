import { useForm, useFieldArray } from "react-hook-form";
import { Type, Check, Plus, Trash2 } from "lucide-react";
import type { StartNodeData, WorkflowNodeData } from "../../types/workflow";
import type { Node } from "@xyflow/react";
import { createPortal } from "react-dom";
import { Button } from "@mui/material";
import { editFormPortalId } from "../../constants/common.constants";
import Input from "../atoms/Input";

interface StartNodeFormProps {
  node: Node<StartNodeData>;
  onChange: (id: string, partial: Partial<WorkflowNodeData>) => void;
  onSuccess: () => void;
}

interface FormValues {
  label: string;
  meta: { key: string; value: string }[];
}

const StartNodeForm = ({ node, onChange, onSuccess }: StartNodeFormProps) => {
  const {
    register,
    control,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      label: node.data.label,
      meta: Object.entries(node.data.meta || {}).map(([key, value]) => ({
        key,
        value,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "meta",
  });

  const formSubmitWrapper = document.getElementById(editFormPortalId);

  const onStartNodeSubmit = handleSubmit((data) => {
    const metaRecord: Record<string, string> = data.meta.reduce(
      (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
      {}
    );

    onChange(node.id, {
      label: data.label,
      meta: metaRecord,
    });
    onSuccess();
  });

  return (
    <form
      id="start-node-form"
      className="space-y-4 text-sm text-gray-700"
      onSubmit={onStartNodeSubmit}
    >
      {formSubmitWrapper &&
        createPortal(
          <Button
            type="submit"
            form="start-node-form"
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
          placeholder="Enter task title"
          error={!!errors.label}
          helperText={errors.label?.message}
          label="Title"
          labelIcon={<Type size={16} className="text-blue-500" />}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-semibold text-gray-900">
            Metadata
          </label>
          <button
            type="button"
            onClick={() => append({ key: "", value: "" })}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
          >
            <Plus size={14} />
            Add Item
          </button>
        </div>

        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <Input
                {...register(`meta.${index}.key` as const, { required: true })}
                placeholder="Key"
                required
              />
              <Input
                {...register(`meta.${index}.value` as const, {
                  required: true,
                })}
                placeholder="Value"
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
              No metadata items
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default StartNodeForm;
