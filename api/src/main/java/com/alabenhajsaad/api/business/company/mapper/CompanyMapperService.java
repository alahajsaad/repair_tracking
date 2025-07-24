package com.alabenhajsaad.api.business.company.mapper;

import com.alabenhajsaad.api.business.company.Company;
import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.business.company.dto.CompanyResponseDto;

public interface CompanyMapperService {
    Company toCompany(CompanyCreationDto dto);
    CompanyResponseDto toCompanyResponseDto(Company company);
}
