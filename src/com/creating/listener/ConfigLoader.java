package com.creating.listener;

import com.creating.constants.ConfigConstants;
import com.creating.service.dictionary.DictionaryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Properties;

public class ConfigLoader {

    @Autowired
    DictionaryService dictionaryService;

    /**
     * 加载入口
     */
    public void init() {
        loadProperties();
        loadDict();
    }

    private void loadDict() {
        ConfigConstants.DICTIONARY = dictionaryService.queryDict();
    }

    private void loadProperties() {
        Properties prop = new Properties();
        try {
            prop.load(ConfigLoader.class.getClassLoader().getResourceAsStream("resources/sysConfig.properties"));
            ConfigConstants.COMMITMENTFILEURL = prop.getProperty("COMMITMENTFILEURL");
            ConfigConstants.REDIS_IP = prop.getProperty("redisip");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
