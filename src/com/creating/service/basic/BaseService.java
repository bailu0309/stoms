package com.creating.service.basic;

import java.util.List;

public interface BaseService<T> {

    /**
     * 插入
     *
     * @param
     */
    public Integer insert(T t);

    /**
     * 根据ID号修改单个实体
     *
     * @param
     */
    public Integer updateById(T t);

    /**
     * 删除实体
     *
     * @param
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
     * @param
     */
    public T selectById(Integer id);

    /**
     * 根据实体对象查询
     *
     * @param
     * @return
     */
    public List<T> selectByEntity(T t);

    /**
     * 由分页信息查询分页记录
     *
     * @param
     * @return
     */
    public List<T> selectByLimit(T t);


    /**
     * 为分页查询出记录总数
     *
     * @param
     * @return
     */
    public Integer selectLimitCount(T t);
}
