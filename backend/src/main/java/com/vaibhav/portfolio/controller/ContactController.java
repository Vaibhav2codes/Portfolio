package com.vaibhav.portfolio.controller;

import com.vaibhav.portfolio.dto.ApiResponse;
import com.vaibhav.portfolio.dto.ContactRequest;
import com.vaibhav.portfolio.service.ContactEmailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactEmailService contactEmailService;

    public ContactController(ContactEmailService contactEmailService) {
        this.contactEmailService = contactEmailService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> sendMessage(@Valid @RequestBody ContactRequest request) {
        contactEmailService.send(request);
        return ResponseEntity.ok(new ApiResponse(true, "Message sent successfully."));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiResponse> handleConfigurationError(IllegalStateException exception) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new ApiResponse(false, exception.getMessage()));
    }
}
