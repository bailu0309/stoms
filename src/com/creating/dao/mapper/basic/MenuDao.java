package com.creating.dao.mapper.basic;

import java.util.List;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.MenuEty;
/*
 * 菜单管理
 * @author lijialong
 * */
public interface MenuDao extends BaseDao<MenuEty>{
	 /**
 	 * 根据父节点id 获得菜单列表
 	 * @return List 客户菜单列表
 	 */
 	public List<MenuEty> getListByParentId(int id);
 	
 	/**
	 * 根据菜单ID 查看是否有角色使用该菜单
	 * @param menuId
	 */
	public int getUsingMenu(Integer menuId);
	
	
	/**
	 *获取主键ID+1 
	 */
	public String getZjID();
 	
}
