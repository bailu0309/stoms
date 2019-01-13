package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.WareHousesGoodsEty;

import java.util.List;

public interface WareHousesGoodsEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WareHousesGoodsEty record);

    int insertSelective(WareHousesGoodsEty record);

    WareHousesGoodsEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WareHousesGoodsEty record);

    int updateByPrimaryKey(WareHousesGoodsEty record);

    void minusWareHouse(WareHousesGoodsEty wge);

    List<WareHousesGoodsEty> queryWareHouseGoods(WareHousesGoodsEty wareHousesGoodsEty);

}