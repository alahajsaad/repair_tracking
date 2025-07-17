import { Filter, X } from "lucide-react";
import SearchPartner from "@/features/partner/components/SearchPartner";
import { useEffect, useState } from "react";
import { DynamicPartner } from "@/services/api/partner/types";
import { useMachineFilters } from "../hooks/useMachineFilters";



const MachinesFilter: React.FC = () => {
    const [partner,setPartner] = useState<DynamicPartner>()
    const {setPartnerId,reset} = useMachineFilters()
    

    useEffect(() => {
        if(partner?.id){
            setPartnerId(partner.id)
        }
    } , [partner,setPartnerId])
   
    

  const handleReset = () => {
    setPartner(undefined);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {/* Première ligne : Recherche et État */}
        <div className="flex flex-col lg:flex-row w-full gap-4 items-end">
          <div className="w-full lg:w-3/5">
            <SearchPartner 
              label={"Rechercher un client"} 
              partner={partner} 
              setPartner={setPartner} 
              partnerType={"CLIENT"} 
            />
            </div>
            <div className="w-full lg:w-1/5 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-all text-sm font-medium flex items-center gap-1"
              onClick={handleReset}
            >
              <X className="w-4 h-4" />
              Réinitialiser
            </button>
          </div>
        </div>
        </div>
    </div>
  );
};

export default MachinesFilter;