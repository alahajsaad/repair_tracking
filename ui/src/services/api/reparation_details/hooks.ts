import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { addReparationDetail, deleteReparationDetail, updateReparationDetail } from "./api";
import { ReparationDetail, ReparationDetailCreationDto } from "./types";




export type AddReparationDetailVariables = {
  detail: ReparationDetailCreationDto;
  id: number;
};

export const useAddReparationDetail = () => {
  return useMutation<ApiResponse<ReparationDetail>, Error, AddReparationDetailVariables>({
    mutationFn: ({ detail, id }) =>
      addReparationDetail(detail, id).then((response) => {
        if (response.status === "error") {
          throw new Error(response.message);
        }
        return response;
      }),
  });
};

export const useUpdateReparationDetail = () => {
    return useMutation<ApiResponse<ReparationDetail>, Error, ReparationDetail>({
    mutationFn: (detail: ReparationDetail) =>
      updateReparationDetail(detail).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<ReparationDetail>;
      }),
  });
};


 export const useDeleteReparationDetail = () => {
    // const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<void>, Error, number>({
      mutationFn: (id: number) => deleteReparationDetail(id),
    //   onSuccess: () => {
    //     // Invalidate and refetch the list query when a record is deleted
    //     queryClient.invalidateQueries({ queryKey: ['SubscriptionPlans'] });
    //   }
    });
  };
