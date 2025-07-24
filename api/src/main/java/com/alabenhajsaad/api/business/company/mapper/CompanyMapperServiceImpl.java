package com.alabenhajsaad.api.business.company.mapper;

import com.alabenhajsaad.api.business.company.Company;
import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.business.company.dto.CompanyResponseDto;
import org.springframework.stereotype.Service;

@Service
public class CompanyMapperServiceImpl implements CompanyMapperService{
    @Override
    public Company toCompany(CompanyCreationDto dto) {
        Company company = new Company();
        company.setCompanyName(dto.companyName());
        company.setCompanyAddress(dto.companyAddress());
        company.setCompanyEmail(dto.companyEmail());
        company.setCompanyPhoneNumber(dto.companyPhoneNumber());
        company.setGeneralConditions(dto.generalConditions());
        return company;
    }

    @Override
    public CompanyResponseDto toCompanyResponseDto(Company company) {
        return new CompanyResponseDto(
                company.getId(),
                company.getCompanyName(),
                company.getCompanyAddress(),
                company.getCompanyEmail(),
                company.getCompanyPhoneNumber(),
                company.getGeneralConditions(),
                company.getLogoUrl()
        ) ;
    }
}
