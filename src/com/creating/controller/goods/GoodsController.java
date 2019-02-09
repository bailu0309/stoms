package com.creating.controller.goods;

import com.creating.controller.basic.BaseController;
import com.creating.dao.base.BaseEntity;
import com.creating.dao.mapper.entity.basic.ResultInfo;
import com.creating.dao.mapper.entity.goods.*;
import com.creating.service.goods.GoodsService;
import com.creating.util.json.DateUtils;
import com.creating.util.json.JSONGrid;
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
    private GoodsService goodsService;


    @RequestMapping("queryGoods.sdo")
    public
    @ResponseBody
    String queryGoods(BaseEntity baseEntity, GoodsEty goods, HttpServletRequest request) throws Exception {
        JSONObject retObj = goodsService.queryPageGoods(baseEntity, goods);
        return retObj.toString();
    }

    @RequestMapping("queryAllGoods.sdo")
    public
    @ResponseBody
    String queryAllGoods(BaseEntity baseEntity, GoodsEty goods, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryGoods(goods);
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }

    @RequestMapping("queryGoodsInStock.sdo")
    public
    @ResponseBody
    String queryGoodsInStock(BaseEntity baseEntity, GoodsEty goods, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryGoodsInStock(goods);
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }

    @RequestMapping("queryRecieveInfo.sdo")
    public
    @ResponseBody
    String queryRecieveInfo(BaseEntity baseEntity, RecieveEty recieveInfo, HttpServletRequest request) throws Exception {
        JSONObject retObj = goodsService.queryPageRecieves(baseEntity, recieveInfo);
        return retObj.toString();
    }


    @RequestMapping("queryRecieveItems.sdo")
    public
    @ResponseBody
    String queryRecieveItems(BaseEntity baseEntity, RecieveItemsEty recieveItemsEty, HttpServletRequest request) throws Exception {
        JSONObject retObj = goodsService.queryPageRecieveItems(baseEntity, recieveItemsEty);
        return retObj.toString();
    }


    @RequestMapping("queryInstore.sdo")
    public
    @ResponseBody
    String queryInstore(BaseEntity baseEntity, InstoreEty instoreEty, HttpServletRequest request) throws Exception {
        JSONObject retObj = goodsService.queryPageInstores(baseEntity, instoreEty);
        return retObj.toString();
    }

    @RequestMapping("queryInstoreItems.sdo")
    public
    @ResponseBody
    String queryInstoreItems(BaseEntity baseEntity, InstoreItemsEty itemsEty, HttpServletRequest request) throws Exception {
        JSONObject retObj = goodsService.queryInstoreItems(baseEntity, itemsEty);
        return retObj.toString();
    }


    @RequestMapping("queryWareHouseGoods.sdo")
    public
    @ResponseBody
    String queryWareHouseGoods(BaseEntity baseEntity, WareHousesGoodsEty wareHousesGoodsEty, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryWareHouseGoods(wareHousesGoodsEty);
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }


    @RequestMapping("queryWareHouses.sdo")
    public
    @ResponseBody
    String queryWareHouse(BaseEntity baseEntity, WareHousesEty wareHousesEty, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryWareHouses(wareHousesEty);
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();

    }


    @RequestMapping("queryBrands.sdo")
    public
    @ResponseBody
    String queryBrands(BaseEntity baseEntity, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryBrands();
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }

    @RequestMapping("queryModels.sdo")
    public
    @ResponseBody
    String queryModels(BaseEntity baseEntity, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryModels();
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }

    @RequestMapping("queryGoodsUnits.sdo")
    public
    @ResponseBody
    String queryGoodsUnits(BaseEntity baseEntity, HttpServletRequest request) throws Exception {
        List ls = goodsService.queryGoodsUnits();
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }

    @RequestMapping("querySuppliers.sdo")
    public
    @ResponseBody
    String querySuppliers(BaseEntity baseEntity, SuppliersEty suppliersEty, HttpServletRequest request) throws Exception {
        List<SuppliersEty> ls = goodsService.querySuppliers(suppliersEty);
        JSONObject jsonObject = JSONGrid.toJSon(ls);
        return jsonObject.toString();
    }

    @RequestMapping(value = "saveRecieveInfo.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveRecieveInfo(HttpServletRequest request, HttpServletResponse response, RecieveEty recieveInfo) throws Exception {
        String result = goodsService.saveRecieveInfo(request, recieveInfo);
        return result;
    }


    @RequestMapping(value = "saveRecieveItems.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveRecieveItems(HttpServletRequest request, HttpServletResponse response, RecieveItemsEty recieveItems) throws Exception {
        String result = goodsService.saveRecieveItems(request, recieveItems);
        return result;
    }


    @RequestMapping(value = "saveInstore.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveRecieveInfo(HttpServletRequest request, HttpServletResponse response, InstoreEty instoreEty) throws Exception {
        ResultInfo result = goodsService.saveInstore(instoreEty);
        return result.toString();
    }

    @RequestMapping(value = "saveInstoreItems.sdo", method = RequestMethod.POST)
    public @ResponseBody
    String saveInstoreItems(HttpServletRequest request, HttpServletResponse response, InstoreItemsEty instoreItemsEty) throws Exception {
        String result = goodsService.saveInstoreItems(instoreItemsEty);
        return result;
    }

}
