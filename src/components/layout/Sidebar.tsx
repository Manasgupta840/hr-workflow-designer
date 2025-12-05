import {
  Briefcase,
  Play,
  CheckCircle,
  Settings,
  Square,
  FolderOpen,
} from "lucide-react";
import SidebarItem from "../atoms/SidebarItem";
import SavedWorkflowItem from "../atoms/SavedWorkflowItem";
import useSidebarStates from "../hooks/useSidebarStates";

const Sidebar = () => {
  const { fileNamesList, handleLoadFile, handleDeleteFile } =
    useSidebarStates();

  return (
    <aside className="row-span-2 h-screen z-50 flex flex-col bg-gray-100 w-[13rem] p-4 border-r border-gray-300">
      <h2 className="text-base font-semibold text-gray-700 mb-3">
        Workflow Nodes
      </h2>

      <p className="text-xs text-gray-500 mb-4">
        Drag to canvas to build your HR flow.
      </p>

      <div className="flex flex-col gap-3">
        <SidebarItem
          label="Start Node"
          type="start"
          icon={<Play size={18} />}
        />
        <SidebarItem
          label="Task Node"
          type="task"
          icon={<Briefcase size={18} />}
        />
        <SidebarItem
          label="Approval Node"
          type="approval"
          icon={<CheckCircle size={18} />}
        />
        <SidebarItem
          label="Automated Node"
          type="automated"
          icon={<Settings size={18} />}
        />
        <SidebarItem label="End Node" type="end" icon={<Square size={18} />} />
      </div>

      <hr className="my-4" />

      {/* Saved Workflows Section */}
      <div className="flex-1 overflow-auto flex flex-col">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FolderOpen size={14} /> Saved Workflows
        </h2>

        {fileNamesList.length > 0 ? (
          <div className="flex flex-col gap-2">
            {fileNamesList.map((wf) => (
              <SavedWorkflowItem
                key={wf.id}
                name={wf.name}
                onClick={() => handleLoadFile(wf.name)}
                onDelete={() => handleDeleteFile(wf.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic">
            No saved workflows yet.
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
