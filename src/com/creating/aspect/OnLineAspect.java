package com.creating.aspect;

import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Component;

/**
 * @Author mabailu
 * @Date 2018/1/29 9:55
 * @Description 记录在线切面
 */
@Component
@Aspect
public class OnLineAspect {

    private final static Logger log = Logger.getLogger(OnLineAspect.class);


    private static ObjectMapper mapper = new ObjectMapper();

 /*   @Autowired
    LoginLogDao loginLogDao;*/

    @Pointcut("execution(* com.creating.service.basic.LoginService.login(..))")
    public void aspect() {
    }

    @Pointcut("execution(* com.creating.service.basic.LoginService.logout(..))")
    public void aspectOut() {
    }


    @Pointcut("execution(* com.creating.controller.*.*.*(..))")
    public void controller() {
    }

    @Before("aspect()")
    public void before(JoinPoint joinPoint) {
        log.info("before " + joinPoint);
    }

    @AfterReturning(returning = "obj", pointcut = "aspect()")
    public void afterReturn(JoinPoint joinPoint, JSONObject obj) {

      /*  try {
            Object[] args = joinPoint.getArgs();
            HttpServletRequest request = (HttpServletRequest) args[0];
            request.getRequestURI();

            String res = (String) obj.get(StringConstants.RESULT);

            LoginLogEty log = new LoginLogEty();
            log.setIp(NetworkUtils.getIpAddress(request));
            log.setName(request.getParameter("userName"));
            log.setPassword(request.getParameter(StringConstants.PWD));
            log.setLoginTime(new Date());
            log.setSessionId(request.getRequestedSessionId());
            log.setStatus(res);
            log.setMessage((String) obj.get(StringConstants.INFO));
            loginLogDao.save(log);

            if (StringConstants.SUCCESS.equals(res)) {
                //记录在线
                String name = (String) request.getSession().getAttribute(StringConstants.SESSION_LOGIN_NAME);
                String sessionId = request.getRequestedSessionId();
                RedisUtil.getJedis().set(StringConstants.SID_PREFIX + name + ":" + sessionId, mapper.writeValueAsString(log));
                RedisUtil.getJedis().set(StringConstants.UID_PREFIX + sessionId, name);

            }
        } catch (IOException e) {
            e.printStackTrace();
        }*/
    }

    @Before("aspectOut()")
    public void afterReturnOut(JoinPoint joinPoint) {
     /*   Object[] args = joinPoint.getArgs();
        HttpServletRequest request = (HttpServletRequest) args[0];

        //删除旧的Session
        String sid = request.getRequestedSessionId();
        String name = RedisUtil.getJedis().get(StringConstants.UID_PREFIX + sid);
        Jedis jedis = RedisUtil.getJedis();
        jedis.del(StringConstants.SID_PREFIX + name + ":" + sid);
        jedis.del(StringConstants.UID_PREFIX + sid);
        RedisUtil.returnResource(jedis);*/

    }


//    @Around("controller()")
    public void around(JoinPoint joinPoint) {
//        long start = System.currentTimeMillis();
//        try {
//            ((ProceedingJoinPoint) joinPoint).proceed();
//            long end = System.currentTimeMillis();
//            log.info("around " + joinPoint + "\tUse time : " + (end - start) + " ms!");
//            System.out.println("around " + joinPoint + "\tUse time : " + (end - start) + " ms!");
//        } catch (Throwable e) {
//            long end = System.currentTimeMillis();
//            log.info("around " + joinPoint + "\tUse time : " + (end - start) + " ms with exception : " + e.getMessage());
//        }
    }

}
