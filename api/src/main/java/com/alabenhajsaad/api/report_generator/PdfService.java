package com.alabenhajsaad.api.report_generator;

import com.alabenhajsaad.api.business.company.CompanyService;
import com.alabenhajsaad.api.business.company.dto.CompanyResponseDto;
import com.alabenhajsaad.api.business.partner.partner.PartnerService;
import com.alabenhajsaad.api.business.reparation.Reparation;
import com.alabenhajsaad.api.business.reparation.ReparationService;
import com.alabenhajsaad.api.business.reparation_details.ReparationDetail;
import com.alabenhajsaad.api.fileManager.FileLoader;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PdfService {

    private final TemplateEngine templateEngine;
    private final ReparationService reparationService ;
    private final CompanyService companyService ;
    private final FileLoader fileLoader ;
    private final PartnerService partnerService ;

    public PdfService(TemplateEngine templateEngine ,
                      ReparationService reparationService,
                      CompanyService companyService,
                      FileLoader fileLoader,
                      PartnerService partnerService
    ) {
        this.templateEngine = templateEngine;
        this.reparationService = reparationService;
        this.companyService = companyService;
        this.fileLoader = fileLoader;
        this.partnerService = partnerService;

    }

    public byte[] generatePdf(Integer reparationId) throws Exception {
        Reparation reparation = reparationService.getReparationById(reparationId);
        CompanyResponseDto company = companyService.getCompany();


        Context context = new Context();
        context.setVariable("companyName", company.companyName());
        context.setVariable("companyAddress", company.companyAddress());
        context.setVariable("companyPhoneNumber", company.companyPhoneNumber());
        context.setVariable("companyEmail", company.companyEmail());

        // Only load and set logo if present
        if (company.logoUrl() != null && !company.logoUrl().trim().isEmpty()) {
            Resource file = fileLoader.downloadFile(company.logoUrl());
            String base64Logo = fileLoader.encodeImageToBase64(file);
            context.setVariable("logo", base64Logo);
        } else {
            context.setVariable("logo", null); // explicitly set null
        }

        context.setVariable("machineDesignation", reparation.getMachine().getDesignation());
        context.setVariable("machineReference", reparation.getMachine().getReference());

        context.setVariable("clientName", partnerService.getPartnerDisplayName(reparation.getMachine().getPartner()));

        context.setVariable("callNumber", reparation.getCallNumber());
        context.setVariable("complaint", reparation.getCustomerComplaint());
        context.setVariable("details", reparation.getDetailsList());
        context.setVariable("total", reparation.getDetailsList()
                .stream()
                .mapToDouble(ReparationDetail::getPrice)
                .sum());
        context.setVariable("entryDate", reparation.getEntryDate());
        context.setVariable("releaseDate", LocalDate.now());

        // Process general conditions
        String generalConditions = company.generalConditions();
        List<String> conditionsList = new ArrayList<>();
        boolean showConditionsInFooter = false;
        boolean showConditionsOnSeparatePage = false;

        if (generalConditions != null && !generalConditions.trim().isEmpty()) {
            // Split by "/" and clean up each condition, adding full stop if missing
            conditionsList = Arrays.stream(generalConditions.split("/"))
                    .map(String::trim)
                    .filter(condition -> !condition.isEmpty())
                    .map(condition -> condition.endsWith(".") ? condition : condition + ".")
                    .toList();

            // Decide where to show conditions based on count and length
            if (conditionsList.size() <= 3 && conditionsList.stream().allMatch(condition -> condition.length() <= 100)) {
                showConditionsInFooter = true;
            } else {
                showConditionsOnSeparatePage = true;
            }
        }

        context.setVariable("conditionsList", conditionsList);
        context.setVariable("showConditionsInFooter", showConditionsInFooter);
        context.setVariable("showConditionsOnSeparatePage", showConditionsOnSeparatePage);

        String html = templateEngine.process("repair-report", context);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, null);
            builder.toStream(out);
            builder.run();
            return out.toByteArray();
        }
    }
}

