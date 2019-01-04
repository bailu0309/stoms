package com.creating.controller.basic;

import com.creating.dao.mapper.entity.basic.MenuEty;
import com.creating.dao.mapper.entity.basic.UserEty;
import com.creating.dao.mapper.basic.MenuDao;
import com.creating.dao.mapper.basic.UserDao;
import com.creating.service.basic.LoginService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * 单点登录控制
 *
 * @author User
 */
@Controller
@RequestMapping("/basic/LoginController/")
public class LoginController {

    private Logger logger = Logger.getLogger(LoginController.class);


    @Autowired
    private UserDao userDao;

    @Autowired
    private LoginService loginService;

    @Autowired
    private MenuDao menuDao;


    @RequestMapping("login.sdo")
    public
    @ResponseBody
    String login(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        JSONObject obj = loginService.login(request);
        return obj.toString();
    }


    @RequestMapping("relogin.sdo")
    public
    @ResponseBody
    String relogin(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
        JSONObject obj = loginService.relogin(request, user);
        return obj.toString();
    }

    /**
     * 根据用户ID 获得用户所属的角色对应的菜单树
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("getUserTree.sdo")
    public
    @ResponseBody
    String getUserTree(@RequestParam("userId") int userId) throws Exception {
        JSONArray dataArray = new JSONArray();
        List<MenuEty> menuList = userDao.selectUserMenuMap(userId);
        for (int i = 0; i < menuList.size(); i++) {
            System.out.println(menuList.get(i).getParantMenuID());
            MenuEty menuEty = menuDao.selectById(menuList.get(i).getParantMenuID());
            menuEty.setIcon("images/menu/" + menuEty.getIcon());
            menuEty.setOpenIcon("images/menu/32/" + menuEty.getOpenIcon());
            String[] menuIds = menuList.get(i).getMenuIds().split(",");
            List<MenuEty> childrenList = new ArrayList<MenuEty>();
            for (int j = 0; j < menuIds.length; j++) {
                MenuEty secondMenuEty = menuDao.selectById(Integer.parseInt(menuIds[j]));
                List<MenuEty> thList = menuDao.getListByParentId(secondMenuEty.getId());
                if (thList.size() > 0) {
                    for (MenuEty ety : thList) {
                        ety.setIcon("images/menu/" + ety.getIcon());
                        ety.setOpenIcon("images/menu/32/" + ety.getOpenIcon());
                        childrenList.add(ety);
                    }
                } else {
                    secondMenuEty.setIcon("images/menu/" + secondMenuEty.getIcon());
                    secondMenuEty.setOpenIcon("images/menu/32/" + secondMenuEty.getOpenIcon());
                    childrenList.add(secondMenuEty);
                }
            }
            menuEty.setChildren(childrenList);
            dataArray.add(menuEty);
        }
        return dataArray.toString();
    }


    /**
     * 根据用户ID 获得用户所属的角色对应的菜单树
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("getUserTbar.sdo")
    public
    @ResponseBody
    String getUserTbar(HttpServletRequest request, HttpServletResponse response, @RequestParam("userId") int userId) throws Exception {
        StringBuffer str = new StringBuffer();
        List<MenuEty> menuList = userDao.selectUserMenuMap(userId);
        for (int i = 0; i < menuList.size(); i++) {
            MenuEty menuEty = menuDao.selectById(menuList.get(i).getParantMenuID());
            if (menuEty.getIsValiDate() == 0) {
                str.append("{text:'").append(menuEty.getMenuName()).append("',icon:'").append("images/menu/" + menuEty.getIcon() + "',");
                str.append("menu:[");
                String[] menuIds = menuList.get(i).getMenuIds().split(",");
                //List<MenuEty> childrenList =  new ArrayList<MenuEty>();
                for (int j = 0; j < menuIds.length; j++) {
                    MenuEty secondMenuEty = menuDao.selectById(Integer.parseInt(menuIds[j]));
                    if (j > 0) {
                        str.append(",");
                    }
                    List<MenuEty> thList = menuDao.getListByParentId(secondMenuEty.getId());
                    if (thList.size() > 0) {
                        str.append("{text:'").append(secondMenuEty.getMenuName()).append("',icon:'").append("images/menu/" + secondMenuEty.getIcon() + "',");
                        str.append("menu:[");
                        int k = 0;
                        for (MenuEty ety : thList) {
                            if (k > 0) {
                                str.append(",");
                            }
                            str.append("{text:'").append(ety.getMenuName()).append("',icon:'").append("images/menu/nav01.png',");
                            str.append("handler :function(){");
                            str.append("showMain('" + ety.getJsClassFile() + "','" + ety.getId() + "','images/menu/" + ety.getIcon() + "','" + ety.getMenuName() + "'); }}");
                            k++;
                        }
                        str.append("]}");
                    } else {
                        str.append("{text:'").append(secondMenuEty.getMenuName()).append("',icon:'").append("images/menu/nav01.png',");
                        str.append("handler :function(){");
                        str.append("showMain('" + secondMenuEty.getJsClassFile() + "','" + secondMenuEty.getId() + "','images/menu/" + secondMenuEty.getIcon() + "','" + secondMenuEty.getMenuName() + "'); }}");
                    }
                }
                str.append("]}$");
            }
        }
        return str.toString();
    }

    /**
     * 用户登出
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("logout.sdo")
    public
    @ResponseBody
    String logout(HttpServletRequest request, HttpServletResponse response) {
        JSONObject obj = loginService.logout(request);
        return obj.toString();
    }

}
