package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.RecieveItems;

public interface RecieveItemsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecieveItems record);

    int insertSelective(RecieveItems record);

    RecieveItems selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecieveItems record);

    int updateByPrimaryKey(RecieveItems record);
}