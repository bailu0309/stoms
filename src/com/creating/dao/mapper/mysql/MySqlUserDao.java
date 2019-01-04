package com.creating.dao.mapper.mysql;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.UserEty;
import com.creating.util.database.DataSource;
import com.creating.util.database.DataSourceContextHolder;

import java.util.List;

/**
 * 用户管理
 *
 * @author hanxs
 */
public interface MySqlUserDao extends BaseDao<UserEty> {

    @DataSource(name = DataSourceContextHolder.DATA_SOURCE_MYSQL)
    List query();
}
