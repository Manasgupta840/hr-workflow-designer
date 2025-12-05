export async function fetchAutomations() {
  const res = await fetch("/automations");
  return res.json();
}

export async function simulateWorkflow(payload: any) {
  const res = await fetch("/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
