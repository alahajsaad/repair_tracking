import { ApiResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CompanyCreationDto, CompanyResponseDto } from "./types";
import { createCompany, getCompany, getCompanyLogo, isCompanyExists, updateCompany } from "./api";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<CompanyResponseDto>, Error, CompanyCreationDto>({
    mutationFn: async (company) => {
      console.log("company :"+company)
      const response = await createCompany(company);
      if (response.status === "error") {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (data) => {
      // Update the company cache with the new data
      queryClient.setQueryData(['company'], data.data);
      
      // Update the company exists cache
      queryClient.setQueryData(['isCompanyExist'], { 
        status: 'success', 
        data: true 
      });
      
      // Only invalidate logo if it might have changed
      queryClient.invalidateQueries({ queryKey: ["companyLogo"] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<CompanyResponseDto>, Error, CompanyCreationDto>({
    mutationFn: async (company) => {
      const response = await updateCompany(company);
      if (response.status === "error") {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      // Update the company cache with the updated data
      queryClient.invalidateQueries({queryKey:['company']});
      
      // Only invalidate logo if it might have changed
      queryClient.invalidateQueries({ queryKey: ["companyLogo"] });
    },
  });
};

export const useGetCompanyLogo = (logoUrl: string) => {
  return useQuery({
    queryKey: ["companyLogo", logoUrl], // Include logoUrl in the key
    queryFn: () => getCompanyLogo(logoUrl),
    enabled: !!logoUrl, // Only run if logoUrl exists
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export const useGetCompany = () => {
  return useQuery<CompanyResponseDto, Error>({
    queryKey: ['company'],
    queryFn: () => getCompany().then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as CompanyResponseDto;
    }),
    gcTime: Infinity,
    staleTime: Infinity,
  });
};

export const useGetIsCompanyExist = () => {
  return useQuery<boolean, Error>({
    queryKey: ['isCompanyExist'],
    queryFn: () => isCompanyExists().then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response.data as boolean;
    }),
    gcTime: Infinity,
    staleTime: Infinity,
  });
};