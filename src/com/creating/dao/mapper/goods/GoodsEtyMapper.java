package com.creating.dao.mapper.goods;

import com.creating.dao.mapper.entity.goods.GoodsEty;

import java.util.List;
import java.util.Map;

public interface GoodsEtyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(GoodsEty record);

    int insertSelective(GoodsEty record);

    GoodsEty selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(GoodsEty record);

    int updateByPrimaryKey(GoodsEty record);

    void minusGoodsAmount(GoodsEty goodsEty);

    List<GoodsEty> queryGoods(GoodsEty goodsEty);

    List<Map> queryBrands();

    List<Map> queryModels();

    List<Map> queryGoodsUnits();

    List<Map> queryGoodsTypes();

    void addGoodsAmount(GoodsEty goodsEty);

    List queryGoodsInStock(GoodsEty goods);
}