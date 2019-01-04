package com.creating.service.oracle;

import com.creating.dao.mapper.mysql.MySqlUserDao;
import com.creating.dao.mapper.oracle.OracleUserDao;
import com.creating.util.database.DataSource;
import com.creating.util.database.DataSourceContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OracleUserService {

    @Autowired
    private OracleUserDao oracleUserDao;

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    @DataSource(name = DataSourceContextHolder.DATA_SOURCE_ORACLE)
    public List queryUser() {
        return oracleUserDao.query();
    }

}
