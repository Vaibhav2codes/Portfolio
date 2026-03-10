package com.vaibhav.portfolio.service;

import com.vaibhav.portfolio.dto.ContactRequest;

public interface ContactEmailService {

    void send(ContactRequest request);
}
