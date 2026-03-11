package com.vaibhav.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portfolio.resume")
public record PortfolioResumeProperties(
        String adminPassword,
        long maxFileSizeBytes,
        String supabaseUrl,
        String supabaseServiceRoleKey,
        String supabaseBucket,
        String supabaseObjectPath
) {
}
