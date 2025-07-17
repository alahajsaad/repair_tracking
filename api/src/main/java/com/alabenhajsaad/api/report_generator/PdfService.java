package com.alabenhajsaad.api.report_generator;

import com.alabenhajsaad.api.business.company.Company;
import com.alabenhajsaad.api.business.company.CompanyService;
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

    public byte[] generatePdf(Integer reparationId ) throws Exception {
        Reparation reparation = reparationService.getReparationById(reparationId) ;
        Company company = companyService.getCompany() ;
        Resource file = fileLoader.downloadFile(company.getLogoUrl());
        String base64Logo = fileLoader.encodeImageToBase64(file);

        Context context = new Context();
        context.setVariable("companyName",company.getCompanyName());
        context.setVariable("companyAddress",company.getCompanyAddress());
        context.setVariable("companyPhoneNumber",company.getCompanyPhoneNumber());
        context.setVariable("companyEmail",company.getCompanyEmail());
        context.setVariable("logo", base64Logo);

        context.setVariable("machineDesignation", reparation.getMachine().getDesignation());
        context.setVariable("machineReference", reparation.getMachine().getReference());

        context.setVariable("clientName", partnerService.getPartnerDisplayName(reparation.getMachine().getPartner()) );

        context.setVariable("callNumber", reparation.getCallNumber());
        context.setVariable("complaint", reparation.getCustomerComplaint());
        context.setVariable("details",reparation.getDetailsList());
        context.setVariable("total", reparation.getDetailsList()
                .stream()
                .mapToDouble(ReparationDetail::getPrice)
                .sum());
        context.setVariable("entryDate",reparation.getEntryDate());
        context.setVariable("releaseDate",reparation.getReleaseDate());





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

