package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.RecieveItemsEty;

import java.util.List;

public interface RecieveItemsEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecieveItemsEty record);

    int insertSelective(RecieveItemsEty record);

    RecieveItemsEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecieveItemsEty record);

    int updateByPrimaryKey(RecieveItemsEty record);

    List<RecieveItemsEty> queryRecieveItems(RecieveItemsEty recieveItemsEty);

}