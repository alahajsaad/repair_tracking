import { AlignJustify, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "src/hooks/useMobile";


interface NavBarProps {
  toggleSidebar?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate()
 
  

  return (
    <div className="flex items-center justify-between p-4 w-full h-16 border-b bg-white border-gray-200">
      <div className="flex items-center gap-5">
        {isMobile && (
          <AlignJustify
            onClick={toggleSidebar}
            className="cursor-pointer h-10 w-10 p-2 rounded-full hover:bg-gray-200"
          />
        )}
      </div>

     <div className="flex items-center relative lg:mr-20">
    <button
      onClick={() => navigate("/company")}
      className="flex items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 active:bg-blue-400 shadow-md p-2 transition-colors duration-200 cursor-pointer"
      aria-label="Go to company page"
    >
      <Building2 className="h-8 w-8 text-blue-800" />
    </button>
  </div>

    </div>
  );
};

export default NavBar;
