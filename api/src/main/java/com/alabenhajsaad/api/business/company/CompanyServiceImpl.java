package com.alabenhajsaad.api.business.company;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
@Slf4j
public class CompanyServiceImpl implements CompanyService {

    private static final String COMPANY_FILE = "F:\\repair_tracking_app\\myCompany.txt";


    @PostConstruct
    public void init() {
        try {
            File file = new File(COMPANY_FILE);
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
    public Company createCompany(Company company) {
        File file = new File(COMPANY_FILE);
        if (file.length() != 0) {
            throw new RuntimeException("A company already exists.");
        }

        try (FileWriter writer = new FileWriter(file)) {
            writer.write("companyName:" + company.getCompanyName().trim() + "\n");
            writer.write("companyEmail:" + company.getCompanyEmail().trim() + "\n");
            writer.write("companyPhoneNumber:" + company.getCompanyPhoneNumber().trim() + "\n");
            log.info("Company created successfully: {}", company.getCompanyName());
        } catch (IOException e) {
            log.error("Failed to write company data: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to write company data", e);
        }

        return company;
    }

    @Override
    public Company getCompany() {
        try {
            List<String> lines = Files.readAllLines(Paths.get(COMPANY_FILE));

            if (lines.isEmpty()) {
                log.warn("Company file is empty.");
                return null;
            }

            String companyName = null;
            String companyEmail = null;
            String companyPhoneNumber = null;

            for (String line : lines) {
                String[] parts = line.split(":", 2);
                if (parts.length == 2) {
                    String key = parts[0].trim();
                    String value = parts[1].trim();
                    switch (key) {
                        case "companyName":
                            companyName = value;
                            break;
                        case "companyEmail":
                            companyEmail = value;
                            break;
                        case "companyPhoneNumber":
                            companyPhoneNumber = value;
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
            company.setCompanyEmail(companyEmail);
            company.setCompanyPhoneNumber(companyPhoneNumber);

            return company;

        } catch (IOException e) {
            log.error("Failed to read company data: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to read company data", e);
        }
    }

    @Override
    public Company updateCompany(Company company) {
        try (FileWriter writer = new FileWriter(COMPANY_FILE, false)) { // overwrite
            writer.write("companyName:" + company.getCompanyName().trim() + "\n");
            writer.write("companyEmail:" + company.getCompanyEmail().trim() + "\n");
            writer.write("companyPhoneNumber:" + company.getCompanyPhoneNumber().trim() + "\n");
            log.info("Company updated successfully: {}", company.getCompanyName());
            return company;
        } catch (IOException e) {
            log.error("Failed to update company data: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to update company data", e);
        }
    }
}
