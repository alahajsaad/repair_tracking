import { useGetReparations } from "@/services/api/reparation/hooks";
import { GetReparationParams } from "@/services/api/reparation/types";

export const useReparationsData = () => {
  // Transformation des filtres pour l'API
  const apiParams: GetReparationParams = {
    page: filters.page,
    size: filters.size,
    repairStatus: filters.repairStatus,
    keyword: filters.keyword,
    // Ajoutez les dates si votre API les supporte
    // fromDate: filters.fromDate?.toISOString(),
    // toDate: filters.toDate?.toISOString(),
  };

  // Utilisation du hook API
  

  return {
    reparations,
    isPending,
    error,
    refetch,
    // Données dérivées utiles
    hasData: reparations && reparations.content.length > 0,
    isEmpty: reparations && reparations.content.length === 0,
    totalElements: reparations?.totalElements || 0,
    totalPages: reparations?.totalPages || 0,
  };
};