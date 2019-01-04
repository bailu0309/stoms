package com.creating.dao.mapper.dictionary;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.dictionary.DictionaryItem;

import java.util.List;
import java.util.Map;

/**
 * @Author mabailu
 * @Date 2018/5/9 15:03
 * @Description
 */

public interface DictionaryItemDao extends BaseDao {


    /**
     * 查询字典项
     */
    public Integer selectDictionaryItemCount(DictionaryItem di);

    public List<DictionaryItem> selectDictionaryItem(DictionaryItem di);

    /**
     * 新增字典项信息
     */
    public Integer insertDictionaryItem(DictionaryItem di);

    /**
     * 更新字典项信息
     */
    public Integer updateDictionaryItem(DictionaryItem di);

    /**
     * 删除字典项信息
     */
    public Integer deleteDictionaryItem(DictionaryItem di);

    List queryAllDictItems();
}
