import { ApiResponse } from "@/types";
import { Machine, MachineCreationDto } from "./types";
import { request } from "@/services/config/request";


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