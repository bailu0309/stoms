package com.creating.util.json;

import com.creating.constants.StringConstants;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class UrlInterceptor implements HandlerInterceptor {

    private String[] urls;

    public void setUrls(String[] urls) {
        this.urls = urls;
    }

    @Override
    public void afterCompletion(HttpServletRequest arg0,
                                HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
                           Object arg2, ModelAndView arg3) throws Exception {
        // TODO Auto-generated method stub
    }

    @Override
    public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1,
                             Object arg2) throws Exception {
        String[] a = urls;
        String requesturl = arg0.getRequestURL().toString();
        String urljq = requesturl.replace(arg0.getContextPath(), "");
        if (urls != null && urls.length >= 1) {
            for (String url : urls) {
                if (urljq.contains(url)) {
                    return true;
                }
            }
        }
        HttpSession session = arg0.getSession();
        if (session != null) {
            Object longinid = session.getAttribute(StringConstants.SESSION_LOGIN_NAME);
            if (longinid == null) {
                //arg1.sendRedirect(arg0.getContextPath()+"/login.jsp");
                //arg0.getRequestDispatcher("/login.jsp").forward(arg0, arg1);
                return yzsession(arg0, arg1);
            }
        } else {
            return yzsession(arg0, arg1);
        }
        return true;
    }

    private boolean yzsession(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
        if (arg0.getHeader("x-requested-with") != null && "XMLHttpRequest".equalsIgnoreCase(arg0.getHeader("x-requested-with"))) {
            arg1.addHeader("sessionstatus", "timeout");
        } else {
            arg1.setContentType("text/html;charset=utf-8");
            arg1.getWriter().print("<script type='text/javascript'>window.top.location.href='" + arg0.getContextPath() + "/login.jsp'</script>");
        }
        return false;
    }

}
