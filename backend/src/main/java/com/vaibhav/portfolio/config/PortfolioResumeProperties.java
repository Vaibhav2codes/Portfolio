package com.vaibhav.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portfolio.resume")
public record PortfolioResumeProperties(
        String adminPassword,
        String storagePath,
        long maxFileSizeBytes
) {
}
