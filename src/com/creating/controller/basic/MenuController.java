package com.creating.controller.basic;


import com.creating.dao.mapper.basic.MenuDao;
import com.creating.dao.mapper.entity.basic.MenuEty;
import com.creating.dao.mapper.entity.basic.PictureEty;
import com.creating.util.json.JSONGrid;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * 菜单管理
 *
 * @author
 */
@Controller
@RequestMapping(value = "/basic/MenuController/")
public class MenuController {

    private Logger logger = Logger.getLogger(MenuController.class);

    @Autowired
    MenuDao menuDao;

    /*
     * 全部菜单列成树
     * @param request
     * @param response
     * @return JsonTree
     * @throws Exception
     * */
    @RequestMapping(value = "list.sdo")
    public
    @ResponseBody
    String list(@RequestParam("id") int id) throws Exception {
        JSONArray dataArray = new JSONArray();
        List<MenuEty> firstList = menuDao.getListByParentId(id);

        for (int i = 0; i < firstList.size(); i++) {
            MenuEty node = firstList.get(i);
            node.setIcon("images/menu/" + node.getIcon());
            node.setOpenIcon("images/menu/32/" + node.getOpenIcon());
            //是否有子结点
            List<MenuEty> subList = menuDao.getListByParentId(node.getId());
            if (subList.size() > 0) {
                for (int j = 0; j < subList.size(); j++) {
                    MenuEty secondNode = subList.get(j);
                    List<MenuEty> thList = menuDao.getListByParentId(secondNode.getId());
                    if (thList.size() > 0) {
                        for (MenuEty ety : thList) {
                            ety.setIcon("images/menu/" + ety.getIcon());
                            ety.setOpenIcon("images/menu/32/" + ety.getOpenIcon());
                        }
                        secondNode.setLeaf(false);
                        secondNode.setChildren(thList);
                    } else {
                        secondNode.setLeaf(true);
                    }
                    secondNode.setIcon("images/menu/" + secondNode.getIcon());
                    secondNode.setOpenIcon("images/menu/32/" + secondNode.getOpenIcon());
                }
                node.setLeaf(false);
                node.setChildren(subList);
            } else {
                node.setLeaf(true);
            }
            dataArray.add(node);
        }
        return dataArray.toString();
    }

    /**
     * 添加或更改菜单
     *
     * @param request
     * @param response
     * @param menuEty
     * @throws Exception
     */
    @RequestMapping(value = "add.sdo")
    public
    @ResponseBody
    String add(HttpServletRequest request, HttpServletResponse response, MenuEty menuEty) throws Exception {
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        if (menuEty.getId() == null) {
            //oracle主键没有自动增长
//            menuEty.setId(Integer.parseInt(menuDao.getZjID()));
            menuDao.insert(menuEty);
        } else {
            menuDao.updateById(menuEty);
        }
        obj.put("result", "success");
        return obj.toString();
    }

    /**
     * 根据 id删除菜单
     *
     * @param request id
     * @throws Exception
     */
    @RequestMapping(value = "delete.sdo", method = RequestMethod.POST)
    public
    @ResponseBody
    String delete(@RequestParam("id") int id) {
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        menuDao.deleteById(id);
        obj.put("result", "success");
        return obj.toString();
    }

    /**
     * 查询图表列表
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("searchPic.sdo")
    public
    @ResponseBody
    String searchPic(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject data = new JSONObject();
        List<PictureEty> picList = new ArrayList<PictureEty>();
        HttpSession session = request.getSession();
        ServletContext application = session.getServletContext();
        String Path = application.getRealPath("/") + "images/menu/32";
        Path = Path.replace("/", File.separator);
        File folderList = new File(Path);
        File list[] = folderList.listFiles();
        if (list != null && list.length > 0) {
            for (int i = 0; i < list.length; i++) {
                int index = list[i].toString().indexOf("menu");
                String path = list[i].toString().substring(index + 7, list[i].toString().length());
                PictureEty ety = new PictureEty();
                ety.setName(path.substring(1, path.indexOf(".")));
                ety.setUrl("images/menu/32" + path);
                picList.add(ety);
            }
            data = JSONGrid.toJSon(picList, list.length);
            return data.toString();
        }
        return null;
    }

    @ExceptionHandler
    public
    @ResponseBody
    String handle(Exception e) {
        logger.error(e.getMessage(), e);
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        obj.put("result", "error");
        obj.put("info", e.getMessage());
        return obj.toString();
    }
}
