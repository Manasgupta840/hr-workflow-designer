# HR Workflow Designer

A React-based prototype for visually designing and testing internal HR workflows. This application allows HR admins to create workflows for processes like onboarding, leave approval, and document verification using a drag-and-drop interface.

## Architecture

This project is built with a modern frontend stack focusing on modularity, scalability, and developer experience.

### Core Technologies

- **React 19**: The core UI library.
- **Vite**: Fast build tool and development server.
- **TypeScript**: For type safety and better developer tooling.
- **React Flow (@xyflow/react)**: The engine behind the node-based workflow canvas.
- **Zustand**: A small, fast, and scalable bearbones state-management solution. Used for managing the global state of the workflow (nodes, edges, selection, etc.).
- **React Hook Form**: For efficient and performant form handling in the node configuration panel.
- **Tailwind CSS**: For utility-first styling.
- **MSW (Mock Service Worker)**: For mocking API requests to simulate backend interactions.

### Project Structure

- `src/components/nodes`: Contains the custom node components (Start, Task, Approval, Automated, End). Each node is a separate component for better isolation.
- `src/components/forms`: Contains the configuration forms for each node type. These forms interact with the global store to update node data.
- `src/state`: Contains `workflowStore.ts`, the central Zustand store that manages the application state.
- `src/api`: Contains the mock API client and MSW handlers.
- `src/types`: TypeScript definitions for the workflow data models.

## How to Run

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Start Development Server**:

    ```bash
    npm run dev
    ```

    This will start the application at `http://localhost:5173` (or similar).

3.  **Build for Production**:

    ```bash
    npm run build
    ```

4.  **Lint Code**:
    ```bash
    npm run lint
    ```

## Design Decisions

### State Management with Zustand

Zustand was chosen over Context API or Redux because of its simplicity and performance. It allows us to subscribe to specific parts of the state, preventing unnecessary re-renders, which is crucial for a canvas-based application where performance matters. The `workflowStore` encapsulates all the logic for adding, updating, and deleting nodes and edges.

### Custom Nodes & Separation of Concerns

Each node type (Start, Task, Approval, etc.) is implemented as a separate React component. This makes the code modular and easy to extend. If a new node type is needed, we just create a new component and register it in the `nodeTypes` map. Similarly, the configuration forms are separated from the node visualization, keeping the UI clean.

### Mocking with MSW

To demonstrate API integration without a real backend, MSW is used. It intercepts network requests at the browser level, allowing us to simulate realistic API responses (like fetching automation actions or simulating a workflow) while keeping the frontend code agnostic to the fact that it's talking to a mock.

### React Hook Form

For the node configuration panel, React Hook Form is used to manage form state. It minimizes re-renders and makes handling validation and complex form logic much easier compared to controlled components with local state.

## Completed vs. Future Work

### Completed Features

- **Workflow Canvas**: Drag-and-drop interface to add and connect nodes.
- **Custom Node Types**:
  - **Start Node**: Entry point.
  - **Task Node**: Human tasks with assignee and due date.
  - **Approval Node**: Approval steps with role and threshold.
  - **Automated Node**: System actions (mocked API integration).
  - **End Node**: Workflow completion.
- **Node Configuration**: Editable forms for all node types.
- **Mock API**: `/automations` endpoint to fetch available actions and `/simulate` to test the workflow.
- **Workflow Simulation**: A panel to simulate the workflow execution and view step-by-step results.
- **Local Persistence**: Save and load workflows using Local Storage.

### Future Work (With More Time)

- **Advanced Validation**: Implement cycle detection and connectivity checks (e.g., ensuring all nodes are connected to the Start node).
- **Undo/Redo**: Add history management to allow users to undo actions.
- **Minimap & Controls**: Add a minimap for easier navigation on large workflows and zoom/pan controls.
- **Export/Import**: Allow exporting the workflow as a JSON file and importing it back.
- **Node Templates**: Pre-configured node templates for common tasks.
- **Enhanced Simulation**: More complex simulation logic that respects branching and conditional paths.
