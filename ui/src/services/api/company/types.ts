export type CompanyCreationDto = {
  companyName: string;
  companyAddress: string;
  companyPhoneNumber: string;
  companyEmail: string;
  logo?: File;
};

export type Company = {
  companyName: string;
  companyAddress: string;
  companyPhoneNumber: string;
  companyEmail: string;
  logoUrl: string;
};
