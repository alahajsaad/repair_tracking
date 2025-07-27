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
    @GetMapping("report/{id}")
    public ResponseEntity<byte[]> getReportPdf(@PathVariable Integer id) throws Exception {


        byte[] pdf = pdfService.generateFinalReportPdf(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("ticket/{id}")
    public ResponseEntity<byte[]> getTicketPdf(@PathVariable Integer id) throws Exception {


        byte[] pdf = pdfService.generateTicketPdf(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ticket.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}

