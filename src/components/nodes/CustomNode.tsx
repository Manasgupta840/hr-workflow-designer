import { memo, useState } from "react";
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
  NodeResizer,
} from "@xyflow/react";

const CustomNode = ({
  id,
  data,
  selected,
}: NodeProps<Node<{ text: string }>>) => {
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle type="target" position={Position.Left} />
      <div>
        {isEditing ? (
          <div>
            <input
              onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
              value={data.text}
              className="xy-theme__input"
              onBlur={() => setIsEditing(false)}
              onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                  setIsEditing(false);
                }
              }}
            />
          </div>
        ) : (
          <div onDoubleClick={() => setIsEditing(true)}>{data.text}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(CustomNode);
