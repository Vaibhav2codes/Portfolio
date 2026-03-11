package com.vaibhav.portfolio.controller;

import com.vaibhav.portfolio.dto.ResumeMetadataResponse;
import com.vaibhav.portfolio.dto.ResumeUploadResponse;
import com.vaibhav.portfolio.service.ResumeStorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeStorageService resumeStorageService;

    public ResumeController(ResumeStorageService resumeStorageService) {
        this.resumeStorageService = resumeStorageService;
    }

    @GetMapping("/metadata")
    public ResponseEntity<ResumeMetadataResponse> getMetadata() throws IOException {
        return ResponseEntity.ok(resumeStorageService.getMetadata());
    }

    @GetMapping("/file")
    public ResponseEntity<Void> downloadResume() {
        URI publicResumeUri = resumeStorageService.getPublicResumeUri();

        return ResponseEntity.status(HttpStatus.TEMPORARY_REDIRECT)
                .header(HttpHeaders.LOCATION, publicResumeUri.toString())
                .build();
    }

    @PostMapping(value = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeUploadResponse> updateResume(
            @RequestParam("password") String password,
            @RequestParam("resume") MultipartFile resume
    ) throws IOException {
        return ResponseEntity.ok(resumeStorageService.replaceResume(password, resume));
    }
}
