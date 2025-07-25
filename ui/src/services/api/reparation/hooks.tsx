import { ApiResponse, Page } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetReparationParams, Reparation, ReparationCreationDto } from "./types";
import { addReparation, getCallNumber, getReparationByCallNumber, getReparationById, getReparations, getShouldBeDeliveredReparations, setDeliveredReparation, updateReparation } from "./api";
import { useEffect } from "react";

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

// Update reparation
export const useUpdateReparation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Reparation>, Error, Reparation>({
    mutationFn: async (reparation: Reparation) => {
      const response = await updateReparation(reparation);
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (data) => {
      // Invalidate the specific reparation cache by id
      if (data.data?.id) {
          queryClient.invalidateQueries({ queryKey: ['reparation', data.data.id] });
      }
    },
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
    refetchOnMount: 'always'
  });
};


export const useGetReparationByCallNumber = (callNumber: string) => {
  const queryClient = useQueryClient();
  
  const query = useQuery<Reparation, Error>({
    queryKey: ['reparation', callNumber],
    queryFn: () => getReparationByCallNumber(callNumber).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as Reparation;
    }),
    enabled: false,
  });

  // Update cache when data is successfully fetched
  useEffect(() => {
    if (query.data?.id) {
      queryClient.setQueryData(['reparation', query.data.id], query.data);
    }
  }, [query.data, queryClient]);

  return query;
};

export const useGetReparationById = (id: number) => {
 
  return useQuery<Reparation, Error>({
    queryKey: ['reparation', id], 
    queryFn: () => getReparationById(id).then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as Reparation;
    }),
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

export const useGetShouldBeDelivred = () => {
  return useQuery<Reparation[], Error>({
    queryKey: ['ShouldBeDelivered'], 
    queryFn: () => getShouldBeDeliveredReparations().then(response => {
      return response as Reparation[];
    }),
  });
};



// Update reparation
export const useSetShouldBeDelivered = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, Error, number>({
    mutationFn: async (id: number) => {
      const response = await setDeliveredReparation(id);
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['ShouldBeDelivered'] });
      }
    },
  );
};