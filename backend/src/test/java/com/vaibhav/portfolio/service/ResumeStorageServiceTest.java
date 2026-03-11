package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.config.PortfolioResumeProperties;
import com.vaibhav.portfolio.dto.ResumeUploadResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ResumeStorageServiceTest {

    @TempDir
    Path tempDir;

    @Test
    void shouldStoreValidPdfResume() throws Exception {
        Path resumePath = tempDir.resolve("resume.pdf");
        ResumeStorageService service = new ResumeStorageService(
                new PortfolioResumeProperties("secret123", resumePath.toString(), 5 * 1024 * 1024L)
        );

        MockMultipartFile file = new MockMultipartFile(
                "resume",
                "resume.pdf",
                "application/pdf",
                "%PDF-1.4 test resume".getBytes()
        );

        ResumeUploadResponse response = service.replaceResume("secret123", file);

        assertTrue(Files.exists(resumePath));
        assertEquals("resume.pdf", response.fileName());
        assertEquals("Resume updated successfully", response.message());
        assertNotNull(response.lastUpdated());
    }

    @Test
    void shouldRejectInvalidPassword() {
        Path resumePath = tempDir.resolve("resume.pdf");
        ResumeStorageService service = new ResumeStorageService(
                new PortfolioResumeProperties("secret123", resumePath.toString(), 5 * 1024 * 1024L)
        );

        MockMultipartFile file = new MockMultipartFile(
                "resume",
                "resume.pdf",
                "application/pdf",
                "%PDF-1.4 test resume".getBytes()
        );

        SecurityException exception = assertThrows(SecurityException.class, () -> service.replaceResume("wrong", file));
        assertEquals("Invalid password", exception.getMessage());
    }

    @Test
    void shouldRejectNonPdfUpload() {
        Path resumePath = tempDir.resolve("resume.pdf");
        ResumeStorageService service = new ResumeStorageService(
                new PortfolioResumeProperties("secret123", resumePath.toString(), 5 * 1024 * 1024L)
        );

        MockMultipartFile file = new MockMultipartFile(
                "resume",
                "resume.txt",
                "text/plain",
                "not a pdf".getBytes()
        );

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> service.replaceResume("secret123", file)
        );
        assertEquals("Only PDF files are allowed", exception.getMessage());
    }
}
