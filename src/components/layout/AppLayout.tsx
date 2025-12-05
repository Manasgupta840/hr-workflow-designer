import Sidebar from "./Sidebar";
import { WorkflowCanvas } from "../canvas/WorkflowCanvas";
import TopNav from "./TopNav";
import RightPanel from "./RightPanel";

const AppLayout = () => {
  return (
    <div className="bg-[#EDF2F7] h-full min-h-screen">
      <div className="flex flex-row h-full">
        <div className="flex-none h-screen sticky top-0 overflow-hidden">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <TopNav />
          <div className="p-3 flex-1 overflow-y-auto">
            <WorkflowCanvas />
          </div>
        </div>
        <div className="flex-none h-screen sticky top-0 right-0 overflow-hidden absolute">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
