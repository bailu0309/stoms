package com.creating.service.activemq;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

/**
 * @Author mabailu
 * @Date 2018/7/9 16:01
 * @Description
 */
//@Service
public class ProducerService {

    @Resource(name = "jmsTemplate")
    private JmsTemplate jmsTemplate;

    public void sendMessage(Destination destination, final String msg) {
        jmsTemplate.send(destination, new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(msg);
            }
        });
    }

    public void sendMessage(final String msg) {
        String destination = jmsTemplate.getDefaultDestinationName();
        System.out.println(Thread.currentThread().getName() + " 向队列" + destination + "发送消息---------------------->" + msg);
        jmsTemplate.send(new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(msg);
            }
        });
    }
}
