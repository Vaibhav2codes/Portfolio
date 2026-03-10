package com.vaibhav.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Name is required.")
        @Size(max = 80, message = "Name must be under 80 characters.")
        String name,

        @NotBlank(message = "Email is required.")
        @Email(message = "Email must be valid.")
        String email,

        @NotBlank(message = "Subject is required.")
        @Size(max = 120, message = "Subject must be under 120 characters.")
        String subject,

        @NotBlank(message = "Message is required.")
        @Size(max = 5000, message = "Message must be under 5000 characters.")
        String message
) {
}
