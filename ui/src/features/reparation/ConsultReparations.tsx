import { PackageMinus } from "lucide-react";
import { Separator } from "@/components/ui/shadcn/separator";

import ReparationsFilter from "./components/ReparationsFilter";
import ReparationsTable from "./components/ReparationsTable";
import TableNav from "@/components/ui/TableNav";
import { useGetReparations } from "@/services/api/reparation/hooks";
import { useReparationFilters } from "./hooks/useReparationFilters";

const ConsultReparations: React.FC = () => {
  
  
  const {fromDate, toDate, partnerId ,machineId ,page ,size , repairStatus ,setPage} = useReparationFilters()
  
  const { data: reparations, isPending } = useGetReparations({fromDate, toDate, partnerId ,machineId ,page ,size , repairStatus});
  return (
    <>
      <ReparationsFilter />
      
      <Separator className="mt-2 mb-2" />
      
      {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : reparations?.content ? (
        <>
          <ReparationsTable data={reparations!.content} />
          <TableNav
            data={reparations!}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <PackageMinus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune réparation trouvée.</p>
        </div>
      )}
    </>
  );
};

export default ConsultReparations;