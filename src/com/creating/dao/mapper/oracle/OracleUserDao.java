package com.creating.dao.mapper.oracle;

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
public interface OracleUserDao extends BaseDao<UserEty> {

    @DataSource(name = DataSourceContextHolder.DATA_SOURCE_ORACLE)
    List query();
}
