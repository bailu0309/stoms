package com.creating.dao.mapper.basic;

import com.creating.dao.base.BaseDao;
import com.creating.dao.mapper.entity.basic.MenuEty;
import com.creating.dao.mapper.entity.basic.UserEty;
import com.creating.util.database.DataSource;
import com.creating.util.database.DataSourceContextHolder;

import java.util.List;
import java.util.Map;

/**
 * 用户管理
 *
 * @author hanxs
 */
public interface UserDao extends BaseDao<UserEty> {

    @DataSource(name = DataSourceContextHolder.DATA_SOURCE_ORACLE)
    List<UserEty> queryUser(String name);

    List<UserEty> selectUserByName(String name);

    void insertRole(Map<String, Integer> userMap);

    void deleteRole(Integer userid);

    List<MenuEty> selectUserMenuMap(Integer userid);

    String getZjID();

    String roleID(Integer userid);

    int updateUser(UserEty user);

    List<UserEty> queryUserByName(UserEty user);

    List<UserEty> queryUserByNameId(UserEty user);

    void insertUser(UserEty user);

    List<UserEty> listPerson4Task(UserEty userEty);

    List<UserEty> selectMainUser(UserEty user);

    List<UserEty> listmainbyself(UserEty user);

    void updateUserStatus(UserEty user);

    List<UserEty> queryQcc();

    List<UserEty> queryQccByHospname(String s);

    UserEty queryProQcc();
}
