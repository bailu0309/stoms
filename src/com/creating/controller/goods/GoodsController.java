package com.creating.controller.goods;

import com.creating.controller.basic.BaseController;
import com.creating.dao.base.BaseEntity;
import com.creating.dao.mapper.basic.DepartDao;
import com.creating.dao.mapper.entity.goods.GoodsEty;
import com.creating.dao.mapper.entity.goods.RecieveInfo;
import com.creating.dao.mapper.entity.goods.RecieveItems;
import com.creating.dao.mapper.goods.GoodsEtyMapper;
import com.creating.service.goods.GoodsService;
import com.creating.util.json.DateUtils;
import com.creating.util.json.JSONGrid;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/GoodsController/")
public class GoodsController extends BaseController {


    @Autowired
    private GoodsEtyMapper goodsMapper;
    @Autowired
    private GoodsService goodsService;


    @RequestMapping("queryGoods.sdo")
    public
    @ResponseBody
    String queryGoods(BaseEntity baseEntity, GoodsEty goods, HttpServletRequest request) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<GoodsEty> page = (Page<GoodsEty>) goodsMapper.queryGoods(goods);
        JSONObject retObj = JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
        return retObj.toString();
    }


    @RequestMapping("queryRecieveInfo.sdo")
    public
    @ResponseBody
    String queryRecieveInfo(BaseEntity baseEntity, RecieveInfo recieveInfo, HttpServletRequest request) throws Exception {
        JSONObject retObj = goodsService.queryRecieveInfo(baseEntity, recieveInfo, request);

        return retObj.toString();
    }

    @RequestMapping(value = "saveRecieveInfo.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveRecieveInfo(HttpServletRequest request, HttpServletResponse response, RecieveInfo recieveInfo) throws Exception {
        String result = goodsService.saveRecieveInfo(request, recieveInfo);
        return result;
    }


    @RequestMapping(value = "saveRecieveItems.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveRecieveItems(HttpServletRequest request, HttpServletResponse response, RecieveItems recieveItems) throws Exception {
        String result = goodsService.saveRecieveItems(request, recieveItems);
        return result;
    }

}
