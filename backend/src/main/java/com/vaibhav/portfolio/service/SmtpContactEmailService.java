package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.config.PortfolioMailProperties;
import com.vaibhav.portfolio.dto.ContactRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class SmtpContactEmailService implements ContactEmailService {

    private final JavaMailSender mailSender;
    private final PortfolioMailProperties properties;
    private final String smtpHost;

    public SmtpContactEmailService(
            JavaMailSender mailSender,
            PortfolioMailProperties properties,
            @Value("${spring.mail.host:}") String smtpHost
    ) {
        this.mailSender = mailSender;
        this.properties = properties;
        this.smtpHost = smtpHost;
    }

    @Override
    public void send(ContactRequest request) {
        if (!StringUtils.hasText(properties.toEmail()) || !StringUtils.hasText(properties.fromEmail())) {
            throw new IllegalStateException("SMTP contact settings are incomplete. Configure CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
        }
        if (!StringUtils.hasText(smtpHost)) {
            throw new IllegalStateException("SMTP host is not configured. Set SMTP_HOST before using the contact API.");
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false);

            helper.setTo(properties.toEmail());
            helper.setFrom(properties.fromEmail());
            helper.setReplyTo(request.email());
            helper.setSubject("[Portfolio Contact] " + request.subject());
            helper.setText(buildEmailBody(request), false);

            mailSender.send(message);
        } catch (MessagingException exception) {
            throw new RuntimeException("Failed to build contact email.", exception);
        }
    }

    private String buildEmailBody(ContactRequest request) {
        return """
                New portfolio message

                Name: %s
                Email: %s
                Subject: %s

                Message:
                %s
                """.formatted(request.name(), request.email(), request.subject(), request.message());
    }
}
