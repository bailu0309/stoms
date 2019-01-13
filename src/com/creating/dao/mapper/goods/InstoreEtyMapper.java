package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.InstoreEty;

import java.util.List;

public interface InstoreEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(InstoreEty record);

    int insertSelective(InstoreEty record);

    InstoreEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(InstoreEty record);

    int updateByPrimaryKey(InstoreEty record);

    List<InstoreEty> queryInstores(InstoreEty instoreEty);

}