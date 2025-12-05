import { delay, http, HttpResponse } from "msw";

const automations = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
];

export const handlers = [
  http.get("/automations", () => {
    return HttpResponse.json(automations);
  }),

  http.post("/simulate", async ({ request }) => {
    await delay();
    const workflow = (await request.json()) as any;

    if (!workflow || !Array.isArray(workflow.nodes)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Invalid workflow data",
      });
    }

    // Very simple “execution”:
    const steps = workflow.nodes.map((n: any, index: number) => ({
      step: index + 1,
      nodeId: n.id,
      label: n.data?.label || "Unknown Node",
      status: "success",
      message: `Executed ${n.data?.type || "unknown"} node`,
    }));

    const summary = { valid: true, issues: [] };

    return HttpResponse.json({ steps, summary });
  }),
];
