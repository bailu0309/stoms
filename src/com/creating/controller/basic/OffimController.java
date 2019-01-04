package com.creating.controller.basic;


import com.creating.dao.mapper.entity.basic.DepartEty;
import com.creating.dao.mapper.entity.basic.ResultInfo;
import com.creating.dao.mapper.basic.DepartDao;
import com.creating.util.json.JSONGrid;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * 菜单管理
 *
 * @author
 */
@Controller
@RequestMapping(value = "/basic/OffimController/")
public class OffimController {

    private Logger logger = Logger.getLogger(OffimController.class);

    @Autowired
    private DepartDao offimDao;

    @RequestMapping(value = "list.sdo")
    public
    @ResponseBody
    String list(HttpServletRequest request, HttpServletResponse response, DepartEty departEty) throws Exception {
        List<DepartEty> list = offimDao.selectByLimit(departEty);
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    @RequestMapping(value = "add.sdo")
    public
    @ResponseBody
    String add(HttpServletRequest request, HttpServletResponse response, DepartEty departEty) throws Exception {
        ResultInfo resultInfo = new ResultInfo();
        if (departEty.getFid().isEmpty()) {
            offimDao.insert(departEty);
        } else {
            offimDao.updateById(departEty);
        }
        resultInfo.setSuccess(true);
        return resultInfo.toString();
    }

    @RequestMapping(value = "delete.sdo")
    public
    @ResponseBody
    String delete(HttpServletRequest request, HttpServletResponse response, DepartEty departEty) throws Exception {
        ResultInfo resultInfo = new ResultInfo();

        offimDao.deleteById(departEty);

        resultInfo.setSuccess(true);
        return resultInfo.toString();
    }

}
