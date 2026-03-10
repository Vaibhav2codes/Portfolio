package com.vaibhav.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portfolio.contact")
public record PortfolioMailProperties(String toEmail, String fromEmail) {
}
