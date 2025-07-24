package com.alabenhajsaad.api.business.company.dto;


public record CompanyResponseDto(
        Integer id,
        String companyName,
        String companyAddress,
        String companyEmail,
        String companyPhoneNumber,
        String generalConditions,
        String logoUrl
) {
}
