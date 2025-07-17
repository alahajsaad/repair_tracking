package com.alabenhajsaad.api.business.company.dto;

import org.springframework.web.multipart.MultipartFile;

public record CompanyCreationDto(
         String companyName,
         String companyAddress,
         String companyPhoneNumber,
         String companyEmail,
         MultipartFile logo

) {
}

