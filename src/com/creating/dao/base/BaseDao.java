package com.creating.dao.base;

import java.util.List;

/**
 * DAO基础接口
 *
 * @author yangHanguang
 */
public interface BaseDao<T> {

    /**
     * 插入
     *
     * @param t
     */
    public Integer insert(T t);

    /**
     * 根据ID号修改单个实体
     *
     * @param t
     */
    public Integer updateById(T t);

    /**
     * 根据ID号修改单个实体
     *
     * @param t
     */
    public Integer deleteById(T t);

    /**
     * 根据ID号删除单个实体
     *
     * @param id
     */
    public void deleteById(Integer id);

    /**
     * 根据ID号查询单个实体
     *
     * @param id
     */
    public T selectById(Integer id);

    /**
     * 根据实体对象查询
     *
     * @param t
     * @return
     */
    public List<T> selectByEntity(T t);

    /**
     * 由分页信息查询分页记录
     *
     * @param t
     * @return
     */
    public List<T> selectByLimit(T t);


    /**
     * 为分页查询出记录总数
     *
     * @param t
     * @return
     */
    public Integer selectLimitCount(T t);


    public String getFileTypeId();
}
