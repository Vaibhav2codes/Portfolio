package com.vaibhav.portfolio.dto;

public record ResumeMetadataResponse(
        boolean success,
        String message,
        String fileName,
        String lastUpdated
) {
}
