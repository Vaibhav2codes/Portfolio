package com.vaibhav.portfolio.dto;

public record ResumeUploadResponse(
        boolean success,
        String message,
        String fileName,
        String lastUpdated
) {
}
