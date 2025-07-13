import { ApiResponse, Page } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetReparationParams, Reparation, ReparationCreationDto } from "./types";
import { addReparation, getCallNumber, getReparations } from "./api";

export const useAddReparation = () => {
  
    return useMutation<ApiResponse<Reparation>, Error, ReparationCreationDto>({
    mutationFn: (machine: ReparationCreationDto) =>
      addReparation(machine).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Reparation>;
      }),
  });
};


export const useGetReparations = (params: GetReparationParams) => {
  return useQuery<Page<Reparation>, Error>({
    queryKey: ['reparations', params],
    queryFn: () => {
        return getReparations(params).then(response => {
            return response;
        });
    },
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    refetchOnMount: false
  });
};


export const useGetCallNumber = () => {
  return useQuery<string, Error>({
    queryKey: ['callNumber'],
    queryFn: () =>
      getCallNumber().then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as string;
      }),
   
  });
};