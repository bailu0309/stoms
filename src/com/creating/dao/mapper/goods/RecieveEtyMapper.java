package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.RecieveEty;

import java.util.List;

public interface RecieveEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecieveEty record);

    int insertSelective(RecieveEty record);

    RecieveEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecieveEty record);

    int updateByPrimaryKey(RecieveEty record);

    List<RecieveEty> queryRecieves(RecieveEty recieveInfo);
}