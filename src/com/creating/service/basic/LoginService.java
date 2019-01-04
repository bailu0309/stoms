package com.creating.service.basic;

import com.creating.constants.StringConstants;
import com.creating.dao.mapper.basic.UserDao;
import com.creating.dao.mapper.entity.basic.UserEty;
import com.creating.util.json.SessionEntity;
import com.creating.util.md.JavaMD5;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Service(value = "LoginService")
@Scope(value = "singleton")
public class LoginService {

    @Autowired
    private UserDao userDao;


    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public JSONObject login(HttpServletRequest request) {
        JSONObject obj = new JSONObject();
        HttpSession session = request.getSession();

        String pwd = request.getParameter(StringConstants.PWD);
        String yzm = request.getParameter(StringConstants.YZM);
        String code = (String) session.getAttribute(StringConstants.CODE);
        session.setAttribute(StringConstants.SESSION_LOGIN_NAME, request.getParameter("userName"));
        Integer logincount = (Integer) session.getAttribute(StringConstants.SESSION_LOGIN_COUNT);
        if (null == logincount) {
            logincount = 1;
            session.setAttribute(StringConstants.SESSION_LOGIN_COUNT, logincount);
        } else {
            logincount = logincount + 1;
            session.setAttribute(StringConstants.SESSION_LOGIN_COUNT, logincount);
        }
        if (logincount > 2 && (StringUtils.isEmpty(yzm) || !code.toLowerCase().equals(yzm.toLowerCase()))) {
            obj.put(StringConstants.RESULT, StringConstants.FAIL);
            obj.put(StringConstants.INFO, "验证码错误！");
        } else {
            List<UserEty> list = userDao.selectUserByName(request.getParameter("userName"));
            if (list.size() == 1) {
                UserEty userEty = list.get(0);
                if (JavaMD5.getMD5ofStr(userEty.getPassword()).equals(pwd)) {
                    session.setAttribute(StringConstants.SESSION_LOGIN_NAME, userEty.getName());
                    session.setAttribute(StringConstants.USERID, userEty.getId());
                    session.setAttribute(StringConstants.SESSION_LOGIN_USERNAME, userEty.getUsername());
                    session.setAttribute(StringConstants.SESSION_LOGIN_DEPARTID, userEty.getDepid());
                    session.setAttribute(StringConstants.SESSION_LOGIN_DEPARTNAME, userEty.getDepname());
                    session.setAttribute(StringConstants.SESSION_LOGIN_STATUS, userEty.getStatus());
                    String roleid = userDao.roleID(userEty.getId());
                    session.setAttribute(StringConstants.SESSION_LOGIN_ROLE, roleid);
                    session.setAttribute(StringConstants.SESSION_MAIN_USERID, userEty.getMuserid());
                    session.setAttribute(StringConstants.SESSION_MAIN_USERNAME, userEty.getMusername());
                    session.setAttribute(StringConstants.SESSION_LOGIN_BELONGQCCID, userEty.getQccid());

                    if ("c4ca4238a0b923820dcc509a6f75849b".equals(pwd) && "1".equals(userEty.getStatus())) {
                        session.setAttribute("epwd", "1");
                    } else {
                        session.setAttribute("epwd", "0");
                    }

                    obj.put(StringConstants.SUCCESS, true);
                    obj.put(StringConstants.RESULT, StringConstants.SUCCESS);
                } else {
                    obj.put(StringConstants.RESULT, StringConstants.FAIL);
                    obj.put(StringConstants.INFO, "用户名或者密码错误！");
                }
            } else {
                obj.put(StringConstants.RESULT, StringConstants.FAIL);
                obj.put(StringConstants.INFO, "用户名或者密码错误！");
            }
        }
        return obj;
    }

    public JSONObject logout(HttpServletRequest request) {
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        request.getSession().invalidate();
        obj.put("result", "success");
        return obj;
    }

    public JSONObject relogin(HttpServletRequest request, UserEty user) {
        JSONObject obj = new JSONObject();

        if (StringUtils.isNotEmpty(SessionEntity.getRole(request))) {
            HttpSession session = request.getSession();
            List<UserEty> list = userDao.selectUserByName(user.getName());
            if (list != null) {
                UserEty userEty = list.get(0);
                session.setAttribute(StringConstants.SESSION_LOGIN_COUNT, 0);
                session.setAttribute(StringConstants.SESSION_LOGIN_NAME, userEty.getName());
                session.setAttribute(StringConstants.USERID, userEty.getId());
                session.setAttribute(StringConstants.SESSION_LOGIN_USERNAME, userEty.getUsername());
                session.setAttribute(StringConstants.SESSION_LOGIN_DEPARTID, userEty.getDepid());
                session.setAttribute(StringConstants.SESSION_LOGIN_DEPARTNAME, userEty.getDepname());
                String roleid = userDao.roleID(userEty.getId());
                session.setAttribute(StringConstants.SESSION_LOGIN_ROLE, roleid);
                session.setAttribute(StringConstants.SESSION_MAIN_USERID, userEty.getMuserid());
                session.setAttribute(StringConstants.SESSION_MAIN_USERNAME, userEty.getMusername());
                obj.put(StringConstants.SUCCESS, true);
                obj.put(StringConstants.RESULT, StringConstants.SUCCESS);
            } else {
                obj.put(StringConstants.SUCCESS, false);
                obj.put(StringConstants.RESULT, StringConstants.FAIL);
            }
        } else {
            obj.put(StringConstants.SUCCESS, false);
            obj.put(StringConstants.RESULT, StringConstants.FAIL);
        }


        return obj;

    }
}
