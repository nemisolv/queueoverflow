package com.nemisolv.helper;

import com.nemisolv.exception.BadRequestException;
import com.nemisolv.service.SettingService;
import com.nemisolv.util.Utility;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.angus.mail.smtp.SMTPAddressFailedException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
@Slf4j
@RequiredArgsConstructor
public class MailHelper {
    private final SettingService settingService;

    public void sendMail(String toAddress,String subject, String body)  {
        EmailSettingBag settingBag = settingService.getEmailSettings();
        JavaMailSenderImpl mailSender = Utility.prepareMailSender(settingBag);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom(settingBag.getMailFrom(), settingBag.getSenderName());
            helper.setTo(toAddress);
            helper.setSubject(subject);
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MailSendException ex) {
            log.error("SMTPAddressFailedException: -->", ex);
            throw new BadRequestException("Invalid email address");
        }
        catch (MessagingException e) {
            log.error("ErrorDTO sending mail: -->", e);
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            log.error("Unsupported encoding: -->", e);
            throw new RuntimeException(e);
        }


    }
}
