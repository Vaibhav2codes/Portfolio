package com.vaibhav.portfolio.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({PortfolioMailProperties.class, PortfolioResumeProperties.class})
public class PropertiesConfig {
}
