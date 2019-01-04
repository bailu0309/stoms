package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.GoodsEty;
import com.creating.dao.mapper.entity.goods.RecieveItems;

import java.util.List;

public interface GoodsEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(GoodsEty record);

    int insertSelective(GoodsEty record);

    GoodsEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(GoodsEty record);

    int updateByPrimaryKey(GoodsEty record);

    List<GoodsEty> queryGoods(GoodsEty goodsEty);

    void minusGoods(RecieveItems items);
}