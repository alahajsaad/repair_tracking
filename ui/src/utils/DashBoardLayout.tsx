import { useEffect, useState } from "react";
import { useIsMobile } from "src/hooks/useMobile";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/SideBar/Sidebar";
import NavBar from "@/components/NavBar/NavBar";

const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(prev => !prev);

  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

 

  return (
    <div className="flex flex-row h-screen">
      <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded} />
      <div className="flex flex-col w-full h-screen">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="bg-gray-100 p-4 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
