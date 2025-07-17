import { useQuery } from "@tanstack/react-query";
import { getReparationStatistics } from "../api/reparation/api";
import { getMachineStatistics } from "../api/machine/api";
import { getPartnerStatistics } from "../api/partner/api";

export const useGetAllStatistics = () => {
  return useQuery<{
    reparationCount: number;
    machineCount: number;
    partnerCount: number;
  }, Error>({
    queryKey: ['allStatistics'], 
    queryFn: async () => {
      try {
        const [reparationCount, machineCount, partnerCount] = await Promise.all([
          getReparationStatistics(),
          getMachineStatistics(),
          getPartnerStatistics()
        ]);

        return {
          reparationCount,
          machineCount,
          partnerCount
        };
      } catch (error) {
        throw new Error(`Erreur lors de la récupération des statistiques: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      }
    },
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    
  });
};