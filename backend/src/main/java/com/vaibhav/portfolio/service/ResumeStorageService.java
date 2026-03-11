package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.config.PortfolioResumeProperties;
import com.vaibhav.portfolio.dto.ResumeMetadataResponse;
import com.vaibhav.portfolio.dto.ResumeUploadResponse;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.util.Locale;

@Service
public class ResumeStorageService {

    private static final String RESUME_FILE_NAME = "resume.pdf";
    private static final byte[] PDF_SIGNATURE = "%PDF-".getBytes();

    private final PortfolioResumeProperties resumeProperties;

    public ResumeStorageService(PortfolioResumeProperties resumeProperties) {
        this.resumeProperties = resumeProperties;
    }

    public ResumeMetadataResponse getMetadata() throws IOException {
        Path resumePath = getResumePath();
        String lastUpdated = Files.exists(resumePath)
                ? Files.getLastModifiedTime(resumePath).toInstant().toString()
                : null;

        return new ResumeMetadataResponse(true, "Resume metadata fetched successfully.", RESUME_FILE_NAME, lastUpdated);
    }

    public ResumeUploadResponse replaceResume(String password, MultipartFile file) throws IOException {
        validatePassword(password);
        validateFile(file);

        Path resumePath = getResumePath();
        Path parentDirectory = resumePath.getParent();

        if (parentDirectory == null) {
            throw new IllegalStateException("Resume storage path is invalid.");
        }

        Files.createDirectories(parentDirectory);
        Path tempFile = Files.createTempFile(parentDirectory, "resume-upload-", ".pdf");

        try {
            file.transferTo(tempFile);

            if (!hasPdfSignature(tempFile)) {
                throw new IllegalArgumentException("Uploaded file is not a valid PDF.");
            }

            moveIntoPlace(tempFile, resumePath);

            return new ResumeUploadResponse(
                    true,
                    "Resume updated successfully",
                    RESUME_FILE_NAME,
                    Files.getLastModifiedTime(resumePath).toInstant().toString()
            );
        } finally {
            Files.deleteIfExists(tempFile);
        }
    }

    public Resource loadResumeResource() throws IOException {
        Path resumePath = getResumePath();

        if (!Files.exists(resumePath)) {
            throw new NoSuchFileException("Resume file has not been uploaded yet.");
        }

        return new FileSystemResource(resumePath);
    }

    Path getResumePath() {
        String configuredPath = resumeProperties.storagePath();

        if (configuredPath == null || configuredPath.isBlank()) {
            throw new IllegalStateException("Resume storage path is not configured.");
        }

        return Path.of(configuredPath).toAbsolutePath().normalize();
    }

    private void validatePassword(String password) {
        String expectedPassword = resumeProperties.adminPassword();

        if (expectedPassword == null || expectedPassword.isBlank()) {
            throw new IllegalStateException("Resume admin password is not configured.");
        }

        byte[] expected = expectedPassword.getBytes();
        byte[] provided = (password == null ? "" : password).getBytes();

        if (!MessageDigest.isEqual(expected, provided)) {
            throw new SecurityException("Invalid password");
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a resume PDF file.");
        }

        if (file.getSize() > resumeProperties.maxFileSizeBytes()) {
            throw new IllegalArgumentException("Resume file must be 5MB or smaller.");
        }

        String fileName = file.getOriginalFilename();
        String contentType = file.getContentType();

        boolean pdfByName = fileName != null && fileName.toLowerCase(Locale.ROOT).endsWith(".pdf");
        boolean pdfByType = contentType == null
                || contentType.equalsIgnoreCase("application/pdf")
                || contentType.equalsIgnoreCase("application/x-pdf");

        if (!pdfByName || !pdfByType) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }
    }

    private boolean hasPdfSignature(Path filePath) throws IOException {
        try (InputStream inputStream = Files.newInputStream(filePath)) {
            byte[] header = inputStream.readNBytes(PDF_SIGNATURE.length);
            return MessageDigest.isEqual(PDF_SIGNATURE, header);
        }
    }

    private void moveIntoPlace(Path source, Path target) throws IOException {
        try {
            Files.move(source, target, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
        } catch (AtomicMoveNotSupportedException exception) {
            Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}
