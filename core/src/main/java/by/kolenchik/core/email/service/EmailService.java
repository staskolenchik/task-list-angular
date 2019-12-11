package by.kolenchik.core.email.service;

import by.kolenchik.core.email.EmailMessage;

public interface EmailService {
    void sendEmail(EmailMessage emailMessage);
}
