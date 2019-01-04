package com.creating.service.goods;

import com.creating.dao.base.BaseEntity;
import com.creating.dao.mapper.entity.basic.ResultInfo;
import com.creating.dao.mapper.entity.dictionary.DictionaryItem;
import com.creating.dao.mapper.entity.goods.GoodsEty;
import com.creating.dao.mapper.entity.goods.RecieveInfo;
import com.creating.dao.mapper.entity.goods.RecieveItems;
import com.creating.dao.mapper.goods.GoodsEtyMapper;
import com.creating.dao.mapper.goods.RecieveInfoMapper;
import com.creating.dao.mapper.goods.RecieveItemsMapper;
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
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Service
public class GoodsService {

    @Autowired
    GoodsEtyMapper goodsEtyMapper;
    @Autowired
    RecieveInfoMapper recieveInfoMapper;
    @Autowired
    RecieveItemsMapper recieveItemsMapper;


    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public String saveRecieveInfo(HttpServletRequest request, RecieveInfo recieveInfo) throws IOException {
        ResultInfo info = new ResultInfo();

        recieveInfoMapper.insert(recieveInfo);
        info.setSuccess(true);

        return info.toString();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public String saveRecieveItems(HttpServletRequest request, RecieveItems items) throws IOException {
        ResultInfo info = new ResultInfo();

        recieveItemsMapper.insert(items);
        goodsEtyMapper.minusGoods(items);
        info.setSuccess(true);

        return info.toString();
    }

    public JSONObject queryRecieveInfo(BaseEntity baseEntity, RecieveInfo recieveInfo, HttpServletRequest request) throws Exception {
        PageHelper.startPage(baseEntity.getPage(), baseEntity.getLimit());
        Page<GoodsEty> page = (Page<GoodsEty>) recieveInfoMapper.queryRecieveInfo(recieveInfo);
        return JSONGrid.toJSon(page.getResult(), (int) page.getTotal(), DateUtils.datetimeFormat);
    }
}
