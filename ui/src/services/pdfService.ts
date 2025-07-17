// api/reparationReport.ts
import { useQuery } from "@tanstack/react-query";
import { rawRequest } from "./config/request";

// Function to fetch the PDF as a Blob
export const getReparationReport = (id: number): Promise<Blob> => {
  return rawRequest<Blob>({
    url: `/pdf/${id}`,
    method: "get",
    responseType: "blob", // Ensure the binary PDF is correctly handled
  });
};

// React Query hook
export const useGetReparationReport = (id: number) => {
  return useQuery<Blob, Error>({
    queryKey: ['reparationReport', id],
    queryFn: () => getReparationReport(id),
    enabled: !!id, // prevent auto-run if id is undefined
  });
};
