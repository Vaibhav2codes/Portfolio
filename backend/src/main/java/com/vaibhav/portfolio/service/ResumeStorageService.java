package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.config.PortfolioResumeProperties;
import com.vaibhav.portfolio.dto.ResumeMetadataResponse;
import com.vaibhav.portfolio.dto.ResumeUploadResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.security.MessageDigest;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class ResumeStorageService {

    private static final String RESUME_FILE_NAME = "resume.pdf";
    private static final byte[] PDF_SIGNATURE = "%PDF-".getBytes();

    private final PortfolioResumeProperties resumeProperties;
    private final RestClient restClient;

    public ResumeStorageService(
            PortfolioResumeProperties resumeProperties,
            RestClient.Builder restClientBuilder
    ) {
        this.resumeProperties = resumeProperties;
        this.restClient = restClientBuilder
                .baseUrl(normalizeBaseUrl(resumeProperties.supabaseUrl()))
                .build();
    }

    public ResumeMetadataResponse getMetadata() throws IOException {
        validatePublicConfig();

        String lastUpdated = null;

        try {
            ResponseEntity<Void> response = restClient.head()
                    .uri(getPublicResumeUri())
                    .retrieve()
                    .toBodilessEntity();

            String lastModifiedHeader = response.getHeaders().getFirst(HttpHeaders.LAST_MODIFIED);
            if (StringUtils.hasText(lastModifiedHeader)) {
                lastUpdated = ZonedDateTime.parse(lastModifiedHeader, DateTimeFormatter.RFC_1123_DATE_TIME)
                        .toInstant()
                        .toString();
            }
        } catch (RestClientResponseException exception) {
            if (exception.getStatusCode().value() != 404) {
                throw new IOException("Unable to fetch resume metadata from Supabase.", exception);
            }
        }

        return new ResumeMetadataResponse(true, "Resume metadata fetched successfully.", RESUME_FILE_NAME, lastUpdated);
    }

    public ResumeUploadResponse replaceResume(String password, MultipartFile file) throws IOException {
        validatePassword(password);
        validateFile(file);
        validateUploadConfig();

        try {
            byte[] fileBytes = file.getBytes();
            if (!hasPdfSignature(fileBytes)) {
                throw new IllegalArgumentException("Uploaded file is not a valid PDF.");
            }

            restClient.post()
                    .uri("/storage/v1/object/{bucket}/{objectPath}",
                            resumeProperties.supabaseBucket(),
                            resumeProperties.supabaseObjectPath())
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + resumeProperties.supabaseServiceRoleKey())
                    .header("apikey", resumeProperties.supabaseServiceRoleKey())
                    .header("x-upsert", "true")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(fileBytes)
                    .retrieve()
                    .toBodilessEntity();

            return new ResumeUploadResponse(
                    true,
                    "Resume updated successfully",
                    RESUME_FILE_NAME,
                    java.time.Instant.now().toString()
            );
        } catch (RestClientResponseException exception) {
            throw new IOException("Failed to upload resume to Supabase Storage.", exception);
        }
    }

    public URI getPublicResumeUri() {
        validatePublicConfig();
        return URI.create(
                normalizeBaseUrl(resumeProperties.supabaseUrl())
                        + "/storage/v1/object/public/"
                        + resumeProperties.supabaseBucket()
                        + "/"
                        + resumeProperties.supabaseObjectPath()
        );
    }

    private void validatePublicConfig() {
        if (!StringUtils.hasText(resumeProperties.supabaseUrl())) {
            throw new IllegalStateException("Supabase URL is not configured for resume storage.");
        }
        if (!StringUtils.hasText(resumeProperties.supabaseBucket())) {
            throw new IllegalStateException("Supabase bucket is not configured for resume storage.");
        }
        if (!StringUtils.hasText(resumeProperties.supabaseObjectPath())) {
            throw new IllegalStateException("Supabase object path is not configured for resume storage.");
        }
    }

    private void validateUploadConfig() {
        validatePublicConfig();
        if (!StringUtils.hasText(resumeProperties.supabaseServiceRoleKey())) {
            throw new IllegalStateException("Supabase service role key is not configured for resume storage.");
        }
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

    private boolean hasPdfSignature(byte[] fileBytes) throws IOException {
        try (InputStream inputStream = new java.io.ByteArrayInputStream(fileBytes)) {
            byte[] header = inputStream.readNBytes(PDF_SIGNATURE.length);
            return MessageDigest.isEqual(PDF_SIGNATURE, header);
        }
    }

    private String normalizeBaseUrl(String value) {
        if (!StringUtils.hasText(value)) {
            return "";
        }
        return value.endsWith("/") ? value.substring(0, value.length() - 1) : value;
    }
}
