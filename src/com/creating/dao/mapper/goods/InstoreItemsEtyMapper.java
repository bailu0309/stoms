package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.InstoreItemsEty;

import java.util.List;

public interface InstoreItemsEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(InstoreItemsEty record);

    int insertSelective(InstoreItemsEty record);

    InstoreItemsEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(InstoreItemsEty record);

    int updateByPrimaryKey(InstoreItemsEty record);

    List<InstoreItemsEty> queryInstoreItems(InstoreItemsEty itemsEty);

}