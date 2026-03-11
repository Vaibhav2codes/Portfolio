package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.config.PortfolioResumeProperties;
import com.vaibhav.portfolio.dto.ResumeMetadataResponse;
import com.vaibhav.portfolio.dto.ResumeUploadResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;

class ResumeStorageServiceTest {

    @Test
    void shouldStoreValidPdfResumeInSupabase() throws Exception {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ResumeStorageService service = new ResumeStorageService(properties(), builder);

        server.expect(once(), requestTo("https://project.supabase.co/storage/v1/object/portfolio-assets/resume.pdf"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(header(HttpHeaders.AUTHORIZATION, "Bearer service-role-key"))
                .andExpect(header("apikey", "service-role-key"))
                .andExpect(header("x-upsert", "true"))
                .andRespond(withStatus(HttpStatus.OK));

        MockMultipartFile file = new MockMultipartFile(
                "resume",
                "resume.pdf",
                "application/pdf",
                "%PDF-1.4 test resume".getBytes()
        );

        ResumeUploadResponse response = service.replaceResume("secret123", file);

        assertEquals("resume.pdf", response.fileName());
        assertEquals("Resume updated successfully", response.message());
        assertNotNull(response.lastUpdated());
        server.verify();
    }

    @Test
    void shouldReadMetadataFromSupabasePublicObject() throws Exception {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ResumeStorageService service = new ResumeStorageService(properties(), builder);

        server.expect(once(), requestTo("https://project.supabase.co/storage/v1/object/public/portfolio-assets/resume.pdf"))
                .andExpect(method(HttpMethod.HEAD))
                .andRespond(withStatus(HttpStatus.OK)
                        .header(HttpHeaders.LAST_MODIFIED, "Wed, 11 Mar 2026 18:30:00 GMT"));

        ResumeMetadataResponse response = service.getMetadata();

        assertEquals("resume.pdf", response.fileName());
        assertEquals("2026-03-11T18:30:00Z", response.lastUpdated());
        server.verify();
    }

    @Test
    void shouldRejectInvalidPassword() {
        ResumeStorageService service = new ResumeStorageService(properties(), RestClient.builder());

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
        ResumeStorageService service = new ResumeStorageService(properties(), RestClient.builder());

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

    @Test
    void shouldExposePublicResumeUrl() {
        ResumeStorageService service = new ResumeStorageService(properties(), RestClient.builder());

        assertEquals(
                "https://project.supabase.co/storage/v1/object/public/portfolio-assets/resume.pdf",
                service.getPublicResumeUri().toString()
        );
    }

    private PortfolioResumeProperties properties() {
        return new PortfolioResumeProperties(
                "secret123",
                5 * 1024 * 1024L,
                "https://project.supabase.co",
                "service-role-key",
                "portfolio-assets",
                "resume.pdf"
        );
    }
}
