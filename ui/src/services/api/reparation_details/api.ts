import { ApiResponse } from "@/types";
import { ReparationDetail, ReparationDetailCreationDto } from "./types";
import { request } from "@/services/config/request";

export const addReparationDetail = (detail:ReparationDetailCreationDto , id:number): Promise<ApiResponse<ReparationDetail>> => {
    return request<ReparationDetail>({
      url: `/details/${id}`,
      method: "post",
      data: detail,
    });
}

export const updateReparationDetail = (detail:ReparationDetail): Promise<ApiResponse<ReparationDetail>> => {
    return request<ReparationDetail>({
      url: "/details",
      method: "put",
      data: detail,
    });
}

export const deleteReparationDetail = (id:number): Promise<ApiResponse<void>> => {
    return request<void>({
      url: `/details/${id}`,
      method: "delete",
  });
};
