// api/reparationReport.ts
import { useQuery } from "@tanstack/react-query";
import { rawRequest } from "./config/request";

// Function to fetch the PDF as a Blob
export const getReparationReport = (id: number): Promise<Blob> => {
  return rawRequest<Blob>({
    url: `/pdf/report/${id}`,
    method: "get",
    responseType: "blob", // Ensure the binary PDF is correctly handled
  });
};

export const getReparationTicket = (id: number): Promise<Blob> => {
  return rawRequest<Blob>({
    url: `/pdf/ticket/${id}?ts=${Date.now()}`, 
    method: "get",
    responseType: "blob", // Ensure the binary PDF is correctly handled
  });
};




export const useGetReparationReport = (id: number | undefined) => {
  return useQuery<Blob, Error>({
    queryKey: ['reparationReport', id],
    queryFn: () => {
      if (id === undefined) {
        // Should never be called due to `enabled`, but for safety:
        return Promise.reject(new Error("Invalid reparation ID"));
      }
      return getReparationReport(id);
    },
    enabled: id !== undefined,
   
    
  });
};

export const useGetReparationTicket = (id: number | undefined) => {
  return useQuery<Blob, Error>({
    queryKey: ['reparationTicket', id],
    queryFn: () => {
      if (id === undefined) {
        // Should never be called due to `enabled`, but for safety:
        return Promise.reject(new Error("Invalid reparation ID"));
      }
      return getReparationTicket(id);
    },
    enabled: id !== undefined,
    
  });
};
