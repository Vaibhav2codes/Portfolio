package com.vaibhav.portfolio.exception;

import com.vaibhav.portfolio.dto.ApiResponse;
import com.vaibhav.portfolio.dto.ResumeMetadataResponse;
import com.vaibhav.portfolio.dto.ResumeUploadResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.NoSuchFileException;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidation(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(" "));

        return ResponseEntity.badRequest().body(new ApiResponse(false, message));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleUnexpected(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "Unable to send message right now. Please try again later."));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResumeUploadResponse> handleBadRequest(IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
                .body(new ResumeUploadResponse(false, exception.getMessage(), null, null));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ResumeUploadResponse> handleUnauthorized(SecurityException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResumeUploadResponse(false, exception.getMessage(), null, null));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ResumeUploadResponse> handleConfiguration(IllegalStateException exception) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new ResumeUploadResponse(false, exception.getMessage(), null, null));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ResumeUploadResponse> handleMaxUpload(MaxUploadSizeExceededException exception) {
        return ResponseEntity.badRequest()
                .body(new ResumeUploadResponse(false, "Resume file must be 5MB or smaller.", null, null));
    }

    @ExceptionHandler(NoSuchFileException.class)
    public ResponseEntity<ResumeMetadataResponse> handleMissingFile(NoSuchFileException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ResumeMetadataResponse(false, exception.getMessage(), null, null));
    }
}
