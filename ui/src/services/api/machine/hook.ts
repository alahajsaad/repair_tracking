import { useMutation, useQuery } from "@tanstack/react-query";
import { Machine, MachineCreationDto } from "./types";
import { addMachine, getMachinesByClientId, updateMachine } from "./api";
import { ApiResponse } from "@/types";


export const useAddMachine = () => {
  
    return useMutation<ApiResponse<Machine>, Error, MachineCreationDto>({
    mutationFn: (machine: MachineCreationDto) =>
      addMachine(machine).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Machine>;
      }),
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