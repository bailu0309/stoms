package com.creating.util.json;


import com.creating.constants.StringConstants;

import javax.servlet.http.HttpServletRequest;


public class SessionEntity {

    /**
     * @return the 操作人编码
     */
    public static String getName(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_LOGIN_NAME) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_LOGIN_NAME);
    }

    /**
     * @return the 操作人姓名
     */
    public static String getUsername(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_LOGIN_USERNAME) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_LOGIN_USERNAME);
    }


    /**
     * @return 角色
     */
    public static String getRole(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_LOGIN_ROLE) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_LOGIN_ROLE);
    }

    /**
     * 登录人科室
     *
     * @param request
     * @return
     */
    public static String getDepId(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_LOGIN_DEPARTID) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_LOGIN_DEPARTID);
    }

    /**
     * 登录人科室
     *
     * @param request
     * @return
     */
    public static String getDepName(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_LOGIN_DEPARTNAME) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_LOGIN_DEPARTNAME);
    }

    public static String getMainUserId(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_MAIN_USERID) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_MAIN_USERID);
    }

    public static String getMainUserName(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_MAIN_USERNAME) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_MAIN_USERNAME);
    }

    public static String getBelongQccid(HttpServletRequest request) {
        return request.getSession().getAttribute(StringConstants.SESSION_LOGIN_BELONGQCCID) == null ? null : (String) request.getSession().getAttribute(
                StringConstants.SESSION_LOGIN_BELONGQCCID);
    }


}
