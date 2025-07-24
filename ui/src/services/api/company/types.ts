export type CompanyCreationDto = {
  id?:number
  companyName:string;
  companyAddress:string;
  companyEmail:string;
  companyPhoneNumber:string;
  generalConditions?:string,
  logo?: File;
};

export type CompanyResponseDto = {
  id:number
  companyName:string;
  companyAddress:string;
  companyEmail:string;
  companyPhoneNumber:string;
  generalConditions:string,
  logoUrl: string;
};


