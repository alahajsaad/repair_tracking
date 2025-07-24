package com.alabenhajsaad.api.business.company;

import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.business.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.config.ApiResponse;
import com.alabenhajsaad.api.fileManager.FileLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/company")
public class CompanyController {
    private final CompanyService companyService;
    public final FileLoader fileLoader ;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CompanyResponseDto>> createCompany(@ModelAttribute CompanyCreationDto dto) {
        CompanyResponseDto company = companyService.createCompany(dto);
        return ResponseEntity.ok(ApiResponse.success(company, "Entreprise ajoutée avec succès"));
    }
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileLoader.downloadFile(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // ou détecter dynamiquement
                .body(file);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CompanyResponseDto>> getCompany() {
        CompanyResponseDto company = companyService.getCompany();
        if (company == null) {
            return ResponseEntity.ok(ApiResponse.success(null, "Aucune entreprise trouvée"));
        }
        return ResponseEntity.ok(ApiResponse.success(company, "Entreprise récupérée avec succès"));
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CompanyResponseDto>> updateCompany(@ModelAttribute CompanyCreationDto company) {
        CompanyResponseDto updatedCompany = companyService.updateCompany(company);
        return ResponseEntity.ok(ApiResponse.success(updatedCompany, "Entreprise mise à jour avec succès"));
    }

    @GetMapping("/exists")
    public ResponseEntity<ApiResponse<Boolean>> isCompanyExists() {
        boolean exists = companyService.isExistsCompany();
        return ResponseEntity.ok(ApiResponse.success(exists, "Vérification de l'existence de l'entreprise"));
    }
}