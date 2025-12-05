import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskNodeForm = ({ node, onChange }) => {
  const { register, watch } = useForm({
    defaultValues: {
      label: node.data.label,
      description: node.data.description ?? "",
      assignee: node.data.assignee ?? "",
      dueDate: node.data.dueDate ?? "",
    },
  });

  // Update parent when values change
  useEffect(() => {
    const sub = watch((values) => {
      onChange(node.id, values);
    });
    return () => sub.unsubscribe();
  }, [watch, node.id, onChange]);

  return (
    <form className="space-y-3 text-xs">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register("label")}
          className="w-full border rounded-md px-2 py-1 text-xs"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded-md px-2 py-1 text-xs"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 font-medium">Assignee</label>
          <input
            {...register("assignee")}
            className="w-full border rounded-md px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Due date</label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full border rounded-md px-2 py-1 text-xs"
          />
        </div>
      </div>
    </form>
  );
};

export default TaskNodeForm;
