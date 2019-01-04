package com.creating.listener;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

/**
 * @Author mabailu
 * @Date 2018/7/9 15:59
 * @Description
 */
public class QueueMessageListener implements MessageListener {
    @Override
    public void onMessage(Message message) {
        TextMessage tm = (TextMessage) message;

        try {
            System.out.println(tm.getText());
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
