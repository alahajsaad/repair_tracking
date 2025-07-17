import { useGetMachines } from "@/services/api/machine/hook";
import { useMachineFilters } from "./hooks/useMachineFilters";
import MachinesTable from "./components/MachinesTable";
import TableNav from "@/components/ui/TableNav";
import MachinesFilter from "./components/MachinesFilter";
import { Separator } from "@/components/ui/shadcn/separator";
import { Monitor } from "lucide-react";

const ConsultMachines : React.FC = () => {
    const {partnerId,page,size,setPage} = useMachineFilters()
    const {data:machines,isPending}= useGetMachines({partnerId,page,size})
    return (
        <>
        <MachinesFilter />
        <Separator className="mt-2 mb-2" />
        {/* la gestion de different cas se fait ici */}
        
        {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : machines && machines.content.length > 0 ? (
        <>
        <MachinesTable machines={machines?.content} isPending={isPending} />
        <TableNav
            data={machines}
            page={page}
            setPage={setPage}
          />
        </>
       
      ) : (
        <div className="text-center py-8">
          <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune Machine trouvée.</p>
        </div>
      )}
        </>
    );
}
export default ConsultMachines ;