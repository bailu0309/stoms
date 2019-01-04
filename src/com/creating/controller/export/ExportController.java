package com.creating.controller.export;


import com.creating.controller.basic.BaseController;
import com.creating.util.export.ExportExcelUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value = "/ExportController/")
public class ExportController extends BaseController {
    private Logger logger = Logger.getLogger(ExportController.class);


    @Autowired
    private ExportExcelUtils exportExcelUtils;


    @RequestMapping(value = "exportStatis.sdo")
    public
    @ResponseBody
    void exportStatis(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<Map> ls = new ArrayList<>();

        String[] headers = {"1", "", "", ""};
        String[] headers2 = {"11", "", "12", "",};
        String[] headers3 = {"111", "112", "121", "122"};
        String[] headnum0 = new String[]{"1,1,0,3"};
        String[] headnum1 = new String[]{"2,2,0,1", "2,2,2,3"};
        String[] headnum2 = new String[]{"3,3,0,0", "3,3,1,1", "3,3,2,2", "3,3,3,3"};
        //需要显示在excel中的参数对应的值，因为是用map存的，放的都是对应的key
        String[] colName = new String[]{"COMMUNITYUSERNAME", "LRS", "SHS", "GWS"};
        int[] width = new int[]{10};
        List heads = Arrays.asList(headers, headers2, headers3);
        List nums = Arrays.asList(headnum0, headnum1, headnum2);
        exportExcelUtils.exportManyMergeXls(request, response, ls, "社区问卷统计", heads, nums, colName, width); //utils类需要用到的参数
    }

}
