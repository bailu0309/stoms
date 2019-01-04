package com.creating.controller.basic;

import com.creating.constants.ConfigConstants;
import com.creating.dao.mapper.entity.basic.DepartEty;
import com.creating.dao.mapper.entity.basic.TreeNodeEty;
import com.creating.dao.mapper.basic.DepartDao;
import com.creating.service.basic.DepartService;
import com.creating.util.json.JSONGrid;
import com.creating.util.json.SessionEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 用户管理
 *
 * @author
 */
@Controller
@RequestMapping(value = "/DepartController/")
public class DepartController {

    private Logger logger = Logger.getLogger(DepartController.class);

    @Autowired
    private DepartDao departDao;
    @Autowired
    private DepartService departService;

    @InitBinder
    public void initBibder(WebDataBinder binder) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        df.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
    }


    @RequestMapping(value = "list.sdo")
    public
    @ResponseBody
    String list(HttpServletRequest request, HttpServletResponse response, DepartEty departEty) throws Exception {
        departEty.setFoffn(SessionEntity.getDepId(request));
        List<DepartEty> list = departDao.selectByLimit(departEty);
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    @RequestMapping(value = "queryDepartOrder.sdo")
    public
    @ResponseBody
    String queryDepartOrder(HttpServletRequest request, HttpServletResponse response, DepartEty departEty) throws Exception {
        departEty.setFoffn(SessionEntity.getDepId(request));
        List<DepartEty> list = departDao.queryDepartOrder(departEty);
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    @RequestMapping("queryDepartTree4Task.sdo")
    public
    @ResponseBody
    String queryDepartTree4Task(HttpServletRequest request, HttpServletResponse response, TreeNodeEty treeNodeEty) throws Exception {
        if (ConfigConstants.ROLE_DEPART_EXECUTE.equals(SessionEntity.getRole(request))) {
            treeNodeEty.setPersonid(SessionEntity.getName(request));
        } else if (ConfigConstants.ROLE_DEPART_LEADER.equals(SessionEntity.getRole(request)) || ConfigConstants.ROLE_DEPART_EXECUTE.equals(SessionEntity.getRole(request))) {
            treeNodeEty.setDepid(SessionEntity.getDepId(request));
        }
        JSONArray dataArray = departService.queryDepartTree4Task(treeNodeEty);
        return dataArray.toString();
    }


    @RequestMapping("queryDepartTree4SelfEval.sdo")
    public
    @ResponseBody
    String queryDepartTree4SelfEval(HttpServletRequest request, HttpServletResponse response, TreeNodeEty treeNodeEty) throws Exception {
        if (ConfigConstants.ROLE_DEPART_EXECUTE.equals(SessionEntity.getRole(request)) || ConfigConstants.ROLE_DEPART_LEADER.equals(SessionEntity.getRole(request))) {
            treeNodeEty.setDepid(SessionEntity.getDepId(request));
        }
        JSONArray dataArray = departService.queryDepartTree4SelfEval(treeNodeEty);
        return dataArray.toString();
    }

    @RequestMapping(value = "queryDepart.sdo")
    public
    @ResponseBody
    String queryDepart(HttpServletRequest request, HttpServletResponse response, DepartEty departEty) throws Exception {
        List<DepartEty> list = departDao.selectByLimit(departEty);
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }



}
