package com.creating.controller.basic;

import com.creating.constants.ConfigConstants;
import com.creating.constants.StringConstants;
import com.creating.dao.mapper.basic.UserDao;
import com.creating.dao.mapper.entity.basic.UserEty;
import com.creating.service.basic.UserRoleService;
import com.creating.util.json.JSONGrid;
import com.creating.util.json.SessionEntity;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping(value = "/basic/UserController/")
public class UserController {

    private Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserRoleService userRoleService;

    @InitBinder
    public void initBibder(WebDataBinder binder) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        df.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
    }

    /**
     * 查询全部用户
     *
     * @param request
     * @param response
     * @param user
     * @return userEty
     * @throws Exception
     */
    @RequestMapping(value = "list.sdo")
    public
    @ResponseBody
    String list(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        if (user.getUsername() != null) {
            user.setUsername(user.getUsername().replaceAll(" ", ""));
        }
        PageHelper.startPage(user.getPage(), user.getLimit());
        Page<UserEty> page = (Page<UserEty>) userDao.selectByLimit(user);
        JSONObject retObj = JSONGrid.toJSon(page.getResult(), page.getTotal(), new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    @RequestMapping(value = "listmain.sdo")
    public
    @ResponseBody
    String listmain(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        List<UserEty> list = userDao.selectMainUser(user);
        JSONObject retObj = JSONGrid.toJSon(list, list.size(), new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }


    @RequestMapping(value = "listmainbyself.sdo")
    public
    @ResponseBody
    String listmainbyself(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        user.setName(SessionEntity.getName(request));
        user.setMuserid(SessionEntity.getMainUserId(request));
        List<UserEty> list = userDao.listmainbyself(user);
        JSONObject retObj = JSONGrid.toJSon(list, list.size(), new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }


    /**
     * 修改用户密码
     *
     * @param request
     * @param response
     * @param user
     * @return userEty
     * @throws Exception
     */
    @RequestMapping(value = "edit.sdo")
    public
    @ResponseBody
    String searchByName(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        JSONObject retObj = new JSONObject();
        retObj.put("success", true);
        String oldPassword = user.getPassword();
        List<UserEty> list = userDao.selectUserByName(user.getName());
        if (list.get(0).getPassword().equals(oldPassword)) {
            retObj.put("result", "fail");
            retObj.put("info", "原密码错误");
        } else {
            user.setId(list.get(0).getId());
            userDao.updateById(user);
            retObj.put("result", "success");
        }
        //JSONObject retObj = JSONGrid.toJSon(list);
        return retObj.toString();
    }

    /**
     * 修改用户密码
     *
     * @param request
     * @param response
     * @return userEty
     * @throws Exception
     */
    @RequestMapping(value = "updateUser.sdo")
    public
    @ResponseBody
    String updateUser(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        JSONObject retObj = new JSONObject();
        retObj.put(StringConstants.SUCCESS, true);
        userDao.updateUser(user);
        retObj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        return retObj.toString();
    }

    /**
     * 修改用户密码
     *
     * @param request
     * @param response
     * @return userEty
     * @throws Exception
     */
    @RequestMapping(value = "addUser.sdo")
    public
    @ResponseBody
    String addUser(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        JSONObject retObj = new JSONObject();
        retObj.put(StringConstants.SUCCESS, true);
        List<UserEty> us = userDao.queryUserByName(user);
        if (us.size() > 0) {
            retObj.put(StringConstants.RESULT, StringConstants.ERROR);
            retObj.put(StringConstants.SUCCESS, false);
            retObj.put(StringConstants.INFO, "登录名已存在，请重新输入！");
        } else {
            userRoleService.addUser(user);
            retObj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        }
        return retObj.toString();
    }

    @RequestMapping(value = "checkNameRepeat.sdo")
    public
    @ResponseBody
    String checkNameRepeat(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        JSONObject retObj = new JSONObject();
        retObj.put(StringConstants.SUCCESS, true);
        List<UserEty> us = userDao.queryUserByNameId(user);
        if (us.size() > 0) {
            retObj.put(StringConstants.SUCCESS, true);
            retObj.put(StringConstants.RESULT, StringConstants.SUCCESS);
        } else {
            retObj.put(StringConstants.SUCCESS, false);
        }
        return retObj.toString();
    }

    /**
     * 添加或更改用户
     *
     * @param request
     * @param response
     * @param userEty
     * @throws Exception
     */
    @RequestMapping(value = "add.sdo")
    public
    @ResponseBody
    String add(HttpServletRequest request, HttpServletResponse response, UserEty userEty) throws Exception {
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        if (userEty.getId() == null) {
            //插入主键
//            userEty.setId(Integer.parseInt(userDao.getZjID()));
            userEty.setInsert_date(new Date());
            userDao.insert(userEty);
        } else {
            userDao.updateById(userEty);
        }
        obj.put("result", "success");
        return obj.toString();
    }


    /**
     * 根据 id删除用户
     *
     * @param id
     * @throws Exception
     */
    @RequestMapping(value = "delete.sdo", method = RequestMethod.POST)
    public
    @ResponseBody
    String delete(@RequestParam("id") int id) {
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        userDao.deleteById(id);
        obj.put("result", "success");
        return obj.toString();
    }


    /**
     * 根据id 配置用户的角色
     */
    @RequestMapping(value = "setRole.sdo")
    public
    @ResponseBody
    String setRole(@RequestParam("userid") Integer userId, @RequestParam("roleid") String roleIds) throws Exception {
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        userRoleService.saveUserRole(userId, roleIds);
        obj.put("result", "success");
        return obj.toString();
    }


    @RequestMapping(value = "listPerson4Task.sdo")
    public
    @ResponseBody
    String listPerson4Task(HttpServletRequest request, HttpServletResponse response, UserEty userEty) throws Exception {
        if (SessionEntity.getRole(request).equals(ConfigConstants.ROLE_DEPART_LEADER)) {
            userEty.setDepid(SessionEntity.getDepId(request));
        }
        List<UserEty> list = userDao.listPerson4Task(userEty);
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }


    @RequestMapping(value = "listQcc.sdo")
    public
    @ResponseBody
    String listQcc(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<UserEty> list = userDao.queryQcc();
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }

    @RequestMapping(value = "listAllQcc.sdo")
    public
    @ResponseBody
    String listAllQcc(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<UserEty> list = userDao.queryQcc();
        UserEty u = new UserEty();
        u.setName("");
        u.setUsername("全省");
        list.add(0, u);
        JSONObject retObj = JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd"));
        return retObj.toString();
    }


}
