import TaskNodeForm from "./TaskNodeForm";

const NodeConfigForm = ({ node, onChange }) => {
  switch (node.data.type) {
    case 'start':
      return <StartNodeForm node={node} onChange={onChange} />;
    case 'task':
      return <TaskNodeForm node={node} onChange={onChange} />;
    // ...
  }
};

export default NodeConfigForm;

