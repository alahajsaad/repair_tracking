package com.alabenhajsaad.api.business.company.dto;

import org.springframework.web.multipart.MultipartFile;

public record CompanyCreationDto(
         Integer id,
         String companyName,
         String companyAddress,
         String companyEmail,
         String companyPhoneNumber,
         String generalConditions,
         MultipartFile logo

) {
}

