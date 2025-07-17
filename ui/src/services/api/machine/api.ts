import { ApiResponse, Page } from "@/types";
import { GetMachinesParams, Machine, MachineCreationDto } from "./types";
import { rawRequest, request } from "@/services/config/request";


export const addMachine = (machine: MachineCreationDto): Promise<ApiResponse<Machine>> => {
  return request<Machine>({
    url: "/machine",
    method: "post",
    data: machine,
  });
};


export const updateMachine = (machine: Machine): Promise<ApiResponse<Machine>> => {
  return request<Machine>({
    url: "/machine",
    method: "put",
    data: machine,
  });
};

export const getMachinesByClientId = (id: number): Promise<ApiResponse<Machine[]>> => {
  return request<Machine[]>({
    url: `/machine/client/${(id)}`,
    method: "get",
  });
};

export const getMachines = (params: GetMachinesParams): Promise<Page<Machine>> => {
  return rawRequest<Page<Machine>>({
    url: "/machine",
    method: "get",
    params,
  });
};

export const deleteMachine = (id:number): Promise<ApiResponse<void>> => {
    return request<void>({
      url: `/machine/${id}`,
      method: "delete",
  });
};

export const getMachineStatistics = () : Promise<number> =>  {
  return rawRequest<number>({
    url: `/machine/statistics`,
    method: "get",
  });
}