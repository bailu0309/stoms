package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.WareHousesEty;

import java.util.List;

public interface WareHousesEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WareHousesEty record);

    int insertSelective(WareHousesEty record);

    WareHousesEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WareHousesEty record);

    int updateByPrimaryKey(WareHousesEty record);

    List<WareHousesEty> queryWareHouses(WareHousesEty wareHousesEty);
}