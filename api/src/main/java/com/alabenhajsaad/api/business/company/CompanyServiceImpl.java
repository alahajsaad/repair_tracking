package com.alabenhajsaad.api.business.company;

import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.business.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.business.company.mapper.CompanyMapperService;
import com.alabenhajsaad.api.exception.CompanyAlreadyExistsException;
import com.alabenhajsaad.api.exception.ResourceNotFoundException;
import com.alabenhajsaad.api.fileManager.FileLoader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository repository;
    private final CompanyMapperService mapperService;
    private final FileLoader fileLoader;

    @Override
    public CompanyResponseDto createCompany(CompanyCreationDto dto) {
        if (repository.count() > 0) {
            throw new CompanyAlreadyExistsException("Vous avez déjà créé votre entreprise.");
        }

        var company = mapperService.toCompany(dto);

        if (dto.logo() != null) {
            company.setLogoUrl(fileLoader.uploadFile(dto.logo()));
        }

        company.setIsActive(false);
        return mapperService.toCompanyResponseDto(repository.save(company));
    }

    @Override
    public boolean isActivated() {
        Optional<Company> companyOpt = repository.findFirstByOrderByIdAsc();

        if (companyOpt.isEmpty()) {
            return false;
        }

        Company company = companyOpt.get();

        if (Boolean.TRUE.equals(company.getIsActive())) {
            return true;
        }

        LocalDate installationDate = company.getCreatedAt();
        return !LocalDate.now().isAfter(installationDate.plusDays(30));
    }

    @Override
    public CompanyResponseDto getCompany() {
        Company company = repository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new ResourceNotFoundException("Entreprise non trouvée."));

        return mapperService.toCompanyResponseDto(company);
    }

    @Override
    public boolean isExistsCompany() {
        return repository.count() > 0;
    }

    @Override
    public CompanyResponseDto updateCompany(CompanyCreationDto dto) {
        Company company = repository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new ResourceNotFoundException("Entreprise non trouvée."));

        if (!Objects.equals(company.getCompanyName(), dto.companyName())) {
            company.setCompanyName(dto.companyName());
        }
        if (!Objects.equals(company.getCompanyAddress(), dto.companyAddress())) {
            company.setCompanyAddress(dto.companyAddress());
        }
        if (!Objects.equals(company.getCompanyEmail(), dto.companyEmail())) {
            company.setCompanyEmail(dto.companyEmail());
        }
        if (!Objects.equals(company.getCompanyPhoneNumber(), dto.companyPhoneNumber())) {
            company.setCompanyPhoneNumber(dto.companyPhoneNumber());
        }
        if (!Objects.equals(company.getGeneralConditions(), dto.generalConditions())) {
            company.setGeneralConditions(dto.generalConditions());
        }
        if (dto.logo() != null) {
            company.setLogoUrl(fileLoader.uploadFile(dto.logo()));
        }

        return mapperService.toCompanyResponseDto(repository.save(company));
    }
}
