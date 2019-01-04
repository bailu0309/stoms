package com.creating.service.activemq;


import org.springframework.jms.core.JmsTemplate;

import javax.annotation.Resource;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.TextMessage;

/**
 * @Author mabailu
 * @Date 2018/7/9 16:02
 * @Description
 */

//@Service
public class ConsumerService {

    @Resource(name = "jmsTemplate")
    private JmsTemplate jmsTemplate;

    public TextMessage receive(Destination destination) {
        TextMessage textMessage = (TextMessage) jmsTemplate.receive(destination);
        try {
            System.out.println(textMessage.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
        return textMessage;
    }
}