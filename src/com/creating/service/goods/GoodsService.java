package com.creating.service.goods;

import com.creating.dao.base.BaseEntity;
import com.creating.dao.mapper.entity.basic.ResultInfo;
import com.creating.dao.mapper.entity.goods.*;
import com.creating.dao.mapper.goods.*;
import com.creating.util.json.DateUtils;
import com.creating.util.json.JSONGrid;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@Service
public class GoodsService {

    @Autowired
    private GoodsEtyMapper goodsEtyMapper;
    @Autowired
    private RecieveEtyMapper recieveEtyMapper;
    @Autowired
    private RecieveItemsEtyMapper recieveItemsEtyMapper;
    @Autowired
    private WareHousesGoodsEtyMapper wareHousesGoodsEtyMapper;
    @Autowired
    private WareHousesEtyMapper wareHousesEtyMapper;
    @Autowired
    private SuppliersEtyMapper suppliersEtyMapper;
    @Autowired
    private InstoreEtyMapper instoreEtyMapper;
    @Autowired
    private InstoreItemsEtyMapper instoreItemsEtyMapper;


    public JSONObject queryPageGoods(BaseEntity baseEntity, GoodsEty goods) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<GoodsEty> page = (Page<GoodsEty>) goodsEtyMapper.queryGoods(goods);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }

    public List<GoodsEty> queryGoods(GoodsEty goods) throws Exception {
        return goodsEtyMapper.queryGoods(goods);
    }

    public JSONObject queryPageRecieves(BaseEntity baseEntity, RecieveEty recieveInfo) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<RecieveEty> page = (Page<RecieveEty>) recieveEtyMapper.queryRecieves(recieveInfo);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }

    public JSONObject queryPageRecieveItems(BaseEntity baseEntity, RecieveItemsEty recieveItemsEty) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<RecieveItemsEty> page = (Page<RecieveItemsEty>) recieveItemsEtyMapper.queryRecieveItems(recieveItemsEty);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }

    public JSONObject queryPageInstores(BaseEntity baseEntity, InstoreEty instoreEty) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<InstoreEty> page = (Page<InstoreEty>) instoreEtyMapper.queryInstores(instoreEty);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }


    public JSONObject queryPageInstoreItems(BaseEntity baseEntity, InstoreItemsEty itemsEty) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<InstoreItemsEty> page = (Page<InstoreItemsEty>) instoreItemsEtyMapper.queryInstoreItems(itemsEty);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }


    public JSONObject queryPageWareHouseGoods(BaseEntity baseEntity, WareHousesGoodsEty wareHousesGoodsEty) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<WareHousesGoodsEty> page = (Page<WareHousesGoodsEty>) wareHousesGoodsEtyMapper.queryWareHouseGoods(wareHousesGoodsEty);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }

    public List<WareHousesGoodsEty> queryWareHouseGoods(WareHousesGoodsEty wareHousesGoodsEty) throws Exception {
        return wareHousesGoodsEtyMapper.queryWareHouseGoods(wareHousesGoodsEty);
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public String saveRecieveInfo(HttpServletRequest request, RecieveEty recieveInfo) throws IOException {
        ResultInfo info = new ResultInfo();

        recieveEtyMapper.insert(recieveInfo);
        info.setSuccess(true);

        return info.toString();
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public String saveWareHouse(WareHousesEty wareHousesEty) throws IOException {
        ResultInfo info = new ResultInfo();

        wareHousesEtyMapper.insert(wareHousesEty);
        info.setSuccess(true);

        return info.toString();
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int saveWareHouseGoods(WareHousesGoodsEty wareHousesGoodsEty) throws IOException {

        return wareHousesGoodsEtyMapper.insert(wareHousesGoodsEty);

    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public String saveRecieveItems(HttpServletRequest request, RecieveItemsEty items) throws IOException {
        ResultInfo info = new ResultInfo();

        WareHousesGoodsEty wge = new WareHousesGoodsEty();
        wge.setWid(items.getWid());
        wge.setGid(items.getGid());
        wge.setAmount(items.getAmount());
        GoodsEty goodsEty = new GoodsEty();
        goodsEty.setId(items.getGid());
        goodsEty.setAmount(items.getAmount());
        recieveItemsEtyMapper.insert(items);
//      减少仓库的商品库存
        wareHousesGoodsEtyMapper.minusWareHouse(wge);
//      减少整个商品的库存
        goodsEtyMapper.minusGoods(goodsEty);
        info.setSuccess(true);

        return info.toString();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int saveSupplier(SuppliersEty ety) {
        suppliersEtyMapper.insert(ety);
        return ety.getId();
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int saveInstore(InstoreEty ety) {
        instoreEtyMapper.insert(ety);
        return ety.getId();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int saveInstoreItems(InstoreItemsEty ety) {
        return instoreItemsEtyMapper.insert(ety);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int saveRecieve(RecieveEty ety) {
        recieveEtyMapper.insert(ety);
        return ety.getId();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int saveRecieveItems(RecieveItemsEty ety) {
        return recieveItemsEtyMapper.insert(ety);
    }

    public List<SuppliersEty> querySuppliers(SuppliersEty suppliersEty) {
        return suppliersEtyMapper.querySuppliers(suppliersEty);
    }

    public List<WareHousesEty> queryWareHouses(WareHousesEty wareHousesEty) {

        return wareHousesEtyMapper.queryWareHouses(wareHousesEty);

    }

    public List queryBrands() {
        return goodsEtyMapper.queryBrands();
    }

    public List queryModels() {
        return goodsEtyMapper.queryModels();

    }

    public List queryGoodsUnits() {
        return goodsEtyMapper.queryGoodsUnits();
    }
}
