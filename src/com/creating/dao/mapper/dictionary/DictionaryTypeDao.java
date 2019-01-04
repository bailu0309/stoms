package com.creating.dao.mapper.dictionary;

import java.util.List;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.dictionary.DictionaryItem;
import com.creating.dao.mapper.entity.dictionary.DictionaryType;

/**
 * @Author mabailu
 * @Date 2018/5/9 15:03
 * @Description
 */

public interface DictionaryTypeDao extends BaseDao {
	
	/**
	 * 查询字典类型
	 * */
	public List<DictionaryType> selectDictionaryType(DictionaryType dt);
	
	/**
	 * 新增字典类型信息
	 * */
	public Integer insertDictionaryType(DictionaryType dt);
	
	/**
	 * 更新字典类型信息
	 * */
	public Integer updateDictionaryType(DictionaryType dt);
	
	/**
	 * 删除字典类型信息
	 * */
	public Integer deleteDictionaryType(DictionaryType dt);
	
}
