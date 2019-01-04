package com.creating.dao.mapper.entity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PropertiesBean {

    @Value("#{configProperties['mail.username']}")
    String mailUserName;

    @Value("#{configProperties['mail.testmail']}")
    String testMail;

    @Value("#{configProperties['mail.send']}")
    String mailsend;

    public String getMailUserName() {
        return mailUserName;
    }

    public String getTestMail() {
        return testMail;
    }

    public String getMailsend() {
        return mailsend;
    }

}
