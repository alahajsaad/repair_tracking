import { ApiResponse } from "@/types";
import { CompanyCreationDto, CompanyResponseDto } from "./types";
import { request } from "@/services/config/request";
import { fileRequest } from "@/services/config/fileRequest";



const getFormData = (company: CompanyCreationDto): FormData => {
  const formData = new FormData();
  formData.append("companyName", company.companyName);
  formData.append("companyAddress", company.companyAddress);
  formData.append("companyPhoneNumber", company.companyPhoneNumber);
  formData.append("companyEmail", company.companyEmail);
  formData.append("generalConditions", company.generalConditions || "");
  if (company.logo && company.logo instanceof File) {
    formData.append("logo", company.logo);
  }
  return formData;
};

export const createCompany = (company: CompanyCreationDto): Promise<ApiResponse<CompanyResponseDto>> => {
  const formData = getFormData(company);
 
  return request<CompanyResponseDto>({
    url: `/company`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const updateCompany = (company: CompanyCreationDto): Promise<ApiResponse<CompanyResponseDto>> => {
  const formData = getFormData(company);
  return request<CompanyResponseDto>({
    url: `/company`,
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const getCompanyLogo = (logoUrl: string): Promise<Blob> => {
  return fileRequest({
    url: `/company/files/${logoUrl}`,
    method: "get",
  });
};


export const isCompanyExists = (): Promise<ApiResponse<boolean>> => {
  return request<boolean>({
    url: `/company/exists`,
    method: "get",
  });
};

export const getCompany = (): Promise<ApiResponse<CompanyResponseDto>> => {
  return request<CompanyResponseDto>({
    url: `/company`,
    method: "get",
  });
};