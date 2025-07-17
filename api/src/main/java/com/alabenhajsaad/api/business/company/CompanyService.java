package com.alabenhajsaad.api.business.company;

import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;

public interface CompanyService {
    Company createCompany(CompanyCreationDto dto);
    Company getCompany();
    boolean isExistsCompany();
    Company updateCompany(CompanyCreationDto dto);
}