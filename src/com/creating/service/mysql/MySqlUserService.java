package com.creating.service.mysql;

import com.creating.dao.mapper.mysql.MySqlUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MySqlUserService {

    @Autowired
    private MySqlUserDao mySqlUserDao;

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public List queryUser() {
        return mySqlUserDao.query();
    }

}
