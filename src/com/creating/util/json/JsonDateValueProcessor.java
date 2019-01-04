package com.creating.util.json;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import java.text.SimpleDateFormat;
import java.util.Locale;

public class JsonDateValueProcessor implements JsonValueProcessor {

    private String datePattern = "yyyy-MM-dd HH:mm:ss";// 日期格式

    public String getDatePattern() {
        return datePattern;
    }

    public void setDatePattern(String datePaterns) {
        this.datePattern = datePaterns;
    }

    public JsonDateValueProcessor() {
        super();
    }

    // 构造函数
    public JsonDateValueProcessor(String format) {
        super();
        this.datePattern = format;
    }

    @Override
    public Object processArrayValue(Object value, JsonConfig jsonConfig) {
        return process(value);
    }

    @Override
    public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
        return process(value);
    }

    private Object process(Object value) {
        try {
            if (value instanceof java.util.Date || value instanceof java.sql.Date) {
                SimpleDateFormat sdf = new SimpleDateFormat(datePattern, Locale.UK);
                return sdf.format(value);
            }
            return value == null ? "" : value.toString();
        } catch (Exception e) {
            return "";
        }
    }

}
