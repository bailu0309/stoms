package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.SuppliersEty;

import java.util.List;

public interface SuppliersEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SuppliersEty record);

    int insertSelective(SuppliersEty record);

    SuppliersEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SuppliersEty record);

    int updateByPrimaryKey(SuppliersEty record);

    List<SuppliersEty> querySuppliers(SuppliersEty suppliersEty);

}