import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useGetIdFromParams } from "@/hooks/useGetIdFromParams";
import { useGetReparationById } from "@/services/api/reparation/hooks";
import ReparationGeneralInfo from "./components/ReparationGeneralInfo";
import ReparationDetailsTable from "./components/ReparationDetailsTable";

const ReparationDetails : React.FC = () => {
    const {numericId} = useGetIdFromParams()
    const {data:reparation,isPending,refetch} = useGetReparationById(numericId)

    return (
        <>
        
        <div className="flex flex-col lg:flex-row w-full gap-4 items-end">
          <div className="w-full lg:w-1/2">
              <ReparationGeneralInfo reparation={reparation} />
          </div>
         <div className="w-full lg:w-1/2">
              <ReparationDetailsTable reparation={reparation} />
         </div>
       
         
        </div>
        </>
    );
}
export default ReparationDetails ;