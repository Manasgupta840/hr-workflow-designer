export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  step: number;
  nodeId: string;
  label: string;
  status: "success" | "error";
  message: string;
}

export interface SimulationResult {
  steps: SimulationStep[];
  summary: {
    valid: boolean;
    issues: string[];
  };
}

export const fetchAutomations = async (): Promise<AutomationAction[]> => {
  const res = await fetch("/automations");
  if (!res.ok) {
    throw new Error(`Failed to fetch automations: ${res.statusText}`);
  }
  return res.json();
};

export const simulateWorkflow = async (
  payload: any
): Promise<SimulationResult> => {
  const res = await fetch("/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to simulate workflow: ${res.statusText}`);
  }
  return res.json();
};
