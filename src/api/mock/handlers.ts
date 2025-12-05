import { http, HttpResponse } from 'msw';

const automations = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
];

export const handlers = [
  http.get('/automations', () => {
    return HttpResponse.json(automations);
  }),

  http.post('/simulate', async ({ request }) => {
    const workflow = await request.json();

    // Very simple “execution”:
    const steps = workflow.nodes.map((n, index) => ({
      step: index + 1,
      nodeId: n.id,
      label: n.data.label,
      status: 'success',
      message: `Executed ${n.data.type} node`,
    }));

    const summary = { valid: true, issues: [] };

    return HttpResponse.json({ steps, summary });
  }),
];
