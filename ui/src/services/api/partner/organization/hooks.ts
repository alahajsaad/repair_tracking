
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Organization } from "../types";
import { addOrganization, updateOrganization } from "./api";
import { ApiResponse } from "@/types";




export const useAddOrganization = () => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<Organization>, Error, Organization>({
      mutationFn: (organization: Organization) => 
        addOrganization(organization).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response as ApiResponse<Organization>;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['Organizations'] });
      }
    });
  };

export const useUpdateOrganization = (id: number) => {
    const queryClient = useQueryClient();
     
    return useMutation<ApiResponse<Organization>, Error, Organization>({
      mutationFn: (organization: Organization) => 
        updateOrganization(organization).then(response => {
          if (response.status === 'error') {
            throw new Error(response.message);
          }
          return response as ApiResponse<Organization>;
        }),
      onSuccess: () => {
        if (id !== 0) {
            queryClient.invalidateQueries({ queryKey: ['partners', id] });
        }
       
      },
    });
  };