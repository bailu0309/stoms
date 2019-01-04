package com.creating.controller.basic;

import com.creating.dao.mapper.basic.SystemLogMapper;
import com.creating.dao.mapper.entity.basic.SystemLog;
import com.creating.util.json.JSONGrid;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/11/26 10:09
 * @Description
 */
@Controller
@RequestMapping("/SystemLogController/")
public class SystemLogController {


    @Autowired
    private SystemLogMapper systemLogMapper;

    @RequestMapping(value = "queryLastSystemLog.sdo")
    public
    @ResponseBody
    String queryLastSystemLog(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<SystemLog> systemLog = systemLogMapper.selectLasted();
        JSONObject retObj = JSONGrid.toJSon(systemLog, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    @RequestMapping(value = "querySystemLog.sdo")
    public
    @ResponseBody
    String querySystemLog(HttpServletRequest request, HttpServletResponse response, SystemLog systemLog) throws Exception {
        PageHelper.startPage(systemLog.getPage(), systemLog.getLimit());
        Page<SystemLog> page = (Page<SystemLog>) systemLogMapper.querySystemLog(systemLog);
        List list = page.getResult();
        int size = (int) page.getTotal();
        JSONObject retObj = JSONGrid.toJSon(list, size, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

}
