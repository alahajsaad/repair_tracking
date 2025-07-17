import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetMachinesParams, Machine, MachineCreationDto } from "./types";
import { addMachine, deleteMachine, getMachines, getMachinesByClientId, updateMachine } from "./api";
import { ApiResponse, Page } from "@/types";


export const useAddMachine = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Machine>, Error, MachineCreationDto>({
    mutationFn: (machine: MachineCreationDto) =>
      addMachine(machine).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Machine>;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['machines'], refetchType: 'active' });
    }
  });
};

export const useUpadteMachine = () => {
 
  
  return useMutation<ApiResponse<Machine>, Error, Machine>({
    mutationFn: (machine: Machine) =>
      updateMachine(machine).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Machine>;
      }),
  });
};


export const useGetMachinesByClientId = (id: number | undefined) => {
  return useQuery<ApiResponse<Machine[]>, Error>({
    queryKey: ['clientMachines', id],
    queryFn: () =>
      getMachinesByClientId(id!).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Machine[]>;
      }),
    enabled: !!id && id > 0, 
  });
};

export const useGetMachines = (params: GetMachinesParams) => {
  return useQuery<Page<Machine>, Error>({
    queryKey: ['machines', params],
    queryFn: () => getMachines(params),
    gcTime: Infinity,
    staleTime: 1000 * 60 * 15,
    refetchOnMount: "always",
  });
};

 export const useDeleteMachine = () => {
    // const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<void>, Error, number>({
      mutationFn: (id: number) => deleteMachine(id),
    //   onSuccess: () => {
    //     // Invalidate and refetch the list query when a record is deleted
    //     queryClient.invalidateQueries({ queryKey: ['SubscriptionPlans'] });
    //   }
    });
  };