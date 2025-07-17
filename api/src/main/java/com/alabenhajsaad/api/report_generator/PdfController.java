package com.alabenhajsaad.api.report_generator;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/pdf")
public class PdfController {

    private final PdfService pdfService;

    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getPdf(@PathVariable Integer id) throws Exception {


        byte[] pdf = pdfService.generatePdf(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}

