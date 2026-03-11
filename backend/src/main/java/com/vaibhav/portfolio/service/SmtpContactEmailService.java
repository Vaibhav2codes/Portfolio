package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.config.PortfolioMailProperties;
import com.vaibhav.portfolio.dto.ContactRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class SmtpContactEmailService implements ContactEmailService {
    private static final Logger logger = LoggerFactory.getLogger(SmtpContactEmailService.class);

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
        } catch (MailException exception) {
            logger.error("SMTP delivery failed via host {} for sender {} and recipient {}",
                    smtpHost, properties.fromEmail(), properties.toEmail(), exception);
            throw new IllegalStateException(
                    "SMTP delivery failed. Check SMTP credentials, verified sender, and provider settings."
            );
        } catch (MessagingException exception) {
            logger.error("Failed to build contact email message.", exception);
            throw new IllegalStateException("Failed to build contact email message.");
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
