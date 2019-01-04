package com.creating.controller.basic;

import com.creating.dao.mapper.basic.DqbmDao;
import com.creating.dao.mapper.entity.basic.DqbmEty;
import com.creating.util.json.JSONGrid;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @Author mabailu
 * @Date 2018/5/10 9:35
 * @Description 地址控制层
 */
@Controller
@RequestMapping("/AddressController/")
public class AddressController {

    @Autowired
    DqbmDao dqbmDao;

    @RequestMapping(value = "listCity.sdo")
    public
    @ResponseBody
    String listCity(HttpServletRequest request, HttpServletResponse response, DqbmEty tdEty) throws Exception {
        List<DqbmEty> list = dqbmDao.listCity(tdEty);
        JSONObject retObj = JSONGrid.toJSon(list, list.size());
        return retObj.toString();
    }

    @RequestMapping(value = "listXq.sdo")
    public
    @ResponseBody
    String listXq(HttpServletRequest request, HttpServletResponse response, DqbmEty tdEty) throws Exception {
        List<DqbmEty> list = dqbmDao.listXq(tdEty);
        JSONObject retObj = JSONGrid.toJSon(list, list.size());
        return retObj.toString();
    }

    @RequestMapping(value = "listXzjd.sdo")
    public
    @ResponseBody
    String listXzjd(HttpServletRequest request, HttpServletResponse response, DqbmEty tdEty) throws Exception {
        List<DqbmEty> list = dqbmDao.listXzjd(tdEty);
        JSONObject retObj = JSONGrid.toJSon(list, list.size());
        return retObj.toString();
    }

    @RequestMapping(value = "listCjs.sdo")
    public
    @ResponseBody
    String listCjs(HttpServletRequest request, HttpServletResponse response, DqbmEty tdEty) throws Exception {
        List<DqbmEty> list = dqbmDao.listCjs(tdEty);
        JSONObject retObj = JSONGrid.toJSon(list, list.size());
        return retObj.toString();
    }
}
