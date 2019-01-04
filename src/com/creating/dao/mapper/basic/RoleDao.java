package com.creating.dao.mapper.basic;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.RoleEty;

import java.util.Map;

/*
 * 角色管理
 * @author lijialong
 * */
public interface RoleDao extends BaseDao<RoleEty> {
    /**
     * 将角色ID 和 菜单ID 插入 临时表
     */
    public void insertMenu(Map<String, Integer> roleMap);

    /**
     * 删除角色菜单
     */
    public void deleteMenu(Integer roleId);

    /**
     * 根据角色ID 查看是否有用户使用该角色
     *
     * @param roleId
     */
    public int getUsingRole(Integer roleId);

    /**
     * 获取主键ID+1
     */
    public String getZjID();


}
