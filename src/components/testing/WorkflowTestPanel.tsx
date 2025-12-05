import { useState } from "react";
import { simulateWorkflow } from "../../api/client";
import { useWorkflowStore } from "../../state/workflowStore";

const WorkflowTestPanel = () => {
  const { nodes, edges } = useWorkflowStore();
  const [log, setLog] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    const payload = { nodes, edges };
    const result = await simulateWorkflow(payload);
    setLog(result);
    setLoading(false);
  };

  return (
    <div className="border-t mt-4 pt-3">
      <button
        onClick={runSimulation}
        className="w-full text-xs bg-slate-900 text-white rounded-md py-1.5"
      >
        {loading ? 'Running…' : 'Run Simulation'}
      </button>

      {log && (
        <ul className="mt-3 max-h-40 overflow-auto text-[11px] space-y-1">
          {log.steps.map((s) => (
            <li
              key={s.step}
              className="flex items-center justify-between border rounded-md px-2 py-1"
            >
              <span className="font-medium">{s.step}. {s.label}</span>
              <span className="text-emerald-600 text-[10px]">{s.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkflowTestPanel;
