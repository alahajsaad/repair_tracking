import { ApiResponse, Page } from "@/types";
import { GetReparationParams, Reparation, ReparationCreationDto } from "./types";
import { rawRequest, request } from "@/services/config/request";



export const addReparation = (reparation:ReparationCreationDto): Promise<ApiResponse<Reparation>> => {
    return request<Reparation>({
      url: "/reparation",
      method: "post",
      data: reparation,
    });
}

export const updateReparation = (reparation:Reparation): Promise<ApiResponse<Reparation>> => {
    return request<Reparation>({
      url: "/reparation",
      method: "put",
      data: reparation,
    });
}



export const getReparations = (params: GetReparationParams): Promise<Page<Reparation>> => {
  return rawRequest<Page<Reparation>>({
    url: "/reparation",
    method: "get",
    params,
  });
};

export const getReparationById = (id: number): Promise<ApiResponse<Reparation>> => {
  return request<Reparation>({
    url: `/reparation/${id}`,
    method: "get",
  });
};

export const getReparationByCallNumber = (callNumber: string): Promise<ApiResponse<Reparation>> => {
  return request<Reparation>({
    url:`/reparation/byCallNumber/${callNumber}`,
    method:"get",
  });
};

export const getCallNumber = (): Promise<ApiResponse<string>> => {
    return request<string>({
      url: "/reparation/callNumber",
      method: "get",
     
    });
}

export const getReparationStatistics = () : Promise<number> =>  {
  return rawRequest<number>({
    url: `/reparation/statistics`,
    method: "get",
  });
}

export const getShouldBeDeliveredReparations = () : Promise<Reparation[]> =>  {
  return rawRequest<Reparation[]>({
    url: `/reparation/shouldBeDelivered`,
    method: "get",
  });
}

export const setDeliveredReparation = (id:number): Promise<ApiResponse<void>> => {
    return request<void>({
      url:`/reparation/delivered/${id}`,
      method: "post",
    
    });
}