package com.alabenhajsaad.api.fileManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/file")
@RequiredArgsConstructor
@Slf4j
public class FileController {
    private final FileLoader fileLoader ;

    @GetMapping("/logo")
    //@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<Resource> getLogo(@RequestParam String uniqueFileName) {


        try {
            Resource logoResource = fileLoader.downloadFile(uniqueFileName);

            // Determine content type (could be enhanced with a proper content type detector)
            String contentType = fileLoader.determineContentType(uniqueFileName);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + uniqueFileName + "\"")
                    .body(logoResource);
        } catch (Exception e) {
            log.error("An error occurred", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
