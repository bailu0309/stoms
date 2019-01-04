package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.RecieveInfo;

import java.util.List;

public interface RecieveInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecieveInfo record);

    int insertSelective(RecieveInfo record);

    RecieveInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecieveInfo record);

    int updateByPrimaryKey(RecieveInfo record);

    List queryRecieveInfo(RecieveInfo recieveInfo);
}