package com.creating.controller.basic;

import com.creating.util.json.DateUtils;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.multipart.support.ByteArrayMultipartFileEditor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Author mabailu
 * @Date 2018/12/19 14:48
 * @Description
 */
public class BaseController {

    @InitBinder
    public void initBibder(WebDataBinder binder) {
        binder.registerCustomEditor(Timestamp.class, new CustomDateEditor(DateUtils.datetimeFormat, true));
        binder.registerCustomEditor(Date.class, new CustomDateEditor(DateUtils.dateFormat, true));
        binder.registerCustomEditor(byte[].class, new ByteArrayMultipartFileEditor());
        binder.registerCustomEditor(Integer.class, null, new CustomNumberEditor(Integer.class, null, true));
        binder.registerCustomEditor(Long.class, null, new CustomNumberEditor(Long.class, null, true));
        binder.registerCustomEditor(Double.class, null, new CustomNumberEditor(Double.class, null, true));
    }

}
