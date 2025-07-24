package com.alabenhajsaad.api.business.company;

import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.business.company.dto.CompanyResponseDto;

public interface CompanyService {
    CompanyResponseDto createCompany(CompanyCreationDto dto);
    CompanyResponseDto getCompany();
    boolean isExistsCompany();
    CompanyResponseDto updateCompany(CompanyCreationDto dto);
    boolean isActivated();
}