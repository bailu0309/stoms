package com.creating.service.basic;

import com.creating.dao.mapper.basic.UserDao;
import com.creating.dao.mapper.entity.basic.UserEty;
import com.creating.util.database.DataSourceContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserRoleService {

    @Autowired
    private UserDao userDao;


    /**
     * 配置角色用户
     *
     * @param userId
     * @param roleIds
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = java.lang.Exception.class)
    public void saveUserRole(Integer userId, String roleIds) {

        userDao.deleteRole(userId);
        String[] roleList = roleIds.split(",");
        Map<String, Integer> userMap = new HashMap<String, Integer>();
        userMap.put("userId", userId);
        for (int i = 0; i < roleList.length; i++) {
//            userMap.put("id", Integer.parseInt(userDao.getZjID()));
            userMap.put("roleId", Integer.parseInt(roleList[i]));
            userDao.insertRole(userMap);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = java.lang.Exception.class)
    public void addUser(UserEty user) {
//        Integer id = Integer.parseInt(userDao.getZjID());
//        user.setId(id);
        userDao.insertUser(user);
        Map<String, Integer> userMap = new HashMap<String, Integer>();
//        userMap.put("userId", id);
//        userMap.put("id", Integer.parseInt(userDao.getZjID()));
        userDao.insertRole(userMap);
    }



    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public List queryUser() {
        return userDao.queryUser("");

    }



}
