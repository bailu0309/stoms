package com.creating.listener;

import redis.clients.jedis.Jedis;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * @Author mabailu
 * @Date 2018/1/29 15:35
 * @Description
 */
public class TomcatListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
