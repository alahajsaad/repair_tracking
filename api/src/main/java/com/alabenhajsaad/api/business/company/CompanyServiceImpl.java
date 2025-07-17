package com.alabenhajsaad.api.business.company;

import com.alabenhajsaad.api.business.company.dto.CompanyCreationDto;
import com.alabenhajsaad.api.fileManager.FileLoader;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompanyServiceImpl implements CompanyService {

    @Value("${app.file.company-file}")
    private String companyFile;
    private final FileLoader fileLoader;

    @PostConstruct
    public void init() {
        try {
            File file = new File(companyFile);
            if (file.createNewFile()) {
                log.info("File created: {}", file.getName());
            } else {
                log.info("File already exists.");
            }
        } catch (IOException e) {
            log.error("An error occurred while creating the file: {}", e.getMessage(), e);
        }
    }

    @Override
    public Company createCompany(CompanyCreationDto dto) {
        File file = new File(companyFile);
        if (file.length() != 0) {
            throw new RuntimeException("A company already exists.");
        }

        try (FileWriter writer = new FileWriter(file)) {
            writer.write("companyName:" + dto.companyName().trim() + "\n");
            writer.write("companyAddress:" + dto.companyAddress().trim() + "\n");
            writer.write("companyEmail:" + dto.companyEmail().trim() + "\n");
            writer.write("companyPhoneNumber:" + dto.companyPhoneNumber().trim() + "\n");

            if (dto.logo() != null && !dto.logo().isEmpty()) {
                String logoUrl = fileLoader.uploadFile(dto.logo());
                writer.write("logoUrl:" + logoUrl.trim() + "\n");
            }

            log.info("Company created successfully: {}", dto.companyName());
        } catch (IOException e) {
            log.error("Failed to write company data: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to write company data", e);
        }

        return getCompany();
    }

    @Override
    public Company getCompany() {
        try {
            List<String> lines = Files.readAllLines(Paths.get(companyFile));

            if (lines.isEmpty()) {
                log.warn("Company file is empty.");
                return null;
            }

            String companyName = null;
            String companyAddress = null;
            String companyEmail = null;
            String companyPhoneNumber = null;
            String logoUrl = null;

            for (String line : lines) {
                String[] parts = line.split(":", 2);
                if (parts.length == 2) {
                    String key = parts[0].trim();
                    String value = parts[1].trim();
                    switch (key) {
                        case "companyName":
                            companyName = value;
                            break;
                        case "companyAddress":
                            companyAddress = value;
                            break;
                        case "companyEmail":
                            companyEmail = value;
                            break;
                        case "companyPhoneNumber":
                            companyPhoneNumber = value;
                            break;
                        case "logoUrl":
                            logoUrl = value;
                            break;
                        default:
                            log.warn("Unknown line in file: {}", line);
                    }
                }
            }

            if (companyName == null || companyEmail == null || companyPhoneNumber == null) {
                throw new RuntimeException("Incomplete company data in file.");
            }

            Company company = new Company();
            company.setCompanyName(companyName);
            company.setCompanyAddress(companyAddress);
            company.setCompanyEmail(companyEmail);
            company.setCompanyPhoneNumber(companyPhoneNumber);
            company.setLogoUrl(logoUrl);


            return company;

        } catch (IOException e) {
            log.error("Failed to read company data: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to read company data", e);
        }
    }

    @Override
    public boolean isExistsCompany() {
        File file = new File(companyFile);
        return file.exists() && file.length() > 0;
    }

    @Override
    public Company updateCompany(CompanyCreationDto dto) {
        try {
            // Étape 1: lire l'ancien logo si présent
            String existingLogoUrl = null;
            List<String> oldLines = Files.readAllLines(Paths.get(companyFile));
            for (String line : oldLines) {
                if (line.startsWith("logoUrl:")) {
                    existingLogoUrl = line.substring("logoUrl:".length()).trim();
                    break;
                }
            }

            // Étape 2: écrire les nouvelles données (en écrasant)
            try (FileWriter writer = new FileWriter(companyFile, false)) {
                writer.write("companyName:" + dto.companyName().trim() + "\n");
                writer.write("companyAddress:" + (dto.companyAddress() != null ? dto.companyAddress().trim() : "") + "\n");
                writer.write("companyEmail:" + dto.companyEmail().trim() + "\n");
                writer.write("companyPhoneNumber:" + dto.companyPhoneNumber().trim() + "\n");

                if (dto.logo() != null && !dto.logo().isEmpty()) {
                    String logoUrl = fileLoader.uploadFile(dto.logo());
                    writer.write("logoUrl:" + logoUrl.trim() + "\n");
                } else if (existingLogoUrl != null) {
                    writer.write("logoUrl:" + existingLogoUrl + "\n");
                }

                log.info("Company updated successfully: {}", dto.companyName());
                return getCompany();
            }

        } catch (IOException e) {
            log.error("Failed to update company data: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to update company data", e);
        }
    }

}