package com.creating.dao.mapper.basic;

import com.creating.dao.mapper.entity.basic.SystemLog;

import java.util.List;

public interface SystemLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SystemLog record);

    int insertSelective(SystemLog record);

    SystemLog selectByPrimaryKey(Integer id);

    List<SystemLog> selectLasted();

    int updateByPrimaryKeySelective(SystemLog record);

    int updateByPrimaryKey(SystemLog record);

    List<SystemLog> querySystemLog(SystemLog systemLog);
}